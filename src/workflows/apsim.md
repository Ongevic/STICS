# APSIM

APSIM is where templates, runtime generation, and legacy comparison logic need
to stay extremely legible. If the templating layer gets muddy, everything
downstream starts looking correct right up until it is not.

## Mission

Generate, inspect, and trust APSIM runs through a template-driven workflow that
can still be compared against older validation paths.

## Source guide

- `C:\Users\chich\Downloads\calib\docs\APSIM_TEMPLATE_GUIDE.md`

## Documentation standard for APSIM pages

Every APSIM sub-page should eventually say:

- which template is the source of truth
- which script renders or mutates it
- which runtime files are generated
- which outputs are publication-facing
- which legacy path still matters for comparison

## Current recommendation

Treat APSIM docs as a split target:

- architecture pages for the template system
- runbooks for actual launches and validation

