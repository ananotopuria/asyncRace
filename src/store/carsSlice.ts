import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Car } from '../types'
import * as api from './../api/cars'

interface CarsState {
  cars: Car[]
  status: 'idle' | 'loading' | 'failed'
  page: number
  totalCount: number
}

const initialState: CarsState = {
  cars: [],
  status: 'idle',
  page: 1,
  totalCount: 0,
}

// Thunks
export const fetchCars = createAsyncThunk(
  'cars/fetch',
  async ({ page, limit }: { page: number; limit: number }) => {
    const { data, totalCount } = await api.getCars(page, limit)
    return { cars: data, totalCount }
  }
)

export const createCar = createAsyncThunk(
  'cars/create',
  async (car: Omit<Car, 'id'>) => {
    return await api.createCar(car)
  }
)


const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'idle'
        state.cars = action.payload.cars
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchCars.rejected, (state) => {
        state.status = 'failed'
      })

      .addCase(createCar.fulfilled, (state, action) => {
        state.cars.unshift(action.payload)
        state.totalCount += 1
      })
  },
})

export const { setPage } = carsSlice.actions
export default carsSlice.reducer