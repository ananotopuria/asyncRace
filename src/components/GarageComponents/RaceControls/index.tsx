interface RaceControlsProps {
  isRacing: boolean;
  onGenerate: () => void;
  onStartRace: () => void;
  onResetRace: () => void;
}

export default function RaceControls({
  isRacing,
  onGenerate,
  onStartRace,
  onResetRace,
}: RaceControlsProps) {
  return (
    <div className="flex justify-between mb-6 bg-white rounded-lg font-bruno">
      <button
        onClick={onGenerate}
        disabled={isRacing}
        className="btn bg-green-500 hover:bg-green-600 text-lighterGrey font-semibold py-2 px-4 rounded transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate 100
      </button>
      <div>
        <button
          onClick={onStartRace}
          disabled={isRacing}
          className="btn bg-blue-500 hover:bg-blue-600 text-lighterGrey font-semibold py-2 px-4 rounded transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Race
        </button>
        <button
          onClick={onResetRace}
          className="btn bg-red-500 hover:bg-red-600 text-lighterGrey font-semibold py-2 px-4 rounded transition transform hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
