# STICS Calibration And Validation

This section is about the fitting loop itself: what gets changed, how the model
is scored, and where the evidence lands.

## Calibration flow

```text
CroptimizR
  -> modifies plant XML parameters
  -> regenerates USM text files
  -> runs STICS in each USM directory
  -> reads mafruit outputs
  -> minimizes squared error across calibration USMs
```

## Calibrated parameters

The guide identifies these as the main fitted knobs:

| Parameter | XML name | Meaning |
| --- | --- | --- |
| sowing to emergence thermal time | `stlevamf` | sprouting speed |
| emergence to tuber initiation | `stlevdrp` | onset of tuber formation |
| vegetative RUE | `efcroiveg` | leaf and stem radiation use |
| reproductive RUE | `efcroirepro` | tuber radiation use |
| max tubers per square meter | `nbgrmax` | sink capacity |

## Unit trap that matters a lot

Observed HWAM is in `kg/ha`, but STICS `mafruit` is in `t/ha` dry matter.

Convert observations like this:

```text
t/ha = kg/ha / 1000
```

Miss that conversion and the objective can blow up immediately.

## Model selection switch

The calibration and validation scripts rely on:

```r
ACTIVE_MODEL <- "STICS"
source("scripts/config.R")
```

That line must be set before sourcing `config.R`, otherwise outputs can get sent
to the wrong model directory.

## Expected calibration outputs

After calibration:

```text
outputs/STICS/
├── stics_potato_results.rds
└── stics_final_params.csv
```

After validation:

```text
outputs/STICS/
├── validation_comparison.csv
└── yield_validation.png
```

## Validation scope

The guide frames calibration on R1 plus R2, then validation on R3 plus R4.
Keep that split explicit in future docs and plots so nobody confuses fitted data
with held-out evidence.

## Changing cultivar or CO2

Both are possible, but both are rebuild events.

- Change cultivar XML or cultivar references -> rebuild workspace.
- Change climate CO2 values -> rebuild workspace.

If the build step does not rerun, the generated text layer will still reflect
old assumptions.

