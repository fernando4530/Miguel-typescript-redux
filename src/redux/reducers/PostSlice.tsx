import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/UserTypes";

interface Message {
  user: UserData;
  message: string;
  timestamp: number;
  image?: string;
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
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = postSlice.actions;
export default postSlice.reducer;
