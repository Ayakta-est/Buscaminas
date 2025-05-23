// game.ts
export type GameState = "idle" | "playing" | "won" | "lost";

export type Cell = {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type Board = Cell[][];
