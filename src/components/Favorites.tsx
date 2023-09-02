import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { UserData } from "../redux/models/UserTypes";
import { Grid, Card, CardContent, Avatar, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Importa el icono FavoriteIcon
import { toggleFavorite } from "../redux/reducers/FavoritesSlice"; // Importa la acción para marcar/desmarcar favoritos
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Favorites: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();

  const handleToggleFavorite = (user: UserData) => {
    dispatch(toggleFavorite(user));
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          marginTop: "-55px",
          fontSize: "30px",
          color: "white",
          backgroundColor: "blueviolet",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        Favoritos
      </Button>
      <Grid container spacing={2}>
        {favorites.map((user: UserData) => (
          <Grid item xs={12} sm={6} md={3} key={user.id.value}>
            <Card
              sx={{
                marginBottom: -2,
                marginTop: 4,
                boxShadow: 8,
                backgroundColor: "#b0c4de",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {user.name.first}
              </Typography>
              <Avatar
                alt="Avatar"
                src={user.picture.large}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  border: 1,
                  color: "blue",
                  backgroundColor: "blueviolet",
                  marginTop: 1,
                }}
              />
              <CardContent
                sx={{
                  borderTop: 1,
                  marginTop: 1,
                  borderColor: "#849db9",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Username: {user.login.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  marginTop: 1,
                  boxShadow: 8,
                  backgroundColor: "white",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                <div style={{ height: "auto", width: "auto" }}>
                  <FavoriteIcon
                    style={{ fill: "red" }}
                    onClick={() => handleToggleFavorite(user)}
                  />
                  <Typography>Eliminar de favoritos</Typography>
                </div>
                <Link
                  to={`/post/${user.id.value}`}
                  style={{
                    width: "auto",
                    height: "auto",
                    textDecoration: "none",
                  }}
                >
                  <Button
                    sx={{ boxShadow: 4 }}
                    variant="outlined"
                    color="primary"
                  >
                    Ir a Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
