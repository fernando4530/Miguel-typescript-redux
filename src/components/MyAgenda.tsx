import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { UserData } from "../models/UserTypes";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const MyAgenda = () => {
  const { selectedUsers } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h2>Usuarios Guardados:</h2>
      <Grid container spacing={2}>
        {selectedUsers.map((user: UserData, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardContent>
                <Avatar
                  alt="Avatar"
                  src={user.avatar}
                  sx={{
                    width: 100,
                    height: 100,
                    margin: "0 auto",
                    marginBottom: 10,
                  }}
                />
                <Typography gutterBottom variant="h5" component="div">
                  Nombre: {user.first_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Username: {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teléfono: {user.phone_number}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyAgenda;
