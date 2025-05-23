import React from "react";

type Difficulty = "easy" | "medium" | "hard";

interface GameScreenProps {
  difficulty: Difficulty;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ difficulty, onBack }) => {
  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <h1>Modo de juego: {difficulty}</h1>
      <button
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        Volver al menú
      </button>
    </div>
  );
};

export default GameScreen;
