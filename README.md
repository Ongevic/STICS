# STICS – Personal Notes & Experiments

Personal notes and experiments related to the **STICS crop model** (Simulateur mulTIdisciplinaire pour les Cultures Standard), started during the STICS training workshop in March 2026.

## Contents

| File | Description |
|------|-------------|
| [`notes/STICS_training_march2026.md`](notes/STICS_training_march2026.md) | Notes taken during the March 2026 STICS training workshop |
| [`notes/experiments.md`](notes/experiments.md) | Post-training experiments, calibration runs, and findings |

## What is STICS?

STICS is a generic, dynamic crop-soil model developed by [INRAE](https://www.inrae.fr/en) (France). It simulates the growth, development, and yield of a wide range of annual and perennial crops by modelling:

- Crop phenology and biomass accumulation
- Water and nitrogen balances in the soil–plant–atmosphere continuum
- Soil organic matter and carbon dynamics

The model is steered through [JavaSTICS](https://www6.paca.inrae.fr/stics/STICS-USE-DOWNLOAD), a Java-based graphical interface, and can also be driven programmatically via the **SticsRPacks** suite in R.

## References

- Brisson N. *et al.* (1998). STICS: a generic model for the simulation of crops and their water and nitrogen balances. *European Journal of Agronomy*, 8, 113–132.
- Brisson N. *et al.* (2003). An overview of the crop model STICS. *European Journal of Agronomy*, 18, 309–332.
- [Official STICS website](https://www6.paca.inrae.fr/stics)
- [SticsRPacks documentation](https://sticsrpacks.github.io/CroptimizR/)
