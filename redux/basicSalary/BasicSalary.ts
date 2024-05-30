import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basicSalary: ""
};

const  basicSalarySlice = createSlice({
  name: "basicSalary",
  initialState,
  reducers: {
    getBasicSalary: (state, action) => {
      state.basicSalary = action.payload;
     },
  },
});

export const {
  getBasicSalary
} = basicSalarySlice.actions;
export default basicSalarySlice.reducer;
