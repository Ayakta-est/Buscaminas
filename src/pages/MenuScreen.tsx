import React, { useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

interface MenuScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStart }) => {    // Functional Component
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  return (
    <div className="flex flex-col items-center p-1 gap-1 text-white">
      <h1 className="text-5xl m-2">Buscaminas</h1>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-2xl">Dificultad:</label>
        <select
          className="text-l p-1"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          <option value="easy" className="text-black">Fácil</option>
          <option value="medium" className="text-black">Medio</option>
          <option value="hard" className="text-black">Difícil</option>
        </select>
      </div>

      <button className="text-white text-xl bg-cyan-200 rounded-xl cursor-pointer py-3 px-8" onClick={() => onStart(difficulty)}>
        Jugar
      </button>

      <div className="mx-auto flex max-w-sm flex-col items-start gap-y-2 rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold text-black">Puntuaciones</h2>
        <p className="italic text-gray-600">No hay puntuaciones aún</p>
      </div>
    </div>
  );
};

export default MenuScreen;