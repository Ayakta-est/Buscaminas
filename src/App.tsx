import React from "react";
import { useState } from "react";
import MenuScreen from "./pages/MenuScreen";
import GameScreen from "./pages/GameScreen";

export default function App() {
  const [screen, setScreen] = useState<"menu" | "game">("menu");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");

  const startGame = (selectedDifficulty: typeof difficulty) => {
    setDifficulty(selectedDifficulty);
    setScreen("game");
  };

  const goBackToMenu = () => {
    setScreen("menu");
  };

  return (
  <div className="min-h-screen bg-lime-100 flex items-center justify-center">
    {screen === "menu" ? (
      <MenuScreen onStart={startGame} />
    ) : (
      <GameScreen difficulty={difficulty} onBack={goBackToMenu} />
    )}
  </div>
);
}
