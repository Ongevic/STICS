# STICS Training – March 2026

> Personal notes taken during the STICS crop-model training workshop, March 2026.

---

## Day 1 – Introduction & Model Architecture

### What STICS simulates
- **Plant growth**: phenological development (emergence → maturity), leaf area index (LAI), above- and below-ground biomass, yield formation.
- **Water balance**: rainfall, runoff, drainage, evapotranspiration (ETP), soil water content per horizon.
- **Nitrogen balance**: mineralisation, nitrification, denitrification, leaching, plant N uptake, residue decomposition.
- **Carbon balance**: soil organic matter (SOM) fractions, CO₂ fluxes.

### Main file types
| File | Purpose |
|------|---------|
| `ficini.txt` | General initialisation (site, dates) |
| `climat.txt` | Daily weather data (Tmin, Tmax, ETP, rain, radiation) |
| `sol.txt` | Soil profile description (horizons, texture, initial states) |
| `param.sol` | Soil hydraulic parameters (FC, WP, Ks …) |
| `ficplt1.txt` | Plant (species) parameter file |
| `fictec1.txt` | Technical (management) file |
| `mod_s*.sti` | Output files |

### JavaSTICS interface
- Workspace = a folder containing all input files + `new_travail.sol`.
- USM (Unité de Simulation) = one simulation unit (crop × year × soil × management).
- Run a single USM: **Run → Run selected USM**.
- Run all USMs in a workspace: **Run → Run all USMs**.

### Key plant parameters to know
| Parameter | Meaning |
|-----------|---------|
| `stlevamf` | Sum of temperatures (°Cd) from emergence to AMF (beginning of rapid leaf growth) |
| `stamflax` | °Cd from AMF to LAX (maximum LAI) |
| `stlaxsen` | °Cd from LAX to SEN (senescence) |
| `stsenlan` | °Cd from SEN to LAN (end of leaf growth) |
| `stlevdrp` | °Cd from emergence to DRP (beginning of grain filling) |
| `stdrpmat` | °Cd from DRP to MAT (physiological maturity) |
| `dlaimax`  | Maximum daily LAI increment (m² m⁻² °Cd⁻¹) |
| `ebmax`    | Maximum radiation use efficiency (g MJ⁻¹) |
| `adens`    | Density compensation coefficient |

### Temperature sum approach
- STICS uses **growing degree days** (GDD) above a base temperature (`tdmin`) and below a ceiling temperature (`tdmax`).
- `UDEVCULT = sum(max(0, min(Tmean, tdmax) − tdmin))` per day.

---

## Day 2 – Input Data, Parameterisation & Calibration

### Climate file format (`climat.txt`)
```
station: <name>  lat: <°>  alt: <m>  ta: <codeinst>
<year> <month> <day> <Tmin> <Tmax> <Tmoy> <wind> <hum> <ETP> <rain> <radiation>
```
- ETP: Penman-Monteith preferred; use `etpMethod = 1` in `ficini`.
- Radiation in MJ m⁻² d⁻¹.

### Soil description (`sol.txt`)
- Up to 5 horizons per soil.
- Mandatory fields per horizon: depth (cm), bulk density, clay%, silt%, sand%, initial SWC, initial NO₃, initial NH₄.
- Field capacity (FC) and wilting point (WP) can be provided directly or estimated from texture using pedotransfer functions (e.g. Rawls & Brakensiek).

### Calibration workflow
1. **Fix structural parameters** that are known (phenological development parameters from controlled experiments or literature).
2. **Identify sensitive parameters** for your target variable (yield → `ebmax`, `adens`; LAI → `dlaimax`; N uptake → `Nmaxuptake`, `Kc`).
3. Use **CroptimizR** (R package) for formal optimisation:
   ```r
   library(CroptimizR)
   library(SticsRFiles)
   library(SticsOnR)
   ```
4. Choose an objective function: RMSE, RRMSE, or Kling-Gupta Efficiency (KGE).
5. Validate on independent dataset (split-sample or leave-one-out).

### Tips from the trainers
- Always check **daily outputs** to diagnose unexpected behaviour (not just final yield).
- Water stress factor (`swfac`) and N stress factor (`innlai`) are key diagnostics.
- Soil N mineralisation is sensitive to `FcArgi` (clay activity factor) – easy to get wrong in tropical soils.
- Avoid calibrating too many parameters simultaneously (risk of equifinality).

---

## Day 3 – Outputs, Uncertainty & Practical Applications

### Important output variables
| Variable | Description |
|----------|-------------|
| `masec(n)` | Above-ground dry biomass (t ha⁻¹) |
| `mafruit` | Yield (t ha⁻¹) |
| `lai(n)` | Leaf area index (m² m⁻² ground) |
| `swfac` | Water stress index (1 = no stress, 0 = maximum stress) |
| `tetstomate` | Stomatal transpiration (mm d⁻¹) |
| `raint` | Intercepted PAR (MJ m⁻²) |
| `QNplante` | Total N in plant (kg ha⁻¹) |
| `inns` | N nutrition index |
| `drain` | Drainage (mm d⁻¹) |
| `wlefleft` | Soil water content in each layer |

### Uncertainty & sensitivity analysis
- **Morris screening** (EE method) is practical for ranking parameter importance.
- **Sobol indices** (variance-based) for quantitative sensitivity analysis – expensive, needs many model runs.
- CroptimizR wraps **sensitivity** R package for both.

### Multi-year / multi-site simulations
- Use **workspace** with one USM per site × year combination.
- Automate with `SticsOnR::run_javastics()` or R wrappers.
- Results stored in `mod_sXXX.sti` files; read with `SticsRFiles::get_daily_results()`.

### STICS for climate-change studies
- Replace observed climate with downscaled GCM outputs (CORDEX, CMIP6).
- Assess CO₂ fertilisation effect: `co2` parameter in `ficini.txt` (currently a constant per simulation).
- Combine with adaptation scenarios (sowing date shift, cultivar change).

---

## Miscellaneous Notes & Q&A

- **Q**: Can STICS handle intercropping?  
  **A**: Yes – `ficplt2.txt` for the second crop; specific intercropping parameters (`interrang`, `hauteur` …).

- **Q**: Is there a way to batch-run without JavaSTICS GUI?  
  **A**: Yes – `SticsOnR::run_javastics(workspace, javastics_path)` or command-line `java -jar JavaSTICS.jar`.

- **Q**: How to handle missing ETP in the climate file?  
  **A**: Set `etpMethod = 2` (Shuttleworth-Wallace) or `4` (FAO-56 Penman-Monteith); STICS will compute ETP internally from Tmin, Tmax, radiation, and humidity.

- **Q**: Recommended R packages for STICS users?  
  **A**: `SticsRFiles`, `SticsOnR`, `CroptimizR`, `ggplot2` for visualisation, `dplyr`, `tidyr`.
