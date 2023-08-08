import React from "react";
import { AppBar, Toolbar, Button, Badge } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import RandomUsers from "./RandomUsers";
import Favorites from "./Favorites";
import MyAgenda from "./MyAgenda";

interface NavbarProps {
  showViews: boolean;
  handleShowRandomUser: () => void;
  handleShowMyAgenda: () => void;
  handleShowFavorites: () => void;
  showFavorites: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  showViews,
  handleShowRandomUser,
  handleShowMyAgenda,
  handleShowFavorites,
  showFavorites,
}) => {
  const selectedUsers = useSelector(
    (state: RootState) => state.user.selectedUsers
  );
  const favoriteUsers = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "blueviolet" }}>
        <Toolbar>
          <Button
            color="inherit"
            sx={{
              color: "white",
              backgroundColor: "blue",
            }}
            onClick={handleShowRandomUser}
            startIcon={<AccountCircleIcon />}
          >
            Usuarios random
          </Button>

          <Badge badgeContent={selectedUsers.length} color="error">
            <Button
              color="inherit"
              sx={{
                color: "white",
                backgroundColor: "blue",
                marginLeft: "10px",
              }}
              onClick={handleShowMyAgenda}
              startIcon={<EventNoteIcon />}
            >
              Mi Agenda
            </Button>
          </Badge>

          <Badge badgeContent={favoriteUsers.length} color="error">
            <Button
              color="inherit"
              sx={{
                color: "white",
                backgroundColor: "blue",
                marginLeft: "10px",
              }}
              onClick={handleShowFavorites}
              startIcon={<FavoriteIcon />}
            >
              Favoritos
            </Button>
          </Badge>
        </Toolbar>
      </AppBar>

      {/* Lógica de renderizado condicional para mostrar las vistas alternadamente */}
      {showViews && !showFavorites && <RandomUsers />}
      {!showViews && !showFavorites && <MyAgenda />}
      {showFavorites && <Favorites />}
    </div>
  );
};

export default Navbar;
