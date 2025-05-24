import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { generateBoard } from "../utils/boardGenerator";
import { CellData } from "../types/game";

type Difficulty = "easy" | "medium" | "hard";

interface BoardProps {
  difficulty: Difficulty;
}

const getBoardParams = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return { rows: 8, cols: 8, mines: 10 };
    case "medium":
      return { rows: 16, cols: 16, mines: 40 };
    case "hard":
      return { rows: 16, cols: 30, mines: 99 };
    default:
      return { rows: 8, cols: 8, mines: 10 };
  }
};

const Board: React.FC<BoardProps> = ({ difficulty }) => {
  const { rows, cols, mines } = getBoardParams(difficulty);
  const [board, setBoard] = useState<CellData[][]>([]);

  useEffect(() => {
    const newBoard = generateBoard(rows, cols, mines);
    setBoard(newBoard);
  }, [rows, cols, mines]);

  const handleLeftClick = (x: number, y: number) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));
      const cell = newBoard[y][x];
      if (!cell.isRevealed && !cell.isFlagged) {
        cell.isRevealed = true;
      }
      return newBoard;
    });
  };

  const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault(); // Evita el menú contextual del clic derecho
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));
      const cell = newBoard[y][x];
      if (!cell.isRevealed) {
        cell.isFlagged = !cell.isFlagged;
      }
      return newBoard;
    });
  };

  return (
    <div
      className="grid bg-green-800 gap-px"
      style={{ gridTemplateColumns: `repeat(${cols}, 2rem)` }}
    >
      {board.flat().map((cell) => (
        <Cell
          key={`${cell.x}-${cell.y}`}
          data={cell}
          onClick={() => handleLeftClick(cell.x, cell.y)}
          onRightClick={(e) => handleRightClick(e, cell.x, cell.y)}
        />
      ))}
    </div>
  );
};

export default Board;
