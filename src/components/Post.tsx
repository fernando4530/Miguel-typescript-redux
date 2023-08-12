import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { addMessage } from "../redux/reducers/PostSlice";

function Post() {
  const selectedUser = useSelector(
    (state: RootState) => state.selectedUser.UserLoggIn
  );
  const messages = useSelector((state: RootState) => state.post.messages);
  const dispatch = useDispatch();

  const [inputMessage, setInputMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleMessageChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputMessage(event.target.value);
  };

  const handleImageUrlChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setImageUrl(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        user: selectedUser!,
        message: inputMessage,
        timestamp: Date.now(),
        image: imageUrl && (imageUrl.startsWith("http") ? imageUrl : undefined),
      };
      dispatch(addMessage(newMessage));
      console.log("Comentario enviado:", inputMessage);
      setInputMessage("");
      setImageUrl("");
    }
  };

  const isButtonDisabled = !selectedUser;

  return (
    <div
      style={{
        backgroundColor: "#b0c4de",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        sx={{
          marginTop: -7,
          fontFamily: '"Segoe UI Symbol"',
          fontSize: "30px",
          color: "white",
          backgroundColor: "blueviolet",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 10,
          width: "100%",
          padding: "10px 0",
        }}
      >
        Publicaciones
      </Button>

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, padding: "20px" }}>
          <Card
            elevation={3}
            sx={{ backgroundColor: "rgba(138, 43, 226, 0.8)", color: "white" }}
          >
            <CardContent>
              {selectedUser && (
                <div>
                  <Typography variant="h5" component="div" align="center">
                    Bienvenid@ {selectedUser.name.first}
                  </Typography>
                  <Avatar
                    src={selectedUser.picture.large}
                    alt="Avatar"
                    sx={{
                      width: 200,
                      height: 200,
                      margin: "0 auto",
                      marginBottom: 3,
                      border: "4px solid blue",
                    }}
                  />
                  <Typography variant="h5" component="div" align="center">
                    Nombre de Usuario
                  </Typography>
                  <Typography variant="h5" component="div" align="center">
                    {selectedUser.login.username}
                  </Typography>
                </div>
              )}
              <TextField
                autoComplete="off"
                placeholder="Escribe tu mensaje aquí..."
                minRows={3}
                value={inputMessage}
                onChange={handleMessageChange}
                variant="outlined"
                fullWidth
                sx={{
                  width: "98%",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              />
              <TextField
                placeholder="ingresa tu imagen (URL)"
                value={imageUrl}
                onChange={handleImageUrlChange}
                variant="outlined"
                fullWidth
                autoComplete="off"
                sx={{
                  width: "98%",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              />

              <Button
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white" }}
                variant="contained"
                color="primary"
                onClick={handleCommentSubmit}
                disabled={isButtonDisabled}
              >
                Enviar Post
              </Button>
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            marginTop: 20,
            flex: 1,
            backgroundColor: "#b0c4de",
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "flex-end",
            alignItems: "stretch",
          }}
        >
          <Box
            p={2}
            bgcolor="white"
            borderRadius={4}
            sx={{
              backgroundColor: "rgba(138, 43, 226, 0.8)",
              color: "white",
              width: "100%",
              maxWidth: "550px",
              marginBottom: "10px",
              margintop: "0 auto",
              overflowY: "auto",
              height: "520px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Posts Recientes:
            </Typography>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "rgba(138, 43, 226, 0.9)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    msg.user === selectedUser ? "flex-end" : "flex-start",
                  marginBottom: 4,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={msg.user.picture.thumbnail}
                    alt="Avatar"
                    sx={{ marginRight: "10px", marginTop: 1 }}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "anywhere",
                      marginTop: 4,
                    }}
                  >
                    {msg.user.login.username}: {msg.message}
                  </Typography>
                </div>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Mensaje con imagen"
                    style={{ maxWidth: "100%", marginTop: "4px" }}
                  />
                )}
                <Typography
                  variant="caption"
                  color="textSecondary"
                  style={{ marginTop: "4px" }}
                >
                  Enviado: {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </div>
            ))}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Post;
