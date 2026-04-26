# STICS Troubleshooting

This page exists so the next person does not have to fight the same demons in
the dark.

## Symptom: `unexpected 'else'`

Cause:

- multi-line R `if` block without braces

Fix:

- wrap both branches in `{ }`

## Symptom: observations all show `NA`

Cause:

- seed-size labels in the raw observation table do not match the friendly labels
  in the simulation table

Fix:

- map `Small`, `Medium`, `Large` to the actual CSV patterns like `<35`, `>35`,
  and `>75`

## Symptom: `Not any Stics directories found`

Cause:

- workspace is flat
- no per-USM subdirectories with `new_travail.usm`

Fix:

- generate text files per USM
- move them into one subdirectory per USM

## Symptom: process exits with status 9

Treat this as a fatal runtime failure, not a cosmetic warning.

Common causes:

- missing `var.mod`, `rap.mod`, or `prof.mod`
- incomplete `fictec1.txt`
- incomplete `station.txt`

## Symptom: `could not open var.mod`

Cause:

- support config files were not copied from `JavaSTICS/config/`

Fix:

- copy `var.mod`, `rap.mod`, and `prof.mod` into every USM directory

## Symptom: `Error reading tec file`

Cause:

- management XML template was too minimal

Fix:

- use the full `patate_tec.xml` example as base template
- substitute only the parameters that actually vary

## Symptom: `Error reading station file`

Cause:

- station XML template was too minimal

Fix:

- use the full `AuzevilleJ_sta.xml` example
- substitute only Chencha-specific values

## Symptom: objective at initial point returns `NA`

Cause:

- model run failed upstream
- output variables such as `mafruit` were not produced correctly

Fix:

- debug generation and runtime failures before blaming the optimizer

## Symptom: `GUDENE_plt.xml` not found during text generation

Cause:

- JavaSTICS looks for plant files in its own `plant/` directory

Fix:

- copy the cultivar file into the JavaSTICS installation plant directory before
  running `--generate-txt`

## First-response checklist

1. Confirm the workspace shape.
2. Confirm the cultivar file is where JavaSTICS expects it.
3. Confirm each USM directory has the `.mod` support files.
4. Confirm the station and tec files came from full templates.
5. Confirm the observed yield units were converted to `t/ha`.
