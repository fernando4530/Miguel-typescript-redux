// PostSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface Message {
  user: UserData;
  message: string;
  timestamp: number;
  image?: string;
  likes: number;
  likedBy: string[]; // Agregar esta propiedad para rastrear los usuarios que dieron like
}

interface PostState {
  messages: Message[];
}

const initialState: PostState = {
  messages: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push({ ...action.payload, likes: 0, likedBy: [] });
    },
    addLike: (state, action: PayloadAction<{ index: number; username: string }>) => {
      const { index, username } = action.payload;
      if (!state.messages[index].likedBy.includes(username)) {
        state.messages[index].likes++;
        state.messages[index].likedBy.push(username);
      }
    },
    removeLike: (state, action: PayloadAction<{ index: number; username: string }>) => {
      const { index, username } = action.payload;
      const likedIndex = state.messages[index].likedBy.indexOf(username);
      if (likedIndex !== -1) {
        state.messages[index].likes--;
        state.messages[index].likedBy.splice(likedIndex, 1);
      }
    },
  },
});

export const { addMessage, addLike, removeLike } = postSlice.actions;
export default postSlice.reducer;