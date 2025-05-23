import React, { useState } from "react";

type Props = {
  onStart: (difficulty: "easy" | "medium" | "hard") => void;
};

export default function MenuScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold">Buscaminas</h1>
      <div className="flex gap-2">
        <button onClick={() => onStart("easy")} className="btn">Fácil</button>
        <button onClick={() => onStart("medium")} className="btn">Medio</button>
        <button onClick={() => onStart("hard")} className="btn">Difícil</button>
      </div>
    </div>
  );
}
