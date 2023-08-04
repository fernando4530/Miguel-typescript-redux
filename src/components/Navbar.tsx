import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import UserInfo from "./RandomUsers";
import SavedUsers from "./MyAgenda";

interface NavbarProps {
  showUserInfo: boolean;
  handleShowUserInfo: () => void;
  handleShowSavedUsers: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  showUserInfo,
  handleShowUserInfo,
  handleShowSavedUsers,
}) => {
  const buttons = [
    {
      label: "Usuarios random",
      icon: <AccountCircleIcon />,
      onClick: handleShowUserInfo,
      to: "/usuarios-random",
    },
    {
      label: "Mi Agenda",
      icon: <EventNoteIcon />,
      onClick: handleShowSavedUsers,
      to: "/mi-agenda",
    },
  ];

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "blueviolet" }}>
        <Toolbar>
          {buttons.map((button, index) => (
            <Link key={index} to={button.to} style={{ textDecoration: "none" }}>
              <Button
                color="inherit"
                sx={{
                  color: "white",
                  backgroundColor: "blue",
                  marginLeft: index > 0 ? "10px" : "0",
                }}
                onClick={button.onClick}
                startIcon={button.icon}
              >
                {button.label}
              </Button>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
      {showUserInfo ? <UserInfo /> : <SavedUsers />}
    </div>
  );
};

export default Navbar;
