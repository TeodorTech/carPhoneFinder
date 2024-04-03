import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#43c9e0",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const CustomTheme = createTheme({ ...themeOptions });

export default CustomTheme;
