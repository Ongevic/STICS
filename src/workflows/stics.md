# STICS

STICS is the heavyweight workflow. It has the richest setup, the most moving
files, and the highest chance of becoming a haunted house if the workspace
layout drifts.

## Mission

Run and calibrate the Stics 10.0 Ethiopian potato setup, centered on the
GUDENE cultivar and the Gircha / Chencha experiment structure.

## What makes STICS special

- It is a two-layer system: XML inputs first, Fortran-readable text second.
- JavaSTICS generates text files.
- `stics_modulo.exe` runs the actual simulations.
- Per-USM subdirectories matter because parameter rewrites happen repeatedly
  during calibration.

## Fast start

Run from the project root:

```powershell
Rscript scripts/01_data_preparation/BUILD_STICS_WORKSPACE.R
Rscript scripts/02_calibration/MODEL_STICS_CALIBRATE.R
Rscript scripts/02_calibration/MODEL_STICS_VALIDATE.R
```

## Section map

- [Architecture](./stics-architecture.md): XML to text to executable.
- [Files And Workspace](./stics-files.md): what each file does and how the
  workspace must be laid out.
- [Build And Run](./stics-pipeline.md): the actual sequence and when to rebuild.
- [Calibration And Validation](./stics-calibration.md): how CroptimizR talks to
  STICS and where the outputs go.
- [Troubleshooting](./stics-troubleshooting.md): the failures already fought and
  won.

## Operational stance

When STICS breaks, think in this order:

1. Did the workspace build correctly?
2. Did XML become text correctly?
3. Did every USM get the support files it needs?
4. Did the executable run from the directory it expects?

## Current source of truth

Long-form source guide:

- `C:\Users\chich\Downloads\calib\docs\STICS_CALIBRATION_GUIDE.md`

## Typical artifacts

- workspace files under `data/processed/stics_workspace/`
- calibration and validation outputs under `outputs/`
- debugging clues in `logs/` and generated STICS output files

## Quick facts

- Model version: Stics 10.0
- Crop: potato
- Cultivar baseline: GUDENE
- Experiment shape: 12 USMs = 4 rounds x 3 seed sizes
- Core executables:
  - `C:/JavaSTICS-1.5.1-STICS-10.0.0/JavaSticsCmd.exe`
  - `C:/JavaSTICS-1.5.1-STICS-10.0.0/bin/stics_modulo.exe`

