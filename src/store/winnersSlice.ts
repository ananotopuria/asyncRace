import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Winner } from '../types'
import * as api from '../api/winners'

type SortField = 'wins' | 'time'
type SortOrder = 'asc' | 'desc'

interface FetchWinnersArgs {
  page: number
  limit: number
  sortField: SortField
  sortOrder: SortOrder
}

export const fetchWinners = createAsyncThunk<
  { winners: Winner[]; totalCount: number }, 
  FetchWinnersArgs                       
>(
  'winners/fetch',
  async ({ page, limit, sortField, sortOrder }: FetchWinnersArgs) => {
    const { data, totalCount } = await api.getWinners(
      page,
      limit,
      sortField,
      sortOrder
    )
    return { winners: data, totalCount }
  }
)

interface WinnersState {
  winners: Winner[]
  status: 'idle' | 'loading' | 'failed'
  page: number
  totalCount: number
  sortField: SortField
  sortOrder: SortOrder
}

const initialState: WinnersState = {
  winners: [],
  status: 'idle',
  page: 1,
  totalCount: 0,
  sortField: 'wins',
  sortOrder: 'desc',
}

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setSort(
      state,
      action: PayloadAction<{ field: SortField; order: SortOrder }>
    ) {
      state.sortField = action.payload.field
      state.sortOrder = action.payload.order
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.status = 'idle'
        state.winners = action.payload.winners
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchWinners.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setPage: setWinnersPage, setSort } = winnersSlice.actions
export default winnersSlice.reducer
