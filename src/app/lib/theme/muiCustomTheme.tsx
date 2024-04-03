import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const CustomTheme = createTheme({ ...themeOptions });

export default CustomTheme;
