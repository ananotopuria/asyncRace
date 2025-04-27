import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCars, setPage, createCar } from "../../store/carsSlice";
import CarForm from "./CarForm";
import CarCard from "./CarCard";
import Pagination from "../commonComponents/Pagination";
import { randomCar } from "../../utils/randomCar";
import { startEngine, stopEngine } from "../../api/engine";
import { Car } from "../../types";
import RaceControls from "./RaceControls";

export default function GaragePage() {
  const dispatch = useAppDispatch();
  const { cars, page, totalCount, status } = useAppSelector((s) => s.cars);
  const [isRacing, setIsRacing] = useState(false);

  useEffect(() => {
    dispatch(fetchCars({ page, limit: 7 }));
  }, [dispatch, page]);

  const handleGenerate = () => {
    Array.from({ length: 100 }).forEach(() => dispatch(createCar(randomCar())));
  };

  const handleStartRace = async () => {
    setIsRacing(true);
    const results: { car: Car; time: number }[] = [];

    for (const car of cars) {
      try {
        const { velocity, distance } = await startEngine(car.id);
        const time = distance / velocity;

        animateCar(car.id, time);
        results.push({ car, time });
      } catch (error) {
        console.error(`Failed starting car ${car.id}:`, error);
        resetCarPosition(car.id);
      }
    }

    if (results.length > 0) {
      const winner = results.reduce((a, b) => (a.time < b.time ? a : b));
      setTimeout(() => {
        alert(`🏆 Winner: ${winner.car.name} in ${winner.time.toFixed(2)}s!`);
      }, 100);
    }

    setIsRacing(false);
  };

  const handleResetRace = async () => {
    setIsRacing(false);
    await Promise.all(
      cars.map((car) =>
        stopEngine(car.id)
          .catch((e) => console.error(`Stop error for car ${car.id}:`, e))
          .then(() => resetCarPosition(car.id))
      )
    );
  };

  return (
    <main className="p-4  ">
      <h1 className="text-6xl mb-4 text-center font-racing p-[2rem] text-red">
        Garage
      </h1>
      <RaceControls
        isRacing={isRacing}
        onGenerate={handleGenerate}
        onStartRace={handleStartRace}
        onResetRace={handleResetRace}
      />
      <CarForm />

      {status === "loading" ? (
        <p>Loading cars…</p>
      ) : cars.length === 0 ? (
        <p>No Cars</p>
      ) : (
        <div className="flex flex-col gap-[2rem]">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <Pagination
          currentPage={page}
          totalItems={totalCount}
          pageSize={7}
          onPageChange={(p) => dispatch(setPage(p))}
        />
      </div>
    </main>
  );
}

function animateCar(id: number, time: number) {
  const el = document.getElementById(`car-${id}`);
  if (!el) return;

  el.style.transition = "";
  el.style.transform = "translateX(0)";
  void el.offsetWidth;

  const trackWidth = el.parentElement?.getBoundingClientRect().width ?? 0;
  el.style.transition = `transform ${time}s linear`;
  el.style.transform = `translateX(${trackWidth}px)`;
}

function resetCarPosition(id: number) {
  const el = document.getElementById(`car-${id}`);
  if (!el) return;
  el.style.transition = "";
  el.style.transform = "translateX(0)";
}
