
import React, { useState, useEffect, useCallback } from 'react';
import { Player } from './types';
import LocalBoard from './components/LocalBoard';

const BOARD_LOCATIONS: { [key: number]: string } = {
  0: 'أعلى اليمين',
  1: 'أعلى الوسط',
  2: 'أعلى اليسار',
  3: 'وسط اليمين',
  4: 'الوسط',
  5: 'وسط اليسار',
  6: 'أسفل اليمين',
  7: 'أسفل الوسط',
  8: 'أسفل اليسار',
};

const INITIAL_BOARDS = Array(9).fill(Array(9).fill(null));

const App: React.FC = () => {
  const [boards, setBoards] = useState<Player[][]>(INITIAL_BOARDS);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [nextBoardIndex, setNextBoardIndex] = useState<number | null>(null);
  const [winner, setWinner] = useState<Player>(null);
  const [status, setStatus] = useState<string>('تبدأ اللعبة باللاعب X. اختر أي خانة.');

  const checkWinner = useCallback((board: Player[]): Player => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  const isBoardFull = (board: Player[]): boolean => {
      return board.every(cell => cell !== null);
  }

  const handleCellClick = (boardIndex: number, cellIndex: number) => {
    if (winner || boards[boardIndex][cellIndex] || (nextBoardIndex !== null && nextBoardIndex !== boardIndex)) {
      return;
    }

    const newBoards = boards.map(b => [...b]);
    newBoards[boardIndex][cellIndex] = currentPlayer;
    setBoards(newBoards);

    const localWinner = checkWinner(newBoards[boardIndex]);
    if (localWinner) {
      setWinner(localWinner);
      setStatus(`اللاعب ${localWinner} فاز باللعبة!`);
      setNextBoardIndex(null);
      return;
    }
    
    if (isBoardFull(newBoards.flat())) {
        setStatus('انتهت اللعبة بالتعادل!');
        setWinner('X'); // Use winner state to lock board
        setNextBoardIndex(null);
        return;
    }

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);

    if (isBoardFull(newBoards[cellIndex])) {
        setNextBoardIndex(null);
        setStatus(`دور اللاعب ${nextPlayer}. الشبكة التالية ممتلئة. العب في أي شبكة متاحة.`);
    } else {
        setNextBoardIndex(cellIndex);
        setStatus(`دور اللاعب ${nextPlayer}. يجب أن تلعب في الشبكة ${BOARD_LOCATIONS[cellIndex]}.`);
    }
  };
  
  const resetGame = () => {
    setBoards(INITIAL_BOARDS);
    setCurrentPlayer('X');
    setNextBoardIndex(null);
    setWinner(null);
    setStatus('تبدأ اللعبة باللاعب X. اختر أي خانة.');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">لعبة إكس-أو الكبرى</h1>
        <p className="text-lg text-slate-300">{status}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-2 p-2 bg-slate-800 rounded-lg shadow-2xl">
        {boards.map((board, i) => (
          <LocalBoard
            key={i}
            board={board}
            boardIndex={i}
            onCellClick={handleCellClick}
            isActive={winner === null && (nextBoardIndex === null || nextBoardIndex === i)}
            isWinner={winner !== null}
          />
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-8 px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors duration-300 shadow-lg"
      >
        إعادة اللعبة
      </button>
    </div>
  );
};

export default App;
