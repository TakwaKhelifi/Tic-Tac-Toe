
import React from 'react';
import { Player } from '../types';

interface CellProps {
  value: Player;
  onClick: () => void;
  isClickable: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isClickable }) => {
  const valueClass = value === 'X' ? 'text-red-400' : 'text-blue-400';
  const hoverClass = isClickable ? 'hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed';

  return (
    <div
      className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-slate-800 rounded-sm text-3xl md:text-4xl font-bold transition-colors duration-200 ${valueClass} ${hoverClass}`}
      onClick={isClickable ? onClick : undefined}
    >
      {value}
    </div>
  );
};

export default Cell;
