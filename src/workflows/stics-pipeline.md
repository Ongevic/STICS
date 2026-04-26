# STICS Build And Run

This is the runbook version: what to run, when to rerun it, and what each step
is really doing.

## Standard sequence

Run from `C:/Users/chich/Downloads/calib`:

```powershell
Rscript scripts/01_data_preparation/BUILD_STICS_WORKSPACE.R
Rscript scripts/02_calibration/MODEL_STICS_CALIBRATE.R
Rscript scripts/02_calibration/MODEL_STICS_VALIDATE.R
```

## Step 1: Build workspace

`BUILD_STICS_WORKSPACE.R` does the heavy lifting:

- finds the project root
- defines the experiment table
- joins observation data
- writes shared XML inputs
- builds per-USM management files
- calls `JavaSticsCmd.exe --generate-txt`
- creates one text directory per USM
- copies `var.mod`, `rap.mod`, and `prof.mod`

## Rebuild when these change

- cultivar file content
- soil data
- weather data
- planting or harvest timing
- CO2 in the climate file
- fertilizer timing or amount

You do not need to rebuild between calibration and validation if the inputs did
not change.

## Experiment table logic

The experiment table is the master definition of the 12 simulations:

- round
- seed size
- planting day-of-year
- harvest day-of-year
- stem density

If those definitions are wrong, everything downstream can look internally
consistent while still describing the wrong experiment.

## Forced harvest logic

This setup models fixed harvest dates intentionally.

- `codestade = 1` keeps forcing mode on
- `irec` is the harvest date
- `irecbutoir` is the backstop date
- `stdrpmat` is set high enough that physiological maturity will not be reached
  first

That is not a hack. It matches an experiment where harvest timing is imposed.

## Important working rule

Always run from the project root. The scripts rely on relative paths such as:

```r
source("scripts/config.R")
```

Running from the wrong directory is a completely avoidable self-own.

