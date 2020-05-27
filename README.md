# Conway's Game of Life

This repo is a basic implementation of [John Conway](https://en.wikipedia.org/wiki/John_Horton_Conway)'s famous "game of life" simulation written in vanilla Javascript and [p5.js](https://p5js.org/).

## What is the game of life?

The [game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a simulation of [_cellular automata_](https://en.wikipedia.org/wiki/Cellular_automaton) - a collection of individual "cells" with their own internal states, in this case alive or dead. In essence it distills life into just a few simple rules, but in aggregate surprisingly complex patterns emerge from these simple, immutable rules. It is a deterministic zero-player game, meaning all outcomes are the direct result of the program's initial state, not player interaction.

## About this implementation

In this implementation, a randomly generated distribution of live cells is inserted into the grid. The player has the option of using the mouse to toggle the states (alive/dead) of the cells before starting the game, but as soon as it starts the player can no longer influence the simulation.

Cells are colored based on their age - red cells are the youngest and cells more toward the blue end of the spectrum are older (with purple representing the oldest cells).

The player also has the ability to "slow down time" by adjusting the speed of the simulation to more closely observe the behaviors of the simulation.

## Contributing

There is no build process or any local dependencies required to work with this project locally - the only dependencies are loaded in through `<script>` tags.

The project is quite straightforward - there is a single `.css` file for styling, a single `.html` file containing all markdown, and three `.js` files, two of which contain the classes for the `Cell` and `Grid` objects, and the other (`life.js`) which contains the main p5 setup/draw loops and any DOM manipulation to handle the user's input.

I welcome new features, optimizations, or bug fixes - feel free to open a PR!

## Bug Reporting

Please report any bugs you encounter through this repo's **Issues** tracker.
