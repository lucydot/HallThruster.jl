"""
    AnomalousTransportModel
The abstract supertype of all types of anomalous transport models.
Subtype this to define your own model.
"""
abstract type AnomalousTransportModel end

#=============================================================================
 Begin definition of built-in models
==============================================================================#

"""
    NoAnom <: AnomalousTransportModel
No anomalous collision frequency included in simulation
"""
struct NoAnom <: AnomalousTransportModel end

function (::NoAnom)(νan, params)
    for i in eachindex(νan)
        νan[i] = 0.0
    end
    return νan
end

"""
    Bohm(c) <: AnomalousTransportModel
Model where the anomalous collision frequency scales with the electron cyclotron frequency ωce times some scaling factor c
"""
struct Bohm <: AnomalousTransportModel
    c::Float64
end

function (model::Bohm)(νan, params)

    for i in eachindex(νan)
        B = params.cache.B[i]
        ωce = e * B / me
        νan = model.c * ωce
    end

    return νan
end

"""
    TwoZoneBohm(c1, c2) <: AnomalousTransportModel
Model where the anomalous collision frequency has two values: c1 * ωce inside the channel and c2 * ωce outside of the channel.
Takes two arguments: c1 and c2. The transition between these values can be smoothed by the user-provided transition function.
"""
struct TwoZoneBohm <: AnomalousTransportModel
    coeffs::NTuple{2, Float64}
    TwoZoneBohm(c1, c2) = new((c1, c2))
end

function (model::TwoZoneBohm)(νan, params)
    c1, c2 = model.coeffs

    for i in eachindex(νan)
        B = params.cache.B[i]
        ωce = e * B / me

        β = params.config.transition_function(params.z_cell[i], params.L_ch, c1, c2)
        νan[i] = β * ωce
    end

    return νan
end

"""
    MultiLogBohm(zs, cs) <: AnomalousTransportModel
Model similar to that employed in Hall2De, where the mobility is Bohm-like (i.e. `νan(z) = c(z) * ωce(z)`) and z is in meters.

The function `c(z)` is defined by a sequence of nodes `(z, c)` provided by the user. At `z = z[1]`, `c(z) = c[1]`, and so forth.

At `z[i] < z < z[i+1]`, `log(c)` is defined by linearly interpolating between `log(c[i])` and `log(c[i+1])`.

For `z < z[1]`, `c = c[1]` and for `z > z[end]`, `c(z) = c[end]`.

The user may also provide a single array of [z[1], z[2], ..., z[end], c[1], c[2], ..., c[end]]. The number of z values must be equal to the number of c values.
"""
struct MultiLogBohm <: AnomalousTransportModel
    zs::Vector{Float64}
    cs::Vector{Float64}
    function MultiLogBohm(zs, cs)
        if length(zs) != length(cs)
            throw(ArgumentError("Number of z values must be equal to number of c values"))
        end
        return new(zs, cs)
    end
end

function MultiLogBohm(coeffs)
    N = length(coeffs) ÷ 2
    zs = coeffs[1:N]
    cs = coeffs[N+1:end]
    return MultiLogBohm(zs, cs)
end

function (model::MultiLogBohm)(νan, params)
    (;z_cell) = params
    (;B) = params.cache

    for i in eachindex(νan)
        ωce = e * B[i] / me
        c = HallThruster.interpolate(z_cell[i], model.zs, model.cs, use_log = true)
        νan[i] = c * ωce
    end

    return νan
end

"""
    num_anom_variables(::AnomalousTransportModel)::Int

The number of variable arrays that should be allocated for the provided anomalous
transport model. These arrays are used to save state beyond the anomalous
collision frequency, and are useful for defining more complex anomalous transport
models. If not defined by the user, this defaults to zero. 
"""
num_anom_variables(::AnomalousTransportModel)::Int = 0

"""
    allocate_anom_variables(::AnomalousTransportModel, ncells)
Allocate arrays for anomalous transport state variables. `ncells` is the length
of the arrays to be allocated. These anomalous transport variables are then stored
in params.cache.anom_variables
"""
function allocate_anom_variables(model::AnomalousTransportModel, ncells)
    [zeros(ncells) for _ in 1:num_anom_variables(model)]
end