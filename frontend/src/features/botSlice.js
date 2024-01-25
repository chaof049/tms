import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  message: [],
};

export const botSlice = createSlice({
  name: "bot",
  initialState: initialStateValue,
  reducers: {
    addMessage: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { addMessage } = botSlice.actions;

export default botSlice.reducer;
