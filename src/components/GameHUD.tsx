import React from "react";

interface GameHUDProps {
  difficulty: "easy" | "medium" | "hard";
  isMobile: boolean;
  flagMode: boolean;
  onToggleFlagMode: () => void;
  position: "top" | "bottom" | "left" | "right";
}

const GameHUD: React.FC<GameHUDProps> = ({
  difficulty,
  isMobile,
  flagMode,
  onToggleFlagMode,
  position,
}) => {
  const difficultyLabels: Record<string, string> = {
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
  };

  // Tamaños para cada borde
  const thickness = "w-8 h-8"; // grosor de los bordes

  const content = (
    <div className="flex flex-col items-center gap-2 text-center p-2 text-white">
      {position === "top" && (
        <h1 className="text-xl font-bold">
          Modo de juego: {difficultyLabels[difficulty]}
        </h1>
      )}

      {isMobile && (
        <button
          onClick={onToggleFlagMode}
          className={`px-4 py-2 rounded font-semibold text-white transition ${
            flagMode ? "bg-red-300" : "bg-yellow-300"
          }`}
        >
          {flagMode ? "Colocar bandera 🚩" : "Modo normal"}
        </button>
      )}
    </div>
  );

  if (position === "top" || position === "bottom") {
    return (
      <div className={`w-full bg-sky-800 ${position === "bottom" ? "rounded-b-lg" : "rounded-t-lg"}`}>
        {content}
      </div>
    );
  }

  if (position === "left" || position === "right") {
    return (
      <div
        className={`bg-sky-800 ${thickness} flex items-center justify-center text-white ${
          position === "left" ? "rounded-l-lg" : "rounded-r-lg"
        }`}
      >
        {/* Puedes meter un icono o simplemente dejarlo como borde */}
      </div>
    );
  }

  return null;
};

export default GameHUD;
