# STICS Architecture

Understanding the STICS stack is half the battle. Most failures are not random.
They come from forgetting which layer owns which file.

## Two-layer model

```text
XML inputs you edit
        |
        | JavaSticsCmd.exe --generate-txt
        v
Per-USM text files STICS can read
        |
        | stics_modulo.exe
        v
Simulation outputs
```

## What each layer is responsible for

| Layer | Role | Typical files |
| --- | --- | --- |
| Workspace XML | Human-editable source of truth | `usms.xml`, `sols.xml`, `GUDENE_plt.xml`, `*_tec.xml` |
| JavaSTICS conversion | Turns XML into Fortran-readable text | `new_travail.usm`, `ficplt1.txt`, `fictec1.txt` |
| STICS executable | Runs the simulation itself | `mod_s*.sti`, `mod_b*.sti`, `mod_rapport.sti` |

## Why USM subdirectories matter

Calibration rewrites parameters repeatedly. That means the generated text files
cannot just sit in one flat directory or different simulations will overwrite
each other.

For this project:

- one simulation = one USM
- one USM = one subdirectory
- one workspace = top-level XML plus 12 USM subdirectories

## Mental model for parameter changes

CroptimizR does not directly edit `ficplt1.txt`. It edits the XML plant file,
then triggers regeneration of the text layer, then runs STICS again.

That means:

1. XML is the true editable source.
2. Text files are disposable generated artifacts.
3. If something looks wrong in generated text, the real fix is usually upstream.

## Outputs that matter most

| Output | Why it matters |
| --- | --- |
| `mod_s<USM>.sti` | Daily crop variables, including `mafruit` |
| `mod_b<USM>.sti` | Daily biomass outputs |
| `mod_rapport.sti` | Summary report |
| `mod_profil.sti` | Soil profile output |

## Design rule

When documenting or debugging STICS, always say which layer the issue belongs to:

- source XML
- text generation
- executable runtime

That simple distinction keeps the problem from getting blurry.

