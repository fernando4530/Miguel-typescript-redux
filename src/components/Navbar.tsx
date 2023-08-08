import React from "react";
import { AppBar, Toolbar, Button, Badge } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Link, Route, Routes } from "react-router-dom"; // Importa las funciones de enrutamiento
import RandomUsers from "./RandomUsers";
import Favorites from "./Favorites";
import MyAgenda from "./MyAgenda";

interface NavbarProps {
  handleShowFavorites: () => void;
  handleShowRandomUser: () => void;
  handleShowMyAgenda: () => void;
  showFavorites: boolean;
  showViews: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ handleShowFavorites }) => {
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
            component={Link} // Utiliza el componente Link para enrutamiento interno
            to="/randomusers" // Define la ruta a la que se redirigirá
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
              component={Link}
              to="/myagenda"
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
              component={Link}
              to="/favorites"
            >
              Favoritos
            </Button>
          </Badge>
        </Toolbar>
      </AppBar>
      <Button
        variant="contained"
        sx={{
          fontFamily: '"Segoe UI Symbol"',
          fontSize: "30px",
          color: "white",
          backgroundColor: "blueviolet",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 10,
          width: "100%",
        }}
      >
        Agenda tu usuario aleatorio
      </Button>

      {/* Rutas para las vistas */}
      <Routes>
        <Route path="/randomusers" element={<RandomUsers />} />
        <Route path="/myagenda" element={<MyAgenda />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default Navbar;
