import { useState } from "react";
import { startEngine, stopEngine } from "../../../api/cars";
import { drive } from "../../../api/engine";
import { CarType } from "../../../types";

interface CarCardProps {
  car: CarType;
}

export default function CarCard({ car }: CarCardProps) {
  const [isDriving, setIsDriving] = useState(false);

  const handleStart = async () => {
    setIsDriving(true);
    try {
      const { velocity, distance } = await startEngine(car.id);
      const time = distance / velocity;

      animateCar(car.id, time);

      const driveStatus = await drive(car.id);
      if (driveStatus === 'stopped') {
        stopCarAnimation(car.id);
      }
    } catch (error) {
      console.error('Start error', error);
    }
  };

  const handleStop = async () => {
    setIsDriving(false);
    try {
      await stopEngine(car.id);
      resetCarPosition(car.id);
    } catch (error) {
      console.error('Stop error', error);
    }
  };

  return (
    <div className="border p-2 rounded">
      <div className="flex items-center gap-2">
        <div className="font-bold">{car.name}</div>
        <div className="w-8 h-5" style={{ backgroundColor: car.color }} />
      </div>

      <div className="flex gap-2 mt-2">
        <button className="btn" onClick={handleStart} disabled={isDriving}>
          Start
        </button>
        <button className="btn" onClick={handleStop} disabled={!isDriving}>
          Stop
        </button>
      </div>

      <div id={`track-${car.id}`} className="relative w-full h-10 bg-gray-100 mt-2">
        <div
          id={`car-${car.id}`}
          className="absolute left-0 top-0 w-10 h-6 rounded"
          style={{ backgroundColor: car.color }}
        />
      </div>
    </div>
  );
}

function animateCar(id: number, time: number) {
  const car = document.getElementById(`car-${id}`);
  if (!car) return;
  car.style.transition = `transform ${time}s linear`;
  car.style.transform = `translateX(90%)`;
}

function resetCarPosition(id: number) {
  const car = document.getElementById(`car-${id}`);
  if (!car) return;
  car.style.transition = `transform 0.5s`;
  car.style.transform = `translateX(0)`;
}

function stopCarAnimation(id: number) {
  const car = document.getElementById(`car-${id}`);
  if (!car) return;
  car.style.transition = 'none';
}
