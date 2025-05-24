import React from "react";
import Board from "../components/Board";

type Difficulty = "easy" | "medium" | "hard";

interface GameScreenProps {
  difficulty: Difficulty;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ difficulty, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <h1 className="text-3xl font-bold text-center">
        Modo de juego: {difficulty}
      </h1>

      <Board difficulty={difficulty} />

      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={onBack}
      >
        Volver al menú
      </button>
    </div>
  );
};

export default GameScreen;
