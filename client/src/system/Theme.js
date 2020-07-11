import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#B63246",
    primaryDark: "#661c27",
    text: "#313131",
    secondary: "#6074F9",
    warning: "#ffa44f",
    pink: "#E42B6A",
    green: "#5ABB56",
    navy: "#3D3A62",
    bronze: "#F4CA8F",
    disabled: "#8E8E93",
    grey: "#F4F4F4",
    lineColor: "#E4E4E4",
    labelColor: "#9E9E9E",
    background: "#e9ebee",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
