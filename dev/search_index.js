var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = HallThruster\nDocTestSetup = quote\n    using HallThruster\nend","category":"page"},{"location":"#HallThruster.jl","page":"Home","title":"HallThruster.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A 1D fluid Hall thruster code written in Julia. This will be filled in as the code is developed further.","category":"page"},{"location":"internals/","page":"Internals","title":"Internals","text":"CurrentModule = HallThruster","category":"page"},{"location":"internals/","page":"Internals","title":"Internals","text":"","category":"page"},{"location":"internals/","page":"Internals","title":"Internals","text":"Modules = [HallThruster]","category":"page"},{"location":"internals/#HallThruster.Air","page":"Internals","title":"HallThruster.Air","text":"Air::Gas\n\nEarth air at standard temperature and pressure\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Argon","page":"Internals","title":"HallThruster.Argon","text":"Argon::Gas\n\nArgon gas\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Electron","page":"Internals","title":"HallThruster.Electron","text":"Electron::Species\n\nElectron\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Krypton","page":"Internals","title":"HallThruster.Krypton","text":"Krypton::Gas\n\nKrypton gas\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.NA","page":"Internals","title":"HallThruster.NA","text":"NA\n\nNumber of atoms in a kg-mol (6.02214076e26 / kmol)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.R0","page":"Internals","title":"HallThruster.R0","text":"R0\n\nUniversal gas constant (8314.46261815324 J / kmol K)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Xenon","page":"Internals","title":"HallThruster.Xenon","text":"Xenon::Gas\n\nXenon gas\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.e","page":"Internals","title":"HallThruster.e","text":"e\n\nElectron charge (1.602176634e-19 Coulomb)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.kB","page":"Internals","title":"HallThruster.kB","text":"kB\n\nBoltzmann constant (1.380649e-23 J/K)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.me","page":"Internals","title":"HallThruster.me","text":"me\n\nElectron mass (9.10938356e-31 kilograms)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.EnergyOVS","page":"Internals","title":"HallThruster.EnergyOVS","text":"mutable struct EnergyOVS\n\nEnables setting mu, ue, Tev and ne to certain values to very electron energy equation\n\n\n\n\n\n","category":"type"},{"location":"internals/#HallThruster.Gas","page":"Internals","title":"HallThruster.Gas","text":"Gas\n\nA chemical element in the gaseous state. Container for element properties used in fluid computations.\n\nFields\n\nname::String        Full name of gas (i.e. Xenon)\n\nshort_name::String  Short name/symbol (i.e. Xe for Xenon)\n\nγ::Float64          Specific heat ratio / adiabatic index\n\nM::Float64          Molar mass (grams/mol) or atomic mass units\n\nm::Float64          Mass of atom in kg\n\ncp::Float64         Specific heat at constant pressure in J / kg / K\n\ncv::Float64         Specific heat at constant volume in J / kg / K\n\nR::Float64          Gas constant in J / kg / K\n\n\n\n\n\n","category":"type"},{"location":"internals/#HallThruster.Gas-Tuple{Any, Any}","page":"Internals","title":"HallThruster.Gas","text":"Gas(name::String, short_name::String; γ::Float64, M::Float64)\n\nInstantiate a new Gas, providing a name, short name, the adiabatic index, and the molar mass. Other gas properties, including gas constant, specific heats at constant pressure/volume, and mass of atom/molecule in kg will are then computed.\n\njulia> Gas(\"Xenon\", \"Xe\", γ = 5/3, M = 83.798)\nXenon\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.Species","page":"Internals","title":"HallThruster.Species","text":"Species\n\nRepresents a gas with a specific charge state. In a plasma, different ionization states of the same gas may coexist, so we need to be able to differentiate between these.\n\njulia> Species(Xenon, 0)\nXe\n\njulia> Species(Xenon, 1)\nXe+\n\njulia> Species(Xenon, 3)\nXe3+\n\n\n\n\n\n","category":"type"},{"location":"internals/#HallThruster.Verification","page":"Internals","title":"HallThruster.Verification","text":"mutable struct Verification\n\nis passed to params to identify if OVS is active.\n\n\n\n\n\n","category":"type"},{"location":"internals/#HallThruster.B_field-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.B_field","text":"B_field(B_max::Float64, z::Float64, L_ch::Float64)\n\ndefines magnetic field as a function of position. \n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.ContinuityOnly-Tuple{}","page":"Internals","title":"HallThruster.ContinuityOnly","text":"ContinuityOnly\n\nA ConservationLawSystem in which only continuity (mass conservation) is solved, while velocity and temperature are held constant. Must specify a constant velocity (in m/s) and temperature (in K).\n\njulia> equation = ContinuityOnly(u = 300, T = 500)\n_ContinuityOnly(u = 300.0 m/s, T = 500.0 K)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.EulerEquations-Tuple{}","page":"Internals","title":"HallThruster.EulerEquations","text":"EulerEquations\n\nA ConservationLawSystem for the inviscid Navier-Stokes equations, better known as the Euler equations. Velocity and temperature are variable, so the values held in the ConservationLawSystem are set to zero and subsequently unused.\n\njulia> equation = EulerEquations()\n_EulerEquations()\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.IsothermalEuler-Tuple{}","page":"Internals","title":"HallThruster.IsothermalEuler","text":"IsothermalEuler\n\nA ConservationLawSystem in which only continuity and inviscid momentum are solved, while temperature is held constant. Must specify a constant temperature (in K).\n\njulia> equation = IsothermalEuler(T = 500)\n_IsothermalEuler(T = 500.0 K)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.backward_diff_coeffs-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.backward_diff_coeffs","text":"backward_diff_coeffs(x0, x1, x2)\n\nGenerate finite difference coefficients for a backward first derivative approximation at the point x2 on a three-point stencil at points x0, x1, and x2\n\njulia> backward_diff_coeffs(-2//1, -1//1, 0//1)\n(1//2, -2//1, 3//2)\njulia> backward_diff_coeffs(-3//2, -1//1, 0//1)\n(4//3, -3//1, 5//3)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.backward_difference-NTuple{6, Any}","page":"Internals","title":"HallThruster.backward_difference","text":"backward_difference(f0, f1, f2, x0, x1, x2)\n\nGiven three points x0, x1, and x2, and the function values at those points, f0, f1, f2, compute the second-order approximation of the derivative at x2\n\nf(x) = x^4\nx0, x1, x2 = 1.9999998, 1.9999999, 2\nbd = backward_difference(f(x0), f(x1), f(x2), x0, x1, x2)\nbd ≈ 32\n\n# output\n\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.central_diff_coeffs-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.central_diff_coeffs","text":"central_diff_coeffs(x0, x1, x2)\n\nGenerate finite difference coefficients for a central first derivative approximation at the point x1 on a three-point stencil at points x0, x1, and x2\n\njulia> central_diff_coeffs(-1//1, 0//1, 1//1)\n(-1//2, 0//1, 1//2)\njulia> central_diff_coeffs(-1//2, 0//1, 1//1)\n(-4//3, 1//1, 1//3)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.central_difference-NTuple{6, Any}","page":"Internals","title":"HallThruster.central_difference","text":"central_difference(f0, f1, f2, x0, x1, x2)\n\nGiven three points x0, x1, and x2, and the function values at those points, f0, f1, f2, compute the second-order approximation of the derivative at x1\n\nf(x) = x^4\nx0, x1, x2 = 1.9999999, 2, 2.0000001\ncd = central_difference(f(x0), f(x1), f(x2), x0, x1, x2)\ncd ≈ 32\n\n# output\n\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.channel_area-Tuple{Any, Any}","page":"Internals","title":"HallThruster.channel_area","text":"channel_area(outer_radius, inner_radius, length)\n\nCompute the area of a Hall thruster channel from its dimensions\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.channel_area-Tuple{NamedTuple{(:domain, :channel_length, :inner_radius, :outer_radius), Tuple{Tuple{Float64, Float64}, Float64, Float64, Float64}}}","page":"Internals","title":"HallThruster.channel_area","text":"channel_area(geometry::Geometry1D)\n\nCompute the area of the Hall thruster channel from the given Geometry1D object\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.coulomb_logarithm","page":"Internals","title":"HallThruster.coulomb_logarithm","text":"coulomb_logarithm(ne, Tev, Z = 1)\n\ncalculate coulomb logarithm for electron-ion collisions as a function of ion charge state Z, electron number density in m^-3, and electron temperature in eV.\n\n\n\n\n\n","category":"function"},{"location":"internals/#HallThruster.downwind_diff_coeffs-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.downwind_diff_coeffs","text":"downwind_diff_coeffs(x0, x1, x2)\n\nGenerate finite difference coefficients for a downwind first derivative approximation at the point x2 on a three-point stencil at points x0, x1, and x2 (uses only points x1 and x2)\n\njulia> downwind_diff_coeffs(-1//1, 0//1, 2//1)\n(0//1, -1//2, 1//2)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.electron_collision_freq-NTuple{4, Any}","page":"Internals","title":"HallThruster.electron_collision_freq","text":"electron_collision_freq(Tev::Float64, nn::Float64, ne::Float64, m::Float64)\n\ncalculate classical collision frequency, consisting of electron neutral and electron ion collision frequencies. Eq. 3.6-12 and 3.6-14, from Fundamentals of  Electric Propulsion, Goebel and Katz, 2008.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.electron_mobility-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.electron_mobility","text":"electron_mobility(νan::Float64, νc::Float64, B::Float64)\n\ncalculates electron transport according to the generalized Ohm's law as a function of the classical and anomalous collision frequencies and the magnetic field.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.forward_diff_coeffs-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.forward_diff_coeffs","text":"forward_diff_coeffs(x0, x1, x2)\n\nGenerate finite difference coefficients for a forward first derivative approximation  at the point x0 on a three-point stencil at points x0, x1, and x2\n\njulia> forward_diff_coeffs(1.0, 2.0, 3.0)\n(-1.5, 2.0, -0.5)\njulia> forward_diff_coeffs(0//1, 1//2, 3//2)\n(-8//3, 3//1, -1//3)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.forward_difference-NTuple{6, Any}","page":"Internals","title":"HallThruster.forward_difference","text":"forward_difference(f0, f1, f2, x0, x1, x2)\n\nGiven three points x0, x1, and x2, and the function values at those points, f0, f1, f2, compute the second-order approximation of the derivative at x0\n\nf(x) = x^4\nx0, x1, x2 = 2.0, 2.000001, 2.000002\nfd = forward_difference(f(x0), f(x1), f(x2), x0, x1, x2)\nfd ≈ 32\n\n# output\n\ntrue\n\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.freq_electron_electron-Tuple{Number, Number}","page":"Internals","title":"HallThruster.freq_electron_electron","text":"freq_electron_electron(ne, Tev)\n\nEffective frequency at which electrons are scattered due to collisions with other electrons\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.freq_electron_ion-Tuple{Number, Number, Number}","page":"Internals","title":"HallThruster.freq_electron_ion","text":"freq_electron_ion(ne, Tev, Z)\n\nEffective frequency at which electrons are scattered due to collisions with ions\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.freq_electron_neutral-Tuple{Number, Number, Any}","page":"Internals","title":"HallThruster.freq_electron_neutral","text":"freq_electron_neutral(nn, Tev)\n\nEffective frequency of electron scattering caused by collisions with neutrals\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.generate_grid","page":"Internals","title":"HallThruster.generate_grid","text":"generate_grid(geometry, ncells)\n\nGenerate a one-dimensional uniform grid on the domain specified in the geomety. Returns number of cells, coordinates of cell centers (plus ghost cells face coordinates), interface/edges and volume of a cell for number density calculations. \n\n\n\n\n\n","category":"function"},{"location":"internals/#HallThruster.interpolation_coeffs-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.interpolation_coeffs","text":"interpolation_coeffs(x, x0, x1, y0, y1)\n\nCompute the coefficients for interpolation between two points (x0, y0) and (x1, y1) such that y = c0 * y0 + c1 * y1 ```jldoctest;setup = :(using HallThruster: itpcoeffs, lerp) julia> c0, c1 = interpolationcoeffs(0.5, 0.0, 1.0, 0.0, 2.0) (0.5, 0.5) julia> c0 * 0.0 + c1 * 2.0 == lerp(0.5, 0.0, 1.0, 0.0, 2.0) true\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.lerp-NTuple{5, Any}","page":"Internals","title":"HallThruster.lerp","text":"lerp(x, x0, x1, y0, y1)\n\nInterpolate between two points (x0, y0) and (x1, y1) ```jldoctest;setup = :(using HallThruster: lerp) julia> lerp(0.5, 0.0, 1.0, 0.0, 2.0) 1.0\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.read_restart-Tuple{AbstractString}","page":"Internals","title":"HallThruster.read_restart","text":"read_restart(path::AbstractString)\n\nLoad a restart file from path.\n\nThe filetype can be anything supported by FileIO, though JLD2 is preferred.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.second_deriv_central_diff-NTuple{6, Any}","page":"Internals","title":"HallThruster.second_deriv_central_diff","text":"second_deriv_central_diff(f0, f1, f2, x0, x1, x2)\n\nGiven three points x0, x1, and x2, and the function values at those points, f0, f1, f2, compute the second-order approximation of the second derivative at x1\n\nf(x) = x^4\nx0, x1, x2 = 1.9999, 2.0, 2.0001\nsd = second_deriv_central_diff(f(x0), f(x1), f(x2), x0, x1, x2)\nsd ≈ 48\n\n# output\n\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.second_deriv_coeffs-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.second_deriv_coeffs","text":"second_deriv_coeffs(x0, x1, x2)\n\nGenerate finite difference coefficients for a central second derivative approximation at the point x1 on a three-point stencil at points x0, x1, and x2\n\njulia> second_deriv_coeffs(-2//1, 0//1, 2//1)\n(1//4, -1//2, 1//4)\njulia> second_deriv_coeffs(-1//2, 0//1, 1//1)\n(8//3, -4//1, 4//3)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.solve_potential_edge!-Tuple{Any, Any}","page":"Internals","title":"HallThruster.solve_potential_edge!","text":"solve_potential!(; U::Matrix{Float64}, params::NamedTuple)\n\nfunction to solve the potential equation derived from the generalized Ohm's law and employing charge conservation using quasineutrality. Second derivatives approximated with 2nd order central difference scheme, first derivatives with central difference. Centers of computational mesh placed on edges of fluid mesh, therefore edges correspond to boundaries for fluid. If required, interpolation is used to infer properties at mesh boundaries. Potential is a function of magnetic field, anomalous and classical collision frequency, neutral and ion density as well as ion velocity, and electron density and temperature leading to electron pressure. Solved by applying Thomas algorithm, which is of complexity O(n) and valid if matrix tridiagonal and diagonally dominant. The latter assumption almost always holds unless there is a huge discontinuity in either electron mobility or electron density.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.upwind_diff_coeffs-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.upwind_diff_coeffs","text":"upwind_diff_coeffs(x0, x1, x2)\n\nGenerate finite difference coefficients for a upwind first derivative approximation at the point x2 on a three-point stencil at points x0, x1, and x2 (uses only points x0 and x1)\n\njulia> upwind_diff_coeffs(-3//1, 0//1, 2//1)\n(-1//3, 1//3, 0//1)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.write_restart-Tuple{AbstractString, Any}","page":"Internals","title":"HallThruster.write_restart","text":"write_restart(path::AbstractString, sol)\n\nWrite a restart file to path`.\n\nThis can be reloaded to resume a simulation. The filetype can be anything supported by FileIO, though JLD2 is preferred.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.σ_en-Tuple{Any}","page":"Internals","title":"HallThruster.σ_en","text":"σ_en(Tev)\n\nElectron neutral collision cross section in m² as a function of electron temperature in eV. Eq. 3.6-13, from Fundamentals of Electric Propulsion, Goebel and Katz, 2008.\n\n\n\n\n\n","category":"method"}]
}
