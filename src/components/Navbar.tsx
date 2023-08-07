import { AppBar, Toolbar, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RandomUsers from "./RandomUsers";
import MyAgenda from "./MyAgenda";
import Favorites from "./Favorites";

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

          <Button
            color="inherit"
            sx={{
              color: "white",
              backgroundColor: "blue",
              marginLeft: "10px",
            }}
            onClick={handleShowFavorites}
          >
            Favoritos
          </Button>
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
