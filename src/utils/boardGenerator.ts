import { CellData } from "../types/game";

export function generateBoard(
  rows: number,
  cols: number,
  mineCount: number,
  excludeX: number,
  excludeY: number
): CellData[][] {
  const board: CellData[][] = [];

  // 1. Generar tablero vacío
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

  // 2. Preparar posiciones prohibidas (primer clic y vecinos)
  const forbidden = new Set<string>();
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const fx = excludeX + dx;
      const fy = excludeY + dy;
      if (fx >= 0 && fx < cols && fy >= 0 && fy < rows) {
        forbidden.add(`${fx}-${fy}`);
      }
    }
  }

  // 3. Colocar minas aleatoriamente, evitando posiciones prohibidas
  let placedMines = 0;
  while (placedMines < mineCount) {
    const randX = Math.floor(Math.random() * cols);
    const randY = Math.floor(Math.random() * rows);
    const key = `${randX}-${randY}`;
    if (forbidden.has(key) || board[randY][randX].hasMine) {
      continue;
    }
    board[randY][randX].hasMine = true;
    placedMines++;
  }

  // 4. Calcular minas adyacentes para cada celda
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
        const ny = y + dy;
        const nx = x + dx;
        if (
          ny >= 0 && ny < rows &&
          nx >= 0 && nx < cols &&
          board[ny][nx].hasMine
        ) {
          count++;
        }
      }

      board[y][x].adjacentMines = count;
    }
  }

  return board;
}
