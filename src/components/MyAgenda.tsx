import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { UserData } from "../redux/models/UserTypes";
import { Grid, Card, CardContent, Avatar, Typography } from "@mui/material";
import { toggleFavorite } from "../redux/reducers/FavoritesSlice"; // Importa la acción para marcar/desmarcar favoritos

import FavoriteIcon from "@mui/icons-material/Favorite";

const MyAgenda: React.FC = () => {
  const selectedUsers = useSelector(
    (state: RootState) => state.user.selectedUsers
  );
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();

  const isUserFavorite = (user: UserData) =>
    favorites.some((favUser) => favUser.id === user.id);

  return (
    <div>
      <h2>Mi Agenda:</h2>
      <Grid container spacing={2}>
        {selectedUsers.map((user: UserData) => (
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3} key={user.id}>
            {" "}
            {/* Cada carta ocupará 3 columnas en pantallas pequeñas y medianas, y 4 columnas en pantallas grandes */}
            <Card sx={{ marginBottom: 20 }}>
              <Avatar
                alt="Avatar"
                src={user.avatar}
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.first_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Username: {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                {/* Mostrar más información del usuario aquí */}

                {/* Agregar más campos según la estructura de UserData */}
              </CardContent>
              <CardContent>
                <div onClick={() => dispatch(toggleFavorite(user))}>
                  <FavoriteIcon
                    style={{ fill: isUserFavorite(user) ? "red" : "grey" }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyAgenda;
