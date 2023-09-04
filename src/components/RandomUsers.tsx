import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/reducers/UserLoggedInSlice";
import { addUser, setCurrentUser } from "../redux/reducers/RandomUserSlice";
import { fetchRandomUserData } from "../services/Api";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";
import { RootState } from "../redux/Store";

function RandomUsers() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [userAvatar, setUserAvatar] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    fetchNewUserData();
  }, []);

  const fetchNewUserData = async () => {
    let userData;
    do {
      userData = await fetchRandomUserData();
    } while (userData.id === null); // Cambié userData.Id a userData.id

    dispatch(setCurrentUser(userData));
    setUserAvatar(userData.picture.large);
  };

  const handleSaveUser = () => {
    if (currentUser && currentUser.id.value !== null) {
      dispatch(addUser(currentUser));
      console.log("Usuario agendado:", currentUser);
    } else {
      alert ("Lo lamento este usuario no cumple con los requisitos de Mi Agenda")
      console.log("Usuario descartado:", currentUser);
    }
    fetchNewUserData();
  };

  const handleLogin = () => {
    if (!isUserLoggedIn && currentUser?.id.value !== null) {
      dispatch(setSelectedUser(currentUser));
      setIsUserLoggedIn(true);
      console.log("Usuario logueado:", currentUser);
    } else {
      console.log("Usuario descartado:", currentUser);
      fetchNewUserData();
    }
  };

  const handleLoadNewUser = () => {
    setIsUserLoggedIn(false);
    fetchNewUserData();
  };

  if (!currentUser) {
    return <div>Buscando Usuario...</div>;
  }

  const { name, email } = currentUser;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 8,
        }}
      >
        <CardContent sx={{ backgroundColor: "#b0c4de" }}>
          <Avatar
            src={userAvatar}
            alt="Avatar"
            sx={{
              width: 200,
              height: 200,
              margin: "0 auto",
              marginBottom: 3,
              border: "4px solid blue",
              backgroundColor: "blueviolet",
            }}
          />
          <Typography gutterBottom variant="h5" component="div" align="center">
            Nombre: {name.first}
          </Typography>
          <Typography variant="h5" component="div" align="center">
            Apellido: {name.last}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Email: {email}
          </Typography>
        </CardContent>
        <CardActions>
          {currentUser.id !== null && (
            <Button
              sx={{ boxShadow: 4 }}
              onClick={handleLoadNewUser}
              variant="outlined"
              startIcon={<ArrowForwardIcon />}
            >
              Siguiente Usuario
            </Button>
          )}
          <Button
            sx={{ boxShadow: 4 }}
            onClick={handleSaveUser}
            variant="contained"
            endIcon={<SaveIcon />}
          >
            Agendar Usuario
          </Button>
        </CardActions>
      </Card>
      <Button
        sx={{ boxShadow: 4 }}
        onClick={handleLogin}
        variant="contained"
        endIcon={<SaveIcon />}
        disabled={isUserLoggedIn}
      >
        Loguear
      </Button>
    </div>
  );
}

export default RandomUsers;
