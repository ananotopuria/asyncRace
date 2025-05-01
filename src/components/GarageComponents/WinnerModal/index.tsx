import { FC } from "react";
import { GiTrophyCup } from "react-icons/gi";
import { SPEED_FACTOR } from "../../../utils/animationUtils";
import { Car } from "../../../types";

interface WinnerModalProps {
  isOpen: boolean;
  winner: (Car & { time: number }) | null;
  onClose: () => void;
}

const WinnerModal: FC<WinnerModalProps> = ({ isOpen, winner, onClose }) => {
  if (!isOpen || !winner) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-2xl text-center w-80">
        <GiTrophyCup className="text-6xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">We have a winner!</h2>
        <p className="mb-4">
          {winner.name} crossed the finish in{" "}
          <strong>{(winner.time / SPEED_FACTOR).toFixed(2)}s</strong>.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
