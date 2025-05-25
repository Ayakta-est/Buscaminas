import React from "react";
import { CellData } from "../types/game";

interface CellProps {
  data: CellData;
  onClick: (e: React.MouseEvent) => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ data, onClick, onRightClick }) => {
  let content = "";
  let numberColor = "";

  if (data.isRevealed && !data.hasMine && data.adjacentMines > 0) {
    switch (data.adjacentMines) {
      case 1:
        numberColor = "text-blue-600";
        break;
      case 2:
        numberColor = "text-green-600";
        break;
      case 3:
        numberColor = "text-red-600";
        break;
      case 4:
        numberColor = "text-indigo-800";
        break;
      case 5:
        numberColor = "text-yellow-900";
        break;
      case 6:
        numberColor = "text-teal-700";
        break;
      case 7:
        numberColor = "text-black";
        break;
      case 8:
        numberColor = "text-gray-700";
        break;
    }
  }

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
            : "bg-pink-800 border-pink-900 hover:bg-pink-600 border-3"
        }
        ${data.adjacentMines > 0 && data.isRevealed && !data.hasMine ? numberColor : ""}
      `}
    >
      {content}
    </div>
  );
};

export default Cell;
