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
import {
  animateCar,
  resetCarPosition,
  SPEED_FACTOR,
} from "../../utils/animationUtils";
import { getWinner, createWinner, updateWinner } from "../../api/winners";
import { motion } from "framer-motion";

export default function GaragePage() {
  const dispatch = useAppDispatch();
  const {
    cars,
    page,
    totalCount,
    status,
    error: fetchError,
  } = useAppSelector((s) => s.cars);

  const [isRacing, setIsRacing] = useState(false);
  const [winner, setWinner] = useState<(Car & { time: number }) | null>(null);
  const [createError, setCreateError] = useState("");
  const [raceError, setRaceError] = useState("");

  const PAGE_SIZE = 7;

  useEffect(() => {
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    if (page > totalPages && totalPages > 0) {
      dispatch(setPage(totalPages));
    }
  }, [page, totalCount, dispatch]);

  useEffect(() => {
    dispatch(fetchCars({ page, limit: PAGE_SIZE }));
  }, [dispatch, page]);

  const handleGenerate = async () => {
    for (let i = 0; i < 100; i++) {
      try {
        await dispatch(createCar(randomCar())).unwrap();
      } catch (err) {
        console.error("Car creation failed:", err);
        setCreateError("Some cars could not be generated. Please try again.");
      }
    }
    dispatch(setPage(1));
    dispatch(fetchCars({ page: 1, limit: PAGE_SIZE }));
  };

  const handleStartRace = async () => {
    setIsRacing(true);
    setWinner(null);
    setRaceError("");

    try {
      const allCars = cars;

      const racePromises = allCars.map((car) =>
        startEngine(car.id)
          .then(({ velocity, distance }) => {
            const time = distance / velocity;
            animateCar(car.id, time);
            return new Promise<{ car: Car; time: number }>((resolve) => {
              setTimeout(() => resolve({ car, time }), (time / SPEED_FACTOR) * 1000);
            });
          })
          .catch(() => {
            resetCarPosition(car.id);
            return { car, time: Infinity };
          })
      );

      const win = await Promise.race(racePromises);
      try {
        const existing = await getWinner(win.car.id);
        if (existing) {
          await updateWinner(existing.id, {
            wins: existing.wins + 1,
            time: Math.min(existing.time, win.time),
          });
        } else {
          await createWinner({
            id: win.car.id,
            name: win.car.name,
            color: win.car.color,
            wins: 1,
            time: win.time,
          });
        }
      } catch (e) {
        console.error("Could not save winner:", e);
      }

      setWinner({ ...win.car, time: win.time });
      setIsRacing(false);
      allCars.forEach((car) => {
        if (car.id !== win.car.id) {
          stopEngine(car.id).catch(() => {});
          resetCarPosition(car.id);
        }
      });
    } catch (err) {
      console.error("Race failed:", err);
      setRaceError("⚠️ Unable to connect to the server. Please make sure the backend is running.");
      setIsRacing(false);
    }
  };

  const handleResetRace = async () => {
    setIsRacing(false);
    await Promise.all(
      cars.map((car) =>
        stopEngine(car.id)
          .catch(() => {})
          .then(() => resetCarPosition(car.id))
      )
    );
    setWinner(null);
  };

  return (
    <>
      <main className="p-4">
        <div className="px-6 py-4 border-b">
          <motion.h1
            className="text-6xl mb-4 text-center font-racing p-[2rem] text-red"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Garage
          </motion.h1>
        </div>

        <RaceControls
          isRacing={isRacing}
          onGenerate={handleGenerate}
          onStartRace={handleStartRace}
          onResetRace={handleResetRace}
        />

        {createError && <p className="text-red-500 text-center mt-2">{createError}</p>}
        {fetchError && <p className="text-red-600 text-center mt-2 font-medium">{fetchError}</p>}
        {raceError && <p className="text-red-600 text-center mt-2 font-medium">{raceError}</p>}

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

        {totalCount > 0 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={page}
              totalItems={totalCount}
              pageSize={PAGE_SIZE}
              onPageChange={(p) => dispatch(setPage(p))}
            />
          </div>
        )}
      </main>

      <WinnerModal
        isOpen={!!winner}
        winner={winner}
        onClose={() => setWinner(null)}
      />
    </>
  );
}
