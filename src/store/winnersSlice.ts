import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WinnerRecord, getWinners } from '../api/winners';

interface WinnersState {
  winners: WinnerRecord[];
  page: number;
  totalCount: number;
  status: 'idle' | 'loading' | 'failed';
  sortField: 'wins' | 'time';
  sortOrder: 'asc' | 'desc';
}

const initialState: WinnersState = {
  winners: [],
  page: 1,
  totalCount: 0,
  status: 'idle',
  sortField: 'wins',
  sortOrder: 'desc',
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async ({ page, sortField, sortOrder }: { page: number; sortField: 'wins' | 'time'; sortOrder: 'asc' | 'desc' }) => {
    return await getWinners(page, 10, sortField, sortOrder);
  }
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSort(state, action: PayloadAction<{ field: 'wins' | 'time'; order: 'asc' | 'desc' }>) {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.status = 'idle';
        state.winners = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWinners.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setPage, setSort } = winnersSlice.actions;
export default winnersSlice.reducer;