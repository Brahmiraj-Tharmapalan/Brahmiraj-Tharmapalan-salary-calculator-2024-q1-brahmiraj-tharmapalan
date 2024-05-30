import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deductions: []
};

const  deductionsSlice = createSlice({
  name: "deductions",
  initialState,
  reducers: {
    getDeductions: (state, action) => {
      state.deductions = action.payload;
     },
  },
});

export const {
  getDeductions
} = deductionsSlice.actions;
export default deductionsSlice.reducer;
