# Workflow Map

This repo has several overlapping model pipelines. That is powerful, but it
also means confusion arrives fast if we do not name the lanes clearly.

## The Big Picture

| Workflow | Main purpose | Typical entry point | Canonical source note |
| --- | --- | --- | --- |
| STICS | Calibration and validation for Stics 10.0 potato setup | `RUN_STICS_PUBLICATION.ps1` plus STICS build/calibration scripts | `docs/STICS_CALIBRATION_GUIDE.md` |
| WOFOST | Setup, sensitivity screening, cultivar screening, calibration | `Rscript` calls inside `scripts/00_setup`, `02_calibration`, `03_diagnostics` | `docs/WOFOST_WORKFLOW.md` |
| APSIM | Template-driven APSIM setup and validation | APSIM scripts plus legacy R LORO path | `docs/APSIM_TEMPLATE_GUIDE.md` |
| LORO Repro | Reproduce local leave-one-round-out benchmarks and compare to archived metrics | `RUN_LEGACY_LOCAL_LORO.ps1` and Python/R validation paths | `docs/LOCAL_LORO_REPRO_20260425.md` |

## Reading order for a new person

1. Start with the workflow page in this book.
2. Open the linked source guide in `/docs`.
3. Confirm the launcher script still exists.
4. Check `outputs/` and `logs/` for the most recent trusted run.

## Repo zones that matter a lot

| Path | Why it matters |
| --- | --- |
| `docs/` | Long-form source notes and legacy guides |
| `workflow-docs/` | Structured browsable documentation site |
| `scripts/` | Most of the real pipeline entry points |
| `outputs/` | Model results and benchmark artifacts |
| `logs/` | Recovery runs, repro traces, and current evidence |
| `data/` | Raw and processed inputs feeding the models |

