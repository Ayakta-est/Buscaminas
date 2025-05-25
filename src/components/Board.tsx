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

  // Estado del tablero y flag para saber si ya generamos minas
  const [board, setBoard] = useState<CellData[][]>(() =>
    Array.from({ length: rows }, (_, y) =>
      Array.from({ length: cols }, (_, x) => ({
        x,
        y,
        hasMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    )
  );
  const [generated, setGenerated] = useState(false);

  // Flood fill para celdas vacías
  const revealEmptyCells = (board: CellData[][], startX: number, startY: number): CellData[][] => {
    const H = board.length, W = board[0].length;
    const clone = board.map((row) => row.map((c) => ({ ...c })));
    const visited = new Set<string>();
    const queue: [number, number][] = [[startX, startY]];

    while (queue.length) {
      const [cx, cy] = queue.shift()!;
      const key = `${cx}-${cy}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const cell = clone[cy][cx];
      if (cell.isFlagged) continue;
      cell.isRevealed = true;

      if (cell.adjacentMines === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const nx = cx + dx, ny = cy + dy;
            if (
              nx >= 0 && ny >= 0 &&
              nx < W && ny < H &&
              !visited.has(`${nx}-${ny}`)
            ) {
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    return clone;
  };

  const handleLeftClick = (x: number, y: number) => {
    setBoard((prev) => {
      // Si todavía no hemos generado minas, lo hacemos ahora excluyendo (x,y)
      if (!generated) {
        const newBoard = generateBoard(rows, cols, mines, x, y);
        setGenerated(true);
        // Revelamos en cascada desde la primera casilla
        return revealEmptyCells(newBoard, x, y);
      }

      // Ya está generado: aplicamos lógica normal
      const clone = prev.map((r) => r.map((c) => ({ ...c })));
      const cell = clone[y][x];
      if (cell.isFlagged || cell.isRevealed) return prev;

      if (cell.hasMine) {
        // Revelar todo y game over
        alert("💥 Has perdido!");
        return clone.map((r) =>
          r.map((c) => ({ ...c, isRevealed: true }))
        );
      }

      if (cell.adjacentMines === 0) {
        return revealEmptyCells(clone, x, y);
      } else {
        clone[y][x].isRevealed = true;
        return clone;
      }
    });
  };

  const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    setBoard((prev) => {
      const clone = prev.map((r) => r.map((c) => ({ ...c })));
      const cell = clone[y][x];
      if (!cell.isRevealed) {
        cell.isFlagged = !cell.isFlagged;
      }
      return clone;
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
