import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasicSalaryState {
  basicSalary: number;
}

const initialState: BasicSalaryState = {
  basicSalary: 0,
};

const basicSalarySlice = createSlice({
  name: 'basicSalary',
  initialState,
  reducers: {
    getBasicSalary(state, action: PayloadAction<number>) {
      state.basicSalary = action.payload;
    },
    resetBasicSalary(state) {
      state.basicSalary = initialState.basicSalary;
    },
  },
});

export const { getBasicSalary, resetBasicSalary } = basicSalarySlice.actions;
export default basicSalarySlice.reducer;
