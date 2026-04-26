# STICS Files And Workspace

This workflow has enough file types to waste an afternoon if we do not label
them clearly.

## Files you create in the workspace

These live at the top level of `data/processed/stics_workspace/`.

| File | Scope | Purpose |
| --- | --- | --- |
| `usms.xml` | workspace | master index of all USMs and file links |
| `Chencha_sta.xml` | shared | station metadata |
| `Chencha.2020` | shared | climate data |
| `sols.xml` | shared | soil profile |
| `GUDENE_plt.xml` | shared | cultivar parameters |
| `Chencha_ini.xml` | shared | initial soil conditions |
| `R1_Small_tec.xml` | per USM | management file |
| `R1_Small.obs` | per USM | observed values for fitting |

## Files JavaSTICS generates per USM

| File | Purpose |
| --- | --- |
| `new_travail.usm` | STICS run descriptor |
| `ficplt1.txt` | plant parameters |
| `fictec1.txt` | management |
| `ficini.txt` | initial conditions |
| `climat.txt` | climate |
| `station.txt` | station metadata |
| `param.sol` | soil |
| `tempopar.sti` | master model parameters |
| `tempoparv6.sti` | compatibility parameters |

## Files STICS still needs you to copy

These are not generated automatically and must exist in every USM directory:

| File | Source | Why it exists |
| --- | --- | --- |
| `var.mod` | `JavaSTICS/config/` | daily output definition |
| `rap.mod` | `JavaSTICS/config/` | summary output definition |
| `prof.mod` | `JavaSTICS/config/` | soil profile output definition |

If these are missing, STICS can crash with a fatal file-open error.

## Required workspace shape

```text
stics_workspace/
├── usms.xml
├── Chencha_sta.xml
├── Chencha.2020
├── sols.xml
├── GUDENE_plt.xml
├── Chencha_ini.xml
├── R1_Small_tec.xml
├── R1_Small.obs
├── ...
├── R1_Small/
│   ├── new_travail.usm
│   ├── ficplt1.txt
│   ├── fictec1.txt
│   ├── ficini.txt
│   ├── climat.txt
│   ├── station.txt
│   ├── param.sol
│   ├── tempopar.sti
│   ├── tempoparv6.sti
│   ├── var.mod
│   ├── rap.mod
│   └── prof.mod
├── R1_Medium/
└── ...
```

## Soil and climate details worth remembering

- `HCCF` and `HMINF` are percentages, not fractions.
- Climate file missing values use `-999.9`.
- `codeetp = 4` means Priestley-Taylor, which lets STICS compute ETP from
  radiation plus temperature when wind and humidity are missing.

## Quick conversions

| Source unit | STICS unit | Formula |
| --- | --- | --- |
| HWAM kg/ha | `mafruit` t/ha | `kg/ha / 1000` |
| DUL fraction | `HCCF` percent | `fraction * 100` |
| LL15 fraction | `HMINF` percent | `fraction * 100` |

## Common workspace truth

The top-level XML files are the source of truth. The per-USM text directories
are generated artifacts and can be rebuilt.

