import { FC } from "react";
import { GiTrophyCup } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { SPEED_FACTOR } from "../../../utils/animationUtils";
import { Car } from "../../../types";

interface WinnerModalProps {
  isOpen: boolean;
  winner: (Car & { time: number }) | null;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.9 },
  exit:   { opacity: 0 },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.8 },
};

const WinnerModal: FC<WinnerModalProps> = ({ isOpen, winner, onClose }) => (
  <AnimatePresence>
    {isOpen && winner && (
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white  p-6 shadow-2xl text-center w-80"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <AiOutlineClose size={24} />
          </button>

          <GiTrophyCup className="text-6xl text-gold mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-2 font-racing">We have a winner!</h2>

          <p className="mb-6 text-gray-700 font-bruno">
            {winner.name} crossed the finish in{" "}
            <strong>{(winner.time / SPEED_FACTOR).toFixed(2)}s</strong>.
          </p>

          <button
            className="w-full px-4 py-2 bg-blue-500 text-red rounded-lg hover:bg-blue-600 transition font-racing"
            onClick={onClose}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default WinnerModal;
