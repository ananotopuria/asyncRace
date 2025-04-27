import { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { startEngine, stopEngine, drive } from "../../../api/engine";
import { setEditingCar, deleteCar } from "../../../store/carsSlice";
import { CarType } from "../../../types";
import { TbHttpDelete } from "react-icons/tb";
import { SiEditorconfig } from "react-icons/si";
import { GiRaceCar } from "react-icons/gi";

interface CarCardProps {
  car: CarType;
}

export default function CarCard({ car }: CarCardProps) {
  const dispatch = useAppDispatch();
  const [isDriving, setIsDriving] = useState(false);

  const handleEdit = () => {
    dispatch(setEditingCar(car));
  };

  const handleDelete = () => {
    dispatch(deleteCar(car.id));
  };

  const handleStart = async () => {
    setIsDriving(true);
    try {
      const { velocity, distance } = await startEngine(car.id);
      const time = distance / velocity;
      animateCar(car.id, time);
      const result = await drive(car.id);
      if (result === "stopped") {
        stopCarAnimation(car.id);
        alert(`${car.name} broke down!`);
      }
    } catch (error) {
      console.error("Error during start/drive for car", car.id, error);
      resetCarPosition(car.id);
    }
  };

  const handleStop = async () => {
    setIsDriving(false);
    try {
      await stopEngine(car.id);
    } catch (error) {
      console.error("Stop error for car", car.id, error);
    }
    resetCarPosition(car.id);
  };

  return (
    <div className="border p-2 rounded relative">
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          className="text-4xl px-2 py-1 bg-blue-500 text-black rounded"
          onClick={handleEdit}
          disabled={isDriving}
        >
          <SiEditorconfig />
        </button>
        <button
          className="text-4xl px-2 py-1 bg-red-500 text-black rounded"
          onClick={handleDelete}
          disabled={isDriving}
        >
          <TbHttpDelete />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="font-bold font-bruno">{car.name}</div>
        <div
          className="w-8 h-5 rounded"
          style={{ backgroundColor: car.color }}
        />
      </div>

      <div className="flex gap-6 mt-2 text-[1.4rem] font-racing justify-center">
        <button className="btn" onClick={handleStart} disabled={isDriving}>
          Start
        </button>
        <button className="btn" onClick={handleStop} disabled={!isDriving}>
          Stop
        </button>
      </div>

      <div
        id={`track-${car.id}`}
        className="relative w-full h-24 bg-gray-300 rounded-2xl overflow-hidden border-2 border-yellow-500"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 border-t-2 border-yellow border-dashed" />
        </div>
        <GiRaceCar
          id={`car-${car.id}`}
          className="absolute bottom-2 left-0 w-24 h-24 text-current transition-transform"
          style={{ color: car.color, transitionTimingFunction: 'ease-in-out' }}
        />
      </div>
    </div>
  );
}

function animateCar(id: number, time: number) {
  const carEl = document.getElementById(`car-${id}`);
  const trackEl = document.getElementById(`track-${id}`);
  if (!carEl || !trackEl) return;

  carEl.style.transition = "";
  carEl.style.transform = "translateX(0)";
  void carEl.offsetWidth;

  const trackWidth = trackEl.getBoundingClientRect().width;
  const carWidth = carEl.getBoundingClientRect().width;
  const distance = trackWidth - carWidth;

  carEl.style.transition = `transform ${time}s linear`;
  carEl.style.transform = `translateX(${distance}px)`;
}

function stopCarAnimation(id: number) {
  const carEl = document.getElementById(`car-${id}`);
  if (!carEl) return;
  carEl.style.transition = "none";
}

function resetCarPosition(id: number) {
  const carEl = document.getElementById(`car-${id}`);
  if (!carEl) return;
  carEl.style.transition = "";
  carEl.style.transform = "translateX(0)";
}
