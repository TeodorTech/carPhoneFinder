import { Box } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
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
        <Image src={`/logo.png`} alt="logo" width={80} height={65} />
      </Link>

      <HeaderLoginButton />
    </Box>
  );
};

export default GeneralHeader;
