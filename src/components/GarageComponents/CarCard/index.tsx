import { Car } from "../../../types";
import { useAppDispatch } from "../../../store/hooks";
import {
  deleteCar,
  setEditingCar,
} from "../../../store/carsSlice";

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded shadow flex flex-col items-center">
      <div
        className="w-12 h-12 mb-2 rounded"
        style={{ backgroundColor: car.color }}
      />
      <h3 className="mb-2">{car.name}</h3>
      <div className="space-x-1">
        {/* <button onClick={() => dispatch(startEngine(car.id))} className="btn">
          ▶️
        </button>
        <button onClick={() => dispatch(stopEngine(car.id))} className="btn">
          ⏹️
        </button> */}
        <button onClick={() => dispatch(setEditingCar(car))} className="btn">
          ✏️
        </button>
        <button
          onClick={() => dispatch(deleteCar(car.id))}
          className="btn text-red-600"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
