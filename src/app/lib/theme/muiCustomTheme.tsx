import { createTheme, ThemeOptions } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
  typography: {
    fontFamily: inter.style.fontFamily,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
};

const CustomTheme = createTheme({ ...themeOptions });

export default CustomTheme;
