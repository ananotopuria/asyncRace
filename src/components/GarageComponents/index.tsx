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
import WinnerModal from "./WinnerModal";
import { animateCar, resetCarPosition, SPEED_FACTOR } from "../../utils/animationUtils";

export default function GaragePage() {
  const dispatch = useAppDispatch();
  const { cars, page, totalCount, status } = useAppSelector((s) => s.cars);
  const [isRacing, setIsRacing] = useState(false);
  const [winner, setWinner] = useState<(Car & { time: number }) | null>(null);

  useEffect(() => {
    dispatch(fetchCars({ page, limit: 7 }));
  }, [dispatch, page]);

  const handleGenerate = () => Array.from({ length: 100 }).forEach(() => dispatch(createCar(randomCar())));

  const handleStartRace = async () => {
    setIsRacing(true);
    setWinner(null);

    const results = await Promise.all(
      cars.map((car) =>
        startEngine(car.id)
          .then(({ velocity, distance }) => ({ car, time: distance / velocity }))
          .catch((error) => {
            console.error(`Engine error for car ${car.id}:`, error);
            resetCarPosition(car.id);
            return { car, time: Infinity };
          })
      )
    );
    results.forEach(({ car, time }) => animateCar(car.id, time));
    const win = results.reduce((a, b) => (a.time < b.time ? a : b));

    setTimeout(() => {
      setWinner({ ...win.car, time: win.time });
      setIsRacing(false);
    }, (win.time / SPEED_FACTOR) * 1000 + 100);
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
    setWinner(null);
  };

  return (
    <>
      <main className="p-4">
        <h1 className="text-6xl mb-4 text-center font-racing p-[2rem] text-red">Garage</h1>
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
              <CarCard key={car.id} car={car} isRacing={isRacing} />
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
      <WinnerModal isOpen={!!winner} winner={winner} onClose={() => setWinner(null)} />
    </>
  );
}
