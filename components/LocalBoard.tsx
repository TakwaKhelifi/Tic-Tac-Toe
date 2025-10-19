
import React from 'react';
import { Player } from '../types';
import Cell from './Cell';

interface LocalBoardProps {
  board: Player[];
  boardIndex: number;
  onCellClick: (boardIndex: number, cellIndex: number) => void;
  isActive: boolean;
  isWinner: boolean;
}

const LocalBoard: React.FC<LocalBoardProps> = ({ board, boardIndex, onCellClick, isActive, isWinner }) => {
  const borderClass = isActive 
    ? 'border-cyan-400 shadow-lg shadow-cyan-500/50' 
    : 'border-slate-700';

  return (
    <div className={`grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-md border-2 transition-all duration-300 ${borderClass}`}>
      {board.map((cellValue, i) => (
        <Cell
          key={i}
          value={cellValue}
          onClick={() => onCellClick(boardIndex, i)}
          isClickable={isActive && !cellValue && !isWinner}
        />
      ))}
    </div>
  );
};

export default LocalBoard;
