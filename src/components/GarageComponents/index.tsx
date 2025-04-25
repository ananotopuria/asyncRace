import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCars, setPage, createCar } from "../../store/carsSlice";
import CarForm from "./CarForm";
import CarCard from "./CarCard";
import Pagination from "../commonCompopnents/Pagination";
import { randomCar } from "../../utils/randomCar";
import { startEngine, stopEngine, drive } from "../../api/engine";
import { Car } from "../../types";

export default function GaragePage() {
  const dispatch = useAppDispatch();
  const { cars, page, totalCount, status } = useAppSelector((s) => s.cars);
  const [isRacing, setIsRacing] = useState(false);

  useEffect(() => {
    dispatch(fetchCars({ page, limit: 7 })).then((action) => {
      const payload = action.payload as { data: Car[]; totalCount: number };
      if (payload && payload.totalCount < 7) {
        Array.from({ length: 100 }).forEach(() => {
          dispatch(createCar(randomCar()));
        });
      }
    });
  }, [dispatch, page]);

  const handleGenerate = () => {
    Array.from({ length: 100 }).forEach(() => {
      dispatch(createCar(randomCar()));
    });
  };

  const handleStartRace = async () => {
    setIsRacing(true);

    const promises = cars.map(async (car) => {
      try {
        const { velocity, distance } = await startEngine(car.id);
        const time = distance / velocity;

        animateCar(car.id, time);

        const driveResult = await drive(car.id);
        if (driveResult === "success") {
          return { car, time };
        } else {
          return null;
        }
      } catch {
        return null;
      }
    });

    const results = await Promise.all(promises);

    const validResults = results.filter(Boolean) as { car: typeof cars[0]; time: number }[];

    if (validResults.length > 0) {
      const winner = validResults.reduce((prev, current) =>
        prev.time < current.time ? prev : current
      );
      setTimeout(() => {
        alert(`🏆 Winner: ${winner.car.name} with time ${winner.time.toFixed(2)}s!`);
      }, 100); 
    }

    setIsRacing(false);
  };

  const handleResetRace = async () => {
    setIsRacing(false);

    await Promise.all(
      cars.map(async (car) => {
        try {
          await stopEngine(car.id);
          resetCarPosition(car.id);
        } catch (e) {
          console.error(e);
        }
      })
    );
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Garage</h1>

      <button className="btn" onClick={handleGenerate} disabled={isRacing}>
        Generate 100
      </button>

      <CarForm />

      <div className="my-4 space-x-2">
        <button className="btn" onClick={handleStartRace} disabled={isRacing}>
          Start Race
        </button>
        <button className="btn" onClick={handleResetRace}>
          Reset Race
        </button>
      </div>

      {status === "loading" ? (
        <p>Loading cars…</p>
      ) : cars.length === 0 ? (
        <p>No Cars</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalItems={totalCount}
        pageSize={7}
        onPageChange={(p) => dispatch(setPage(p))}
      />
    </main>
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
  car.style.transition = 'transform 0.5s';
  car.style.transform = 'translateX(0)';
}
