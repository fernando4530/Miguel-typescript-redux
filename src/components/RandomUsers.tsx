import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { fetchRandomUserData } from "../services/Api";
import { setCurrentUser, addUser } from "../redux/reducers/UserSlice";
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

function RandomUsers() {
  // Obtener el dispatch y el estado "selectedUsers" y "currentUser" del store
  const dispatch = useDispatch();
  const { selectedUsers, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const [userAvatar, setUserAvatar] = useState("");

  // Al montar el componente, buscar un nuevo usuario
  useEffect(() => {
    fetchNewUserData();
  }, []);

  // Función para buscar un nuevo usuario
  const fetchNewUserData = async () => {
    const data = await fetchRandomUserData();
    dispatch(setCurrentUser(data)); // Actualizar el usuario actual en el estado
    setUserAvatar(data.avatar); // Establecer el avatar del usuario actual en el estado local
  };

  // Manejar el evento de guardar usuario
  const handleSaveUser = () => {
    if (currentUser) {
      dispatch(addUser(currentUser)); // Agregar el usuario actual a la lista de usuarios seleccionados en el estado
    }
    fetchNewUserData(); // Buscar un nuevo usuario después de guardar el actual
  };

  // Manejar el evento de cargar un nuevo usuario
  const handleLoadNewUser = () => {
    fetchNewUserData(); // Buscar un nuevo usuario al hacer clic en el botón "Siguiente Usuario"
  };

  // Si no hay un usuario actual, mostrar un mensaje de búsqueda
  if (!currentUser) {
    return <div>Buscando Usuario...</div>;
  }

  // Si hay un usuario actual, mostrar los detalles del usuario en una tarjeta
  const { first_name, last_name, email } = currentUser;

  console.log(selectedUsers);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 4,
        }}
      >
        <CardContent>
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
            Nombre: {first_name}
          </Typography>
          <Typography variant="h5" component="div" align="center">
            Apellido: {last_name}
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
