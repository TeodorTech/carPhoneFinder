"use client";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { FC, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";

// we use client for this component because of the onClick interactions, since we're bound to use the client, we will be directly using the useSession provider here, instead of passing from props aswell
const HeaderLoginButton: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const session = useSession();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!session?.data?.user?.name) {
    return (
      <Button
        variant="contained"
        onClick={() => signIn()}
        endIcon={<LoginIcon />}
      >
        Sign in
      </Button>
    );
  }

  return (
    <Box>
      <IconButton onClick={(e) => handleOpen(e)}>
        <Avatar
          alt={session.data?.user?.name}
          src={session.data?.user?.image ?? "/unknown_avatar.png"}
        ></Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HeaderLoginButton;
