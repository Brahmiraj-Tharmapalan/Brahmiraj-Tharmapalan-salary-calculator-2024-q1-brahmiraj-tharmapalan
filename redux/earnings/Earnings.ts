import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  earnings: ""
};

const  earningsSlice = createSlice({
  name: "earnings",
  initialState,
  reducers: {
    getEarnings: (state, action) => {
      state.earnings = action.payload;
     },
  },
});

export const {
  getEarnings
} = earningsSlice.actions;
export default earningsSlice.reducer;
