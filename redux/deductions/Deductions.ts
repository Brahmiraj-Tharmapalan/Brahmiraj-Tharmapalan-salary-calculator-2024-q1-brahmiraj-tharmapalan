import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Deductions {
  id: number;
  value: string;
  amount: number;
}

interface DeductionsState {
  deductions: Deductions[];
}

const initialState: DeductionsState = {
  deductions: [],
};

const deductionsSlice = createSlice({
  name: 'deductions',
  initialState,
  reducers: {
    getDeductions(state, action: PayloadAction<Deductions[]>) {
      state.deductions = action.payload;
    },
    resetDeductions(state) {
      state.deductions = initialState.deductions;
    },
  },
});

export const { getDeductions, resetDeductions } = deductionsSlice.actions;
export default deductionsSlice.reducer;
