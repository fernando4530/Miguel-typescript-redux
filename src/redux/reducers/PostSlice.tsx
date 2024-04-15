// postSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface Message {
  sender: UserData;
  receiver: UserData;
  content?: string;
  timestamp: number;
  messageId: number; // Agregamos un messageId único para cada post
  imageUrl?: string;
  likes: string[]; // Array de IDs de usuarios que dieron "like"
}

interface PostState {
  userPosts: Record<string, Message[]>;
}

const initialState: PostState = {
  userPosts: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Message>) => {
      const { receiver } = action.payload;

      if (!state.userPosts[receiver.id.value]) {
        state.userPosts[receiver.id.value] = [];
      }

      state.userPosts[receiver.id.value].push({
        ...action.payload,
        likes: [],
      });
    },
    toggleLike: (
      state,
      action: PayloadAction<{
        receiverId: string;
        messageId: number;
        userId: string;
      }>
    ) => {
      const { receiverId, messageId, userId } = action.payload;

      const post = state.userPosts[receiverId].find(
        (post) => post.messageId === messageId
      );

      if (post) {
        const likedIndex = post.likes.indexOf(userId);
        if (likedIndex === -1) {
          post.likes.push(userId);
        } else {
          post.likes.splice(likedIndex, 1);
        }
      }
    },
  },
});

export const { addPost, toggleLike } = postSlice.actions;

export default postSlice.reducer;
