import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../types";
import * as api from "../api/cars";

interface CarsState {
  cars: Car[];
  status: "idle" | "loading" | "failed";
  page: number;
  totalCount: number;
  editingCar: Car | null;
}

const initialState: CarsState = {
  cars: [],
  status: "idle",
  page: 1,
  totalCount: 0,
  editingCar: null,
};

export const fetchCars = createAsyncThunk<
  { cars: Car[]; totalCount: number },
  { page: number; limit: number }
>("cars/fetch", async ({ page, limit }) => {
  const { data, totalCount } = await api.getCars(page, limit);
  return { cars: data, totalCount };
});

export const createCar = createAsyncThunk<Car, Omit<Car, "id">>(
  "cars/create",
  async (car) => api.createCar(car)
);

export const updateCar = createAsyncThunk<
  Car,
  { id: number; updates: Partial<Omit<Car, "id">> }
>("cars/update", async ({ id, updates }) => api.updateCar(id, updates));

export const deleteCar = createAsyncThunk<number, number>(
  "cars/delete",
  async (id) => {
    await api.deleteCar(id);
    return id;
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setEditingCar(state, action: PayloadAction<Car | null>) {
      state.editingCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.cars = payload.cars;
        state.totalCount = payload.totalCount;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(createCar.fulfilled, (state, { payload }) => {
        state.cars.unshift(payload);
        state.totalCount += 1;
      })
      .addCase(updateCar.fulfilled, (state, { payload }) => {
        const idx = state.cars.findIndex((c) => c.id === payload.id);
        if (idx >= 0) state.cars[idx] = payload;
      })
      .addCase(deleteCar.fulfilled, (state, { payload }) => {
        state.cars = state.cars.filter((c) => c.id !== payload);
        state.totalCount -= 1;
      });
      
  },
});

export const { setPage, setEditingCar } = carsSlice.actions;
export default carsSlice.reducer;
