# Post-Training Experiments & Findings

> Experiments carried out after the March 2026 STICS training, with results and lessons learned.

---

## Experiment 1 – Baseline Maize Simulation (Kenya Highlands)

**Objective**: Reproduce observed maize yields for a site in the Kenya Highlands using default STICS maize parameters and local climate/soil data.

**Site**: Eldoret, Kenya (0.52°N, 35.27°E, 2100 m a.s.l.)  
**Season**: Long rains 2024 (March – August)  
**Observed yield**: ~4.2 t ha⁻¹ (DM, national average for the region)

### Setup
- Climate: daily Tmin, Tmax, rain from a local AWS; radiation derived from ERA5; ETP computed internally (`etpMethod = 4`).
- Soil: 3-horizon clay-loam (Nitisol) – FC = 0.38 cm³ cm⁻³, WP = 0.18 cm³ cm⁻³.
- Variety: Pioneer DH04 (hybrid); phenological parameters adapted from CIMMYT trials.
- Management: sowing 10 March, density 5.3 plants m⁻², urea top-dress 60 kg N ha⁻¹ at V6.

### Results
| Variable | Simulated | Observed |
|----------|-----------|---------|
| Grain yield (t ha⁻¹) | 3.8 | 4.2 |
| Anthesis date | 3 June | 7 June |
| Maturity date | 9 August | 12 August |
| Max. LAI | 3.9 | – |

### Observations
- Yield slightly underestimated (RRMSE ≈ 10%). Likely due to conservative `ebmax` (default = 3.7 g MJ⁻¹).
- Anthesis simulated 4 days early → `stlevdrp` may need a small upward adjustment (~20 °Cd).
- `swfac` dipped below 0.6 in late June (short dry spell); field data showed mild wilting – consistent.

**Next step**: Calibrate `ebmax` and `stlevdrp` with CroptimizR using 3 site-years of data.

---

## Experiment 2 – CroptimizR Calibration of Maize

**Objective**: Formally calibrate `ebmax` and `stlevdrp` for Pioneer DH04 using 3 site-years.

### R setup
```r
library(SticsOnR)
library(SticsRFiles)
library(CroptimizR)

javastics_path <- "/opt/JavaSTICS-1.5.2-STICS-10.0.0"
workspace_path <- "~/stics_workspaces/maize_eldoret"

# Define parameter bounds
param_info <- list(
  lb = c(ebmax = 2.5, stlevdrp = 700),
  ub = c(ebmax = 5.0, stlevdrp = 950)
)

# Observed data (site-year × variable)
obs_list <- read_obs_to_list(
  obs_files = list.files(workspace_path, "*.obs", full.names = TRUE)
)

# Run calibration (Nelder-Mead simplex)
optim_results <- optim_stics(
  param_info    = param_info,
  obs_list      = obs_list,
  crit_function = crit_log_cwss,
  stics_path    = javastics_path,
  workspace     = workspace_path,
  nb_rep        = 5
)

print(optim_results$final_values)
```

### Calibrated values
| Parameter | Initial (default) | Calibrated |
|-----------|-------------------|-----------|
| `ebmax`   | 3.70              | 4.12      |
| `stlevdrp`| 820               | 848       |

### Calibration performance
| Metric | Before | After |
|--------|--------|-------|
| RMSE yield (t ha⁻¹) | 0.61 | 0.27 |
| RRMSE yield (%) | 14.5 | 6.4 |

### Lessons learned
- Starting from 5 random initial points (`nb_rep = 5`) avoids local minima.
- `crit_log_cwss` (log-transformed, variance-scaled sum of squares) works better than plain RMSE when observed values span different magnitudes.
- Always check that calibrated values remain biologically plausible (e.g. `ebmax` > 5 g MJ⁻¹ is unrealistic for maize).

---

## Experiment 3 – Sensitivity Analysis with Morris Screening

**Objective**: Rank parameters by importance for grain yield prediction.

```r
library(CroptimizR)
library(sensitivity)

# 10 parameters screened
params_to_screen <- list(
  lb = c(ebmax=2.5, stlevdrp=700, dlaimax=0.0002, adens=-1.5,
         Nmaxuptake=0.004, tdmin=4, tdmax=38, pgrainmaxi=0.35,
         stamflax=300, stlaxsen=400),
  ub = c(ebmax=5.0, stlevdrp=950, dlaimax=0.0012, adens=0,
         Nmaxuptake=0.010, tdmin=8, tdmax=42, pgrainmaxi=0.55,
         stamflax=600, stlaxsen=700)
)

sa_results <- sa_stics(
  param_info    = params_to_screen,
  obs_list      = obs_list,
  method        = "morris",
  nb_rep        = 15,
  stics_path    = javastics_path,
  workspace     = workspace_path
)

plot_sensitivity(sa_results)
```

### Results (ranking by µ* – mean absolute elementary effect)
1. `ebmax` – radiation use efficiency → **most influential**
2. `stlevdrp` – thermal time to grain filling
3. `dlaimax` – LAI growth rate
4. `pgrainmaxi` – maximum grain weight
5. `adens` – density competition
6–10. `Nmaxuptake`, `tdmin`, `stamflax`, `stlaxsen`, `tdmax` – moderate to low influence

**Takeaway**: Calibration effort should focus on the top 3–4 parameters; the others can be kept at literature/default values.

---

## Experiment 4 – Climate Change Impact Assessment (2050 Horizon)

**Objective**: Estimate impact of a +1.5°C / +2°C warming scenario on maize yield, with and without CO₂ fertilisation.

### Scenario construction
- **Baseline**: observed 1990–2020 climate (ERA5 reanalysis).
- **+1.5°C**: add daily Δ temperature offset; adjust precipitation with regional CORDEX scaling factors (−5% for long rains).
- **+2°C**: same approach with larger offsets.
- CO₂: 420 ppm (present), 490 ppm (+1.5°C scenario), 560 ppm (+2°C scenario).

### Results (mean yield, 30-year ensemble, t ha⁻¹)
| Scenario | No CO₂ effect | With CO₂ effect |
|----------|---------------|-----------------|
| Baseline (2020) | 4.1 | 4.1 |
| +1.5°C (CO₂=490) | 3.6 (−12%) | 3.8 (−7%) |
| +2.0°C (CO₂=560) | 3.1 (−24%) | 3.4 (−17%) |

### Key observations
- Temperature increase reduces yield mainly through shortened grain-filling period (faster accumulation of thermal time → earlier maturity → less biomass accumulation).
- CO₂ fertilisation partially offsets heat stress for C3 crops; for maize (C4), the effect is smaller – consistent with literature.
- High year-to-year variability (CV ≈ 22%) driven by rainfall variability, emphasising the importance of ensemble runs.

---

## Experiment 5 – Nitrogen Leaching Under Different Fertilisation Strategies

**Objective**: Compare cumulative NO₃ leaching under three N management options for the Eldoret site.

| Strategy | Total N (kg ha⁻¹) | Application timing |
|----------|-------------------|--------------------|
| S1 – Broadcast urea | 120 | All at sowing |
| S2 – Split urea | 120 | 60 at sowing + 60 at V6 |
| S3 – Fertigation (urea) | 120 | Weekly micro-doses V1–V12 |

### Simulated NO₃ leaching (kg N ha⁻¹ season⁻¹)
| Strategy | Leaching | Yield (t ha⁻¹) | NUE (%) |
|----------|----------|----------------|---------|
| S1 | 28.3 | 4.0 | 58 |
| S2 | 14.7 | 4.2 | 73 |
| S3 | 9.1 | 4.3 | 80 |

### Observations
- Single broadcast application leads to highest leaching, especially on the clayey Nitisol where soil N can accumulate before root growth.
- Fertigated approach nearly halves leaching vs. S2 and improves NUE by 7 percentage points.
- STICS captured the expected timing effects well; caution: real-world variability in fertiliser application uniformity is not represented.

---

## Outstanding Questions & Next Steps

- [ ] Validate calibrated parameters against an independent 2-year dataset (2025 long and short rains).
- [ ] Test intercropping module: maize × bean relay planting (a common practice in the region).
- [ ] Explore STICS v10 new features: improved root architecture module, updated SOM decomposition.
- [ ] Link outputs to economic model to estimate farm-level profitability under climate scenarios.
- [ ] Contribute calibrated parameter file for Pioneer DH04 to the STICS community parameter database.
