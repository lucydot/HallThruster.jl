var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = HallThruster\nDocTestSetup = quote\n    using HallThruster\nend","category":"page"},{"location":"#HallThruster.jl","page":"Home","title":"HallThruster.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A 1D fluid Hall thruster code written in Julia. This will be filled in as the code is developed further.","category":"page"},{"location":"internals/","page":"Internals","title":"Internals","text":"CurrentModule = HallThruster","category":"page"},{"location":"internals/","page":"Internals","title":"Internals","text":"","category":"page"},{"location":"internals/","page":"Internals","title":"Internals","text":"Modules = [HallThruster]","category":"page"},{"location":"internals/#HallThruster.Air","page":"Internals","title":"HallThruster.Air","text":"Air::Gas\n\nEarth air at standard temperature and pressure\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Argon","page":"Internals","title":"HallThruster.Argon","text":"Argon::Gas\n\nArgon gas\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Electron","page":"Internals","title":"HallThruster.Electron","text":"Electron::Species\n\nElectron\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Krypton","page":"Internals","title":"HallThruster.Krypton","text":"Krypton::Gas\n\nKrypton gas\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.NA","page":"Internals","title":"HallThruster.NA","text":"NA\n\nNumber of atoms in a kg-mol (6.02214076e26 / kmol)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.R0","page":"Internals","title":"HallThruster.R0","text":"R0\n\nUniversal gas constant (8314.46261815324 J / kmol K)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.Xenon","page":"Internals","title":"HallThruster.Xenon","text":"Xenon::Gas\n\nXenon gas\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.e","page":"Internals","title":"HallThruster.e","text":"e\n\nElectron charge (1.602176634e-19 Coulomb)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.kB","page":"Internals","title":"HallThruster.kB","text":"kB\n\nBoltzmann constant (1.380649e-23 J/K)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.mₑ","page":"Internals","title":"HallThruster.mₑ","text":"mₑ\n\nElectron mass (9.10938356e-31 kilograms)\n\n\n\n\n\n","category":"constant"},{"location":"internals/#HallThruster.EnergyOVS","page":"Internals","title":"HallThruster.EnergyOVS","text":"mutable struct EnergyOVS\n\nEnables setting mu, ue, Tev and ne to certain values to very electron energy equation\n\n\n\n\n\n","category":"type"},{"location":"internals/#HallThruster.Gas","page":"Internals","title":"HallThruster.Gas","text":"Gas\n\nA chemical element in the gaseous state. Container for element properties used in fluid computations.\n\nFields\n\nname::String        Full name of gas (i.e. Xenon)\n\nshort_name::String  Short name/symbol (i.e. Xe for Xenon)\n\nγ::Float64          Specific heat ratio / adiabatic index\n\nM::Float64          Molar mass (grams/mol) or atomic mass units\n\nm::Float64          Mass of atom in kg\n\ncp::Float64         Specific heat at constant pressure in J / kg / K\n\ncv::Float64         Specific heat at constant volume in J / kg / K\n\nR::Float64          Gas constant in J / kg / K\n\n\n\n\n\n","category":"type"},{"location":"internals/#HallThruster.Gas-Tuple{Any, Any}","page":"Internals","title":"HallThruster.Gas","text":"Gas(name::String, short_name::String; γ::Float64, M::Float64)\n\nInstantiate a new Gas, providing a name, short name, the adiabatic index, and the molar mass. Other gas properties, including gas constant, specific heats at constant pressure/volume, and mass of atom/molecule in kg will are then computed.\n\njulia> Gas(\"Xenon\", \"Xe\", γ = 5/3, M = 83.798)\nXenon\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.Species","page":"Internals","title":"HallThruster.Species","text":"Species\n\nRepresents a gas with a specific charge state. In a plasma, different ionization states of the same gas may coexist, so we need to be able to differentiate between these.\n\njulia> Species(Xenon, 0)\nXe\n\njulia> Species(Xenon, 1)\nXe+\n\njulia> Species(Xenon, 3)\nXe3+\n\n\n\n\n\n","category":"type"},{"location":"internals/#HallThruster.B_field-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.B_field","text":"B_field(B_max::Float64, z::Float64, L_ch::Float64)\n\ndefines magnetic field as a function of position. \n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.ContinuityOnly-Tuple{}","page":"Internals","title":"HallThruster.ContinuityOnly","text":"ContinuityOnly\n\nA ConservationLawSystem in which only continuity (mass conservation) is solved, while velocity and temperature are held constant. Must specify a constant velocity (in m/s) and temperature (in K).\n\njulia> equation = ContinuityOnly(u = 300, T = 500)\n_ContinuityOnly(u = 300.0 m/s, T = 500.0 K)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.EulerEquations-Tuple{}","page":"Internals","title":"HallThruster.EulerEquations","text":"EulerEquations\n\nA ConservationLawSystem for the inviscid Navier-Stokes equations, better known as the Euler equations. Velocity and temperature are variable, so the values held in the ConservationLawSystem are set to zero and subsequently unused.\n\njulia> equation = EulerEquations()\n_EulerEquations()\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.IsothermalEuler-Tuple{}","page":"Internals","title":"HallThruster.IsothermalEuler","text":"IsothermalEuler\n\nA ConservationLawSystem in which only continuity and inviscid momentum are solved, while temperature is held constant. Must specify a constant temperature (in K).\n\njulia> equation = IsothermalEuler(T = 500)\n_IsothermalEuler(T = 500.0 K)\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.channel_area-Tuple{Any, Any}","page":"Internals","title":"HallThruster.channel_area","text":"channel_area(outer_radius, inner_radius, length)\n\nCompute the area of a Hall thruster channel from its dimensions\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.channel_area-Tuple{NamedTuple{(:domain, :channel_length, :inner_radius, :outer_radius), Tuple{Tuple{Float64, Float64}, Float64, Float64, Float64}}}","page":"Internals","title":"HallThruster.channel_area","text":"channel_area(geometry::Geometry1D)\n\nCompute the area of the Hall thruster channel from the given Geometry1D object\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.electron_collision_freq-NTuple{4, Any}","page":"Internals","title":"HallThruster.electron_collision_freq","text":"get_v_c(Tev::Float64, nn::Float64, ne::Float64, m::Float64)\n\ncalculate classical collision frequency, consisting of electron neutral and electron ion collision frequencies. Eq. 3.6-12 and 3.6-14, from Fundamentals of  Electric Propulsion, Goebel and Katz, 2008.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.electron_mobility-Tuple{Any, Any, Any}","page":"Internals","title":"HallThruster.electron_mobility","text":"cf_electron_transport(v_an::Float64, v_c::Float64, B::Float64)\n\ncalculates electron transport according to the generalized Ohm's law as a function of the classical and anomalous collision frequencies and the magnetic field.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.electron_pressure-Tuple{Any, Any}","page":"Internals","title":"HallThruster.electron_pressure","text":"electron_pressure(ne::Float64, Tev::Float64)\n\nideal gas law for electrons. Tev is in eV.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.generate_grid-Tuple{Any, Any}","page":"Internals","title":"HallThruster.generate_grid","text":"generate_grid(geometry, ncells)\n\nGenerate a one-dimensional uniform grid on the domain specified in the geomety. Returns number of cells, coordinates of cell centers (plus ghost cells face coordinates), interface/edges and volume of a cell for number density calculations. \n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.ln_λ-Tuple{Any, Any}","page":"Internals","title":"HallThruster.ln_λ","text":"ln_λ(ne::Float64, Tev::Float64)\n\ncalculate coulomb logarithm as a function of electron number density and electron temperature in eV. Eq. 3.6-15, from Fundamentals of  Electric Propulsion, Goebel and Katz, 2008.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.read_restart-Tuple{AbstractString}","page":"Internals","title":"HallThruster.read_restart","text":"read_restart(path::AbstractString)\n\nLoad a restart file from path.\n\nThe filetype can be anything supported by FileIO, though JLD2 is preferred.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.reconstruct!-NTuple{4, Any}","page":"Internals","title":"HallThruster.reconstruct!","text":"reconstruct!\n\nReconstruction using the MUSCL scheme. UL is the flux to the left, therefore evaluated on the right face, UR is the flux to the right, therefore evaluated on the left face.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.smooth_if","page":"Internals","title":"HallThruster.smooth_if","text":"smooth_if_gt(x, cutoff, v1, v2, k=10)\n\nComputes an analytic approximation to x < cutoff ? v1 : v2\n\n\n\n\n\n","category":"function"},{"location":"internals/#HallThruster.smooth_max","page":"Internals","title":"HallThruster.smooth_max","text":"smooth_max(x, y, k=10)\n\nComputes a smooth approximation to max(x, y)\n\n\n\n\n\n","category":"function"},{"location":"internals/#HallThruster.smooth_min","page":"Internals","title":"HallThruster.smooth_min","text":"smooth_min(x, y, k=10)\n\nCompute a smooth approximation to min(x, y)\n\n\n\n\n\n","category":"function"},{"location":"internals/#HallThruster.write_restart-Tuple{AbstractString, Any}","page":"Internals","title":"HallThruster.write_restart","text":"write_restart(path::AbstractString, sol)\n\nWrite a restart file to path`.\n\nThis can be reloaded to resume a simulation. The filetype can be anything supported by FileIO, though JLD2 is preferred.\n\n\n\n\n\n","category":"method"},{"location":"internals/#HallThruster.σ_en-Tuple{Any}","page":"Internals","title":"HallThruster.σ_en","text":"σ_en(Tev::Float64)\n\ncalculation electron neutral collision cross section in m²  as a function of electron temperature in eV. Eq. 3.6-13, from Fundamentals of  Electric Propulsion, Goebel and Katz, 2008.\n\n\n\n\n\n","category":"method"}]
}
