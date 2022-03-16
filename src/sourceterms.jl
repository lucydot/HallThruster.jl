function apply_reactions!(Q, U, params, i::Int64) #replace Te with Tev
    fluids, fluid_ranges = params.fluids, params.fluid_ranges
    reactions, species_range_dict = params.reactions, params.species_range_dict
    _, __, cell_volume = params.z_cell, params.z_edge, params.cell_volume
    dt = params.dt
    index = params.index

    mi = m(fluids[1])
    ne = params.cache.ne[i]
    ϵ = params.cache.Tev[i]

    for r in reactions
        reactant_index = species_range_dict[r.reactant.symbol][1]
        product_index = species_range_dict[r.product.symbol][1]
        n_reactant = U[reactant_index, i] / mi
        if n_reactant > 1
            k = r.rate_coeff

            ndot = k(ϵ) * n_reactant * ne
            Q[reactant_index] -= ndot * mi
            Q[product_index] += ndot * mi
        end
    end
end

function apply_ion_acceleration!(Q, U, params, i)
    fluids, fluid_ranges = params.fluids, params.fluid_ranges
    index = params.index
    ∇ϕ = params.cache.∇ϕ
    for j in 1:length(fluids)
        E_d = -∇ϕ[i]
        if fluids[j].species.Z > 0
            ni = U[fluid_ranges[j][1], i]
            @views Q[fluid_ranges[j][2]] += e / m(fluids[j]) *
                                            ni *
                                            E_d *
                                            fluids[j].species.Z
        end
    end
end

function apply_ion_acceleration_coupled!(Q, U, params, i)
    fluids, fluid_ranges = params.fluids, params.fluid_ranges
    index = params.index
    (;ue, μ) = params.cache
    for j in 1:length(fluids)
        if fluids[j].species.Z > 0
            ni = U[fluid_ranges[j][1], i]
            @views Q[fluid_ranges[j][2]] += -e / m(fluids[j]) *
                                            ni * fluids[j].species.Z * ue[i] / μ[i]
        end
    end
end

function source_electron_energy_landmark!(Q, U, params, i)
    Q[params.index.nϵ] = source_electron_energy_landmark(U, params, i)
end

function source_electron_energy_landmark(U, params, i)
    (; z_cell, L_ch, index) = params

    #Landmark source term
    #=if params.z_cell[i] < params.L_ch
        νϵ = params.νϵ[1]
    else
        νϵ = params.νϵ[2]
    end=#

    z = z_cell[i]
    smoothing_length = params.config.smoothing_length

    νϵ = smooth_transition(z, L_ch, smoothing_length, params.νϵ[1], params.νϵ[2])
    mi = params.propellant.m
    UU = 20.0
    ne = params.cache.ne[i]
    ϵ = U[index.nϵ, i] / ne
    ue = params.cache.ue[i]
    ∇ϕ = params.cache.∇ϕ[i]
    W = 1e7 * νϵ * ϵ * exp(-UU / ϵ)
    return ne * (ue * ∇ϕ - U[index.ρn, i]/mi * params.loss_coeff(ϵ) - W)
end