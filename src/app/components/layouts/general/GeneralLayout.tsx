import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import GeneralHeader from "./GeneralHeader";

const GeneralLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <GeneralHeader />
      <Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default GeneralLayout;
