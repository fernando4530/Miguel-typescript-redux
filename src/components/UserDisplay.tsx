import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Avatar, Box, Typography } from "@mui/material";

interface UserDisplayProps {}

const UserDisplay: React.FC<UserDisplayProps> = () => {
  const selectedUser = useSelector(
    (state: RootState) => state.UserLoggin.UserLoggIn
  );
  const selectedUserPhoto = useSelector(
    (state: RootState) => state.UserLoggin.UserLoggIn?.picture.large
  );

  if (!selectedUser || !selectedUserPhoto) {
    return null;
  }

  const { name, email } = selectedUser;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingX: 2,
        backgroundColor: "rgba(138, 43, 226, 0.8)",
      }}
    >
      <Typography variant="h5">Usuario:</Typography>

      <Avatar
        src={selectedUserPhoto}
        alt={`${name.first} ${name.last}`}
        sx={{
          width: 32,
          height: 32,
          marginRight: 2,
          border: "2px solid blue",
        }}
      />
      <div>
        <Typography variant="body2" color="white">
          {`${name.first} ${name.last}`}
        </Typography>
        <Typography variant="body2" color="white">
          {email}
        </Typography>
      </div>
    </Box>
  );
};

export default UserDisplay;
