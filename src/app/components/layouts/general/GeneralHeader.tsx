import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

import HeaderLoginButton from "./subcomponents/HeaderLoginButton";

const GeneralHeader: FC = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        bgcolor: "primary.light",
      }}
    >
      <Stack direction={"row"}>
        <SearchIcon />
        <Typography fontWeight={"bold"}>CarPhone Finder</Typography>
      </Stack>

      <HeaderLoginButton />
    </Box>
  );
};

export default GeneralHeader;
