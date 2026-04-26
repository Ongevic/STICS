# WOFOST

WOFOST is the workflow that rewards discipline. The clean version is elegant:
prepare inputs, screen parameters, calibrate a curated subset, and keep the
environment inputs out of the line of fire.

## Mission

Set up, screen, and calibrate the WOFOST potato workflow while preserving a
clean distinction between:

- environmental inputs
- donor cultivar baseline
- local Gudene override values
- calibration knobs

## Main entry points

```powershell
Rscript scripts/00_setup/WOFOST_CREATE_GUDENE_BASE.R
Rscript scripts/00_setup/WOFOST_SETUP.R
Rscript scripts/02_calibration/sensitivity_analysis_WOFOST.R
Rscript scripts/02_calibration/MODEL_WOFOST_CALIBRATE.R
Rscript scripts/03_diagnostics/WOFOST_01_cultivar_screen.R
```

## Important mental model

Some files are experimental truth and some are calibration freedom. Mixing them
up is how perfectly good workflows become fiction.

Usually not calibration knobs:

- `data/processed/Chencha.met`
- `data/raw/soil.xlsx`
- `C:/DSSAT48/Potato/E0457000.PTX`
- `data/processed/CH.SOL`

## What to read next

- `C:\Users\chich\Downloads\calib\docs\WOFOST_WORKFLOW.md`

## Expected outputs

- setup manifests in `data/processed/wofost_runtime/`
- sensitivity ranking files in `outputs/WOFOST/`
- recommended cultivar and parameter subsets in processed/runtime outputs

