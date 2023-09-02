import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { addPost, toggleLike } from "../redux/reducers/PostSlice";
import { ThumbUp as ThumbUpIcon } from "@mui/icons-material";

function Post() {
  const { userId } = useParams();
  const selectedUser = useSelector((state: RootState) =>
    state.user.selectedAgendaUsers.find((user) => user.id.value === userId)
  );
  const loggedInUser = useSelector(
    (state: RootState) => state.loggInUser.UserLoggIn
  );

  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showError, setShowError] = useState(false);

  const handleCloseError = () => {
    setShowError(false);
  };

  const userPosts = useSelector((state: RootState) =>
    selectedUser ? state.post.userPosts[selectedUser.id.value] || [] : []
  );

  useEffect(() => {
    if (!selectedUser) {
      setShowError(true);
    }
  }, [selectedUser]);

  const handlePostSubmit = () => {
    if (
      selectedUser &&
      loggedInUser &&
      (content.trim() !== "" || imageUrl.trim() !== "")
    ) {
      // Generamos un messageId único para este post
      const messageId = Date.now();

      dispatch(
        addPost({
          sender: loggedInUser,
          receiver: selectedUser,
          content: content,
          imageUrl: imageUrl,
          timestamp: Date.now(),
          messageId, // Agregamos el messageId al post
          likes: [], // Inicialmente, no hay "likes"
        })
      );

      setContent("");
      setImageUrl("");
    }
  };

  const handleToggleLike = (receiverId: string, messageId: number) => {
    const userId = loggedInUser.id.value; // Usamos el ID del usuario logueado
    dispatch(toggleLike({ receiverId, messageId, userId }));
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
        Posts de {selectedUser?.name.first}
      </Button>
      <div style={{ display: "flex", flex: 1 }}>
        {selectedUser ? (
          <>
            <Card
              elevation={3}
              sx={{
                backgroundColor: "#6200ea",
                color: "white",
                width: "50%",
                minWidth: "300px",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <CardContent>
                {selectedUser && (
                  <div>
                    <Typography variant="h5" component="div" align="center">
                      {selectedUser?.name.first} {selectedUser?.name.last}
                    </Typography>
                    <Avatar
                      alt="Avatar"
                      src={selectedUser.picture.large}
                      sx={{
                        width: 200,
                        height: 200,
                        margin: "0 auto",
                        border: 2,
                        color: "blue",
                        backgroundColor: "blueviolet",
                        marginTop: 1,
                      }}
                    />
                    Email: {selectedUser.email}
                    <Typography
                      variant="h6"
                      component="div"
                      align="center"
                      sx={{ marginTop: 3 }}
                    >
                      Crea un Post para: {selectedUser.name.first}
                    </Typography>
                    <TextField
                      placeholder="Escribe tu post aquí..."
                      autoComplete="off"
                      variant="outlined"
                      fullWidth
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      sx={{
                        marginBottom: 2,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      }}
                    />
                    <TextField
                      placeholder="Ingresa tu imagen (URL)"
                      autoComplete="off"
                      variant="outlined"
                      fullWidth
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      sx={{
                        marginBottom: 2,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handlePostSubmit}
                      sx={{ backgroundColor: "blue", color: "white" }}
                    >
                      Enviar Post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card
              elevation={3}
              sx={{
                width: "50%",
                minWidth: "300px",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <CardContent
                sx={{
                  maxHeight: "450px",
                  overflowY: "auto",
                }}
              >
                {userPosts.map((message, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: "#6200ea",
                      borderRadius: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <Avatar
                          alt="Avatar"
                          src={message.sender.picture.large}
                          sx={{
                            width: 50,
                            height: 50,
                            border: 2,
                            color: "blue",
                            backgroundColor: "blueviolet",
                            marginBottom: 2,
                          }}
                        />
                        <Typography sx={{ marginBottom: 4 }}>
                          {message.sender.name.first} Te a enviado un Post
                        </Typography>
                      </div>
                      <Typography
                        variant="body1"
                        component="div"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          textAlign: "center",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {message.content}
                      </Typography>
                      {message.imageUrl && (
                        <img
                          src={message.imageUrl}
                          alt="Imagen Adjunta"
                          style={{ maxWidth: "100%", marginTop: 8 }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        component="div"
                        sx={{ marginTop: 1, color: "white" }}
                      >
                        Enviado a las{" "}
                        {new Date(message.timestamp).toLocaleString()}
                        <div>
                          <Tooltip title="Like" placement="top" arrow>
                            <IconButton
                              onClick={() =>
                                handleToggleLike(
                                  selectedUser.id.value,
                                  message.messageId
                                )
                              }
                              sx={{ color: "primary" }}
                            >
                              {message.likes.includes(loggedInUser.id.value) ? (
                                <ThumbUpIcon color="primary" />
                              ) : (
                                <ThumbUpIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                          {message.likes.length > 0 && (
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{ color: "white" }}
                            >
                              {message.likes.length === 0 ? (
                                "0 likes"
                              ) : (
                                <>
                                  {message.likes.length}{" "}
                                  {message.likes.length === 1
                                    ? "Like"
                                    : "Likes"}
                                </>
                              )}
                            </Typography>
                          )}
                        </div>
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </>
        ) : null}

        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <SnackbarContent
            message="Usuario no registrado para utilizar esta sección"
            sx={{ height: 100, width: 100, backgroundColor: "#f44336" }}
          />
        </Snackbar>
      </div>
    </div>
  );
}

export default Post;
