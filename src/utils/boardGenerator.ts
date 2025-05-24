import { CellData } from "../types/game";

export function generateBoard(rows: number, cols: number, mineCount: number): CellData[][] {
  const board: CellData[][] = [];

  // Generar tablero vacío
  for (let y = 0; y < rows; y++) {
    const row: CellData[] = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        x,
        y,
        hasMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      });
    }
    board.push(row);
  }

  // Colocar minas aleatoriamente
  let placedMines = 0;
  while (placedMines < mineCount) {
    const randX = Math.floor(Math.random() * cols);
    const randY = Math.floor(Math.random() * rows);
    if (!board[randY][randX].hasMine) {
      board[randY][randX].hasMine = true;
      placedMines++;
    }
  }

  // Calcular minas adyacentes
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],         [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
  ];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x].hasMine) continue;

      let count = 0;
      for (const [dy, dx] of directions) {
        const newY = y + dy;
        const newX = x + dx;
        if (
          newY >= 0 && newY < rows &&
          newX >= 0 && newX < cols &&
          board[newY][newX].hasMine
        ) {
          count++;
        }
      }

      board[y][x].adjacentMines = count;
    }
  }

  return board;
}