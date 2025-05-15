import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createCar, updateCar, setEditingCar } from "../../../store/carsSlice";

export default function CarForm() {
  const dispatch = useAppDispatch();
  const editingCar = useAppSelector((state) => state.cars.editingCar);

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (editingCar) {
      setName(editingCar.name);
      setColor(editingCar.color);
      setErrorMessage("");
    }
  }, [editingCar]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("Car name is required.");
      return;
    }

    if (editingCar) {
      dispatch(updateCar({ id: editingCar.id, updates: { name, color } }));
      dispatch(setEditingCar(null));
    } else {
      dispatch(createCar({ name, color }));
    }

    setName("");
    setColor("#000000");
    setErrorMessage("");
  };

  const handleCancel = () => {
    dispatch(setEditingCar(null));
    setName("");
    setColor("#000000");
    setErrorMessage("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-yellow p-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
    >
      <motion.div
        className="flex flex-col"
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <label
          htmlFor="car-name"
          className="mb-1 text-sm font-medium text-gray-700 font-racing"
        >
          Car Name
        </label>
        <motion.input
          id="car-name"
          type="text"
          placeholder="Enter car name 🏎️💨🍃"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 20) {
              setErrorMessage("Name cannot exceed 20 characters.");
              return;
            }
            setName(value);
            if (errorMessage) setErrorMessage("");
          }}
          whileFocus={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="border border-gray-300 text-lighterGrey font-racing rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-sm mt-1 min-h-[1.25rem] text-red-500 font-medium font-bruno text-red">
          {errorMessage || "\u00A0"}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col ml-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
      >
        <label
          htmlFor="car-color"
          className="mb-1 text-sm font-medium text-gray-700 font-racing"
        >
          Color
        </label>
        <motion.input
          id="car-color"
          type="color"
          value={color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setColor(e.target.value)
          }
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="w-[20rem] h-[4rem] p-0 border focus:outline-none"
        />
      </motion.div>

      <motion.div
        className="flex gap-4 md:col-span-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 font-racing rounded-lg font-semibold text-black focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all
            ${
              editingCar
                ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500"
                : "bg-green-500 hover:bg-green-600 focus:ring-green-500"
            }`}
        >
          {editingCar ? "Update" : "Create"}
        </motion.button>

        {editingCar && (
          <motion.button
            type="button"
            onClick={handleCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 font-racing text-red rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
          >
            Cancel
          </motion.button>
        )}
      </motion.div>
    </motion.form>
  );
}
