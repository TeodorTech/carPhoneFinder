import { Box } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
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
      <Link href="/">
        <DirectionsCarFilledIcon />
      </Link>

      <HeaderLoginButton />
    </Box>
  );
};

export default GeneralHeader;
