import React, { useState } from "react";
import Cell from "./Cell";
import { generateBoard } from "../utils/boardGenerator";
import { CellData } from "../types/game";
import GameHUD from "./GameHUD";

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

// Comprueba si todas las casillas sin mina están reveladas
const checkWin = (board: CellData[][]): boolean =>
  board.flat().filter(c => !c.hasMine).every(c => c.isRevealed);

const Board: React.FC<BoardProps> = ({ difficulty }) => {
  const { rows, cols, mines } = getBoardParams(difficulty);

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
  const [flagMode, setFlagMode] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const revealEmptyCells = (
    board: CellData[][],
    startX: number,
    startY: number
  ): CellData[][] => {
    const H = board.length, W = board[0].length;
    const clone = board.map(row => row.map(c => ({ ...c })));
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
            ) queue.push([nx, ny]);
          }
        }
      }
    }
    return clone;
  };

  const handleLeftClick = (x: number, y: number) => {
    if (gameState !== 'playing') return;

    let newBoard: CellData[][];
    let nextState: 'playing' | 'won' | 'lost' = 'playing';

    if (!generated) {
      const generatedBoard = generateBoard(rows, cols, mines, x, y);
      setGenerated(true);
      newBoard = revealEmptyCells(generatedBoard, x, y);
    } else {
      const clone = board.map(r => r.map(c => ({ ...c })));
      const cell = clone[y][x];
      if (cell.isFlagged || cell.isRevealed) return;

      if (cell.hasMine) {
        nextState = 'lost';
        newBoard = clone.map(r => r.map(c => ({ ...c, isRevealed: true })));
      } else if (cell.adjacentMines === 0) {
        newBoard = revealEmptyCells(clone, x, y);
      } else {
        clone[y][x].isRevealed = true;
        newBoard = clone;
      }
    }

    setBoard(newBoard);

    if (nextState === 'lost') {
      setGameState('lost');
      alert("💥 Has perdido!");
    } else if (checkWin(newBoard)) {
      setGameState('won');
      alert("🎉 ¡Has ganado!");
    }
  };

  const handleRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameState !== 'playing') return;
    setBoard(prev => {
      const clone = prev.map(r => r.map(c => ({ ...c })));
      const cell = clone[y][x];
      if (!cell.isRevealed) cell.isFlagged = !cell.isFlagged;
      return clone;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <GameHUD
        difficulty={difficulty}
        isMobile={isMobile}
        flagMode={flagMode}
        onToggleFlagMode={() => setFlagMode(!flagMode)}
        position="top"
      />

      <div className="flex">
        {/* Borde izquierdo */}
        <div className="w-4 bg-sky-200" />

        {/* Tablero */}
        <div
          className="grid bg-sky-800 gap-px m-1"
          style={{ gridTemplateColumns: `repeat(${cols}, 2rem)` }}
        >
          {board.flat().map((cell) => (
            <Cell
              key={`${cell.x}-${cell.y}`}
              data={cell}
              onClick={(e) => {
                if (isMobile) {
                  flagMode
                    ? handleRightClick(e as unknown as React.MouseEvent, cell.x, cell.y)
                    : handleLeftClick(cell.x, cell.y);
                } else {
                  handleLeftClick(cell.x, cell.y);
                }
              }}
              onRightClick={(e) => {
                if (!isMobile) handleRightClick(e, cell.x, cell.y);
              }}
            />
          ))}
        </div>

        {/* Borde derecho */}
        <div className="w-4 bg-sky-200" />
      </div>

      {/* Borde inferior */}
      <div className="h-4 bg-sky-200 rounded-b-lg w-full max-w-[calc(2rem*cols+8px)]" />
    </div>
  );
};

export default Board;
