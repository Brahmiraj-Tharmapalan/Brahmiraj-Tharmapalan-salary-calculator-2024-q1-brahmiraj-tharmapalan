import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Earnings {
  id: number;
  value: string;
  epfEtf: boolean;
  amount: number;
}

interface EarningsState {
  earnings: Earnings[];
}

const initialState: EarningsState = {
  earnings: [],
};

const earningsSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {
    getEarnings(state, action: PayloadAction<Earnings[]>) {
      state.earnings = action.payload;
    },
    resetEarnings(state) {
      state.earnings = initialState.earnings;
    },
  },
});

export const { getEarnings, resetEarnings } = earningsSlice.actions;
export default earningsSlice.reducer;
