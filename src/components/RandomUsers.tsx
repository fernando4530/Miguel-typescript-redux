import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, addUser } from "../redux/reducers/UserSlice";
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

  useEffect(() => {
    fetchNewUserData();
  }, []);

  const fetchNewUserData = async () => {
    const userData = await fetchRandomUserData();
    dispatch(setCurrentUser(userData));
    setUserAvatar(userData.picture.large); // Ajustar la propiedad del avatar según la nueva estructura
  };

  const handleSaveUser = () => {
    if (currentUser) {
      dispatch(addUser(currentUser));
    }
    fetchNewUserData();
  };

  const handleLoadNewUser = () => {
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
          <Button
            sx={{ boxShadow: 4 }}
            onClick={handleLoadNewUser}
            variant="outlined"
            startIcon={<ArrowForwardIcon />}
          >
            Siguiente Usuario
          </Button>
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
    </div>
  );
}

export default RandomUsers;
