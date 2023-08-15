import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { UserData } from "../redux/models/UserTypes";
import { Grid, Card, CardContent, Avatar, Typography, IconButton } from "@mui/material";
import { toggleFavorite } from "../redux/reducers/FavoritesSlice";
import { Button } from "@mui/material";
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

  const handleToggleFavorite = (user: UserData) => {
    dispatch(toggleFavorite(user));
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          marginTop: "-60px",
          fontSize: "30px",
          color: "white",
          backgroundColor: "blueviolet",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        Mi Agenda
      </Button>

      <Grid container spacing={2}>
        {selectedUsers.map((user: UserData) => (
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3} key={user.id.value}>
            <Card
              sx={{
                marginBottom: -2,
                marginTop: 4,
                boxShadow: 8,
                backgroundColor: "#b0c4de",
              }}
            >
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
                  marginTop: 1,
                  boxShadow: 8,
                  backgroundColor: "white",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {user.name.first}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Apellido: {user.name.last}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
              </CardContent>
              <CardContent>
                <div>
                  <IconButton
                    color="info"
                    onClick={() => handleToggleFavorite(user)}
                  >
                    <FavoriteIcon
                      className="icon-click"
                      sx={{
                        marginLeft: 1.5,
                        fill: isUserFavorite(user) ? "red" : "grey"
                      }}
                    />
                  </IconButton>
                  <Typography sx={{ marginBottom: -2 }}>
                    {isUserFavorite(user) ? "Favorito" : "No favorito"}
                  </Typography>
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
