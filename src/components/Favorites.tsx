import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { UserData } from "../redux/models/UserTypes";
import { Grid, Card, CardContent, Avatar, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Importa el icono FavoriteIcon
import { toggleFavorite } from "../redux/reducers/FavoritesSlice"; // Importa la acción para marcar/desmarcar favoritos

const Favorites: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();

  const handleToggleFavorite = (user: UserData) => {
    dispatch(toggleFavorite(user)); // Dispara la acción para marcar/desmarcar favoritos
  };

  return (
    <div>
      <h2>Favoritos:</h2>
      <Grid container spacing={2}>
        {favorites.map((user: UserData) => (
          <Grid item xs={12} sm={6} md={3} key={user.id}>
            {" "}
            {/* Cada card ocupará 3 columnas en pantallas medianas */}
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
              </CardContent>
              <CardContent>
                <div onClick={() => handleToggleFavorite(user)}>
                  <FavoriteIcon style={{ fill: "red" }} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
