import React from "react";
import Cell from "./Cell";

type Difficulty = "easy" | "medium" | "hard";

interface BoardProps {
  difficulty: Difficulty;
}

const getBoardSize = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return { rows: 8, cols: 8 };
    case "medium":
      return { rows: 16, cols: 16 };
    case "hard":
      return { rows: 16, cols: 30 };
  }
};

const Board: React.FC<BoardProps> = ({ difficulty }) => {
  const { rows, cols } = getBoardSize(difficulty);
  const totalCells = rows * cols;

  return (
    <div
      className={`grid gap-px bg-green-800`}
      style={{ gridTemplateColumns: `repeat(${cols}, 2rem)` }}
    >
      {Array.from({ length: totalCells }).map((_, idx) => (
        <Cell key={idx} />
      ))}
    </div>
  );
};

export default Board;
