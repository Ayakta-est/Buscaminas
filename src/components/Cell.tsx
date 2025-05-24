import React from "react";
import { CellData } from "../types/game";

interface CellProps {
  data: CellData;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ data, onClick, onRightClick }) => {
  let content = "";

  if (data.isRevealed) {
    if (data.hasMine) {
      content = "💣";
    } else if (data.adjacentMines > 0) {
      content = data.adjacentMines.toString();
    }
  } else if (data.isFlagged) {
    content = "🚩";
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onRightClick}
      className={`w-8 h-8 border text-center text-sm flex items-center justify-center cursor-pointer select-none
        ${
          data.isRevealed
            ? "bg-gray-300 border-gray-500"
            : "bg-green-200 border-green-800 hover:bg-green-300"
        }`}
    >
      {content}
    </div>
  );
};

export default Cell;
