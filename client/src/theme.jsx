import { createTheme, Button } from '@mantine/core';
import button_styles from './mantine-modules/Button.module.scss'

export const theme = createTheme({
  fontFamily: "niveau-grotesk",
  fontWeight: 300,
  colors: {
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
    green: [
      "#e6f9e6", // Lightest green
      "#ccf2cc",
      "#b3e6b3",
      "#99d699",
      "#80c480",
      "#66b266",
      "#4d9e4d",
      "#338a33",
      "#197519", // Darkest green
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
    "columbia-blue": [
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
    "light-brown": [
      "#faf6f5",
      "#f9f4f3",
      "#f8f2f1",
      "#f7f0ef",
      "#f6eeed",
      "#f5eceb",
      "#f4eae8",
      "#f3e8e6",
      "#f2e6e4",
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
    white: [
      "#FFFFFF", // Pure White
      "#FFFAFA", // Snow
      "#FFFFF0", // Ivory
      "#FFFAF0", // Floral White
      "#F8F8FF", // Ghost White
      "#F5F5F5", // White Smoke
      "#FFF5EE", // Seashell
      "#FAFAFA", // Alabaster
      "#FAEBD7", // Antique White
    ],
  },
  primaryColor: "red",

  defaultRadius: "7px",
  radius: {
    xs: "5px",
    sm: "7px",
    md: "10px",
    lg: "13px",
    xl: "15px",
  },
  headings: {
    sizes: {
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 400,
      },
      h4: {
        fontWeight: "300",
      },
      h5: {
        fontWeight: "300",
        fontSize: "1.2rem",
      },
      h6: {
        fontWeight: "300",
      },
      
    },
  },
  components: {
    Button: Button.extend({ classNames: button_styles.button }),
  },
});
