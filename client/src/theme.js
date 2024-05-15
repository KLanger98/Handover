import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: "niveau-grotesk, sans-serif",
  colors: {
    test: ["#f3f5f7"],
    blue: [
      "#f3f5f7",
      "#e6e6e6",
      "#cbccce",
      "#acb1b6",
      "#9199a1",
      "#808a95",
      "#768391",
      "#64707e",
      "#586571",
      "#485765", //blue.9
    ],
    "blue-grey": [
      "#eef4ff",
      "#dfe6f1",
      "#c0cbdb",
      "#9dafc6",
      "#8196b3",
      "#6e87a9",
      "#637fa5",
      "#526d91", //blue-grey.7
      "#476182",
      "#385376",
    ],
    "columbiaBlue": [
      "#eaf6ff",
      "#d9e8f7",
      "#b4cfe7", //columbia-blue.2
      "#8bb4d9",
      "#6a9ecb",
      "#548fc4",
      "#4788c3",
      "#3775ac",
      "#2c689b",
      "#185b8b",
    ],
    "ghost-white": [
      "#ebebff", //ghost-white.0
      "#d1d0fa",
      "#9e9df8",
      "#6865f7",
      "#3f39f6",
      "#291df7",
      "#2011f8",
      "#1707dd",
      "#0f04c5",
      "#0000ad",
    ],
    red: [
      "#ffe9e7",
      "#ffd2ce",
      "#ffa19b",
      "#fe6e65", //red.3
      "#fd4438",
      "#fd291a",
      "#fe190b",
      "#e30b00",
      "#ca0100",
      "#b00000",
    ],
    brown: [
      "#fff0f0",
      "#f1e3e1",
      "#d8c6c2",
      "#c1a6a3",
      "#ad8b87",
      "#a17a76",
      "#9c726c", //brown.6
      "#89605a",
      "#7c554f",
      "#6f4742",
    ],
  },
  primaryColor: "red",

  defaultRadius: "7px",
});