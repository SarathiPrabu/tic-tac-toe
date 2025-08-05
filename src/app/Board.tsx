'use client';
import React, { useState } from 'react';
import './Board.css'; // Import the CSS file for animations

interface SquareProps {
  value: string; // "X", "O", or null
  onSquareClick: () => void; // function to handle click events
  highlight: boolean; // prop to indicate if the square should be highlighted
}

function Square({ value, onSquareClick, highlight }: SquareProps) {

  return (
    <button
      className={`w-16 h-16 border-[1px] border-gray-500 flex items-center justify-center text-2xl 
      font-bold ${!highlight ? 'hover:bg-[#b1be9c]' : ''} focus:outline-none ${highlight ? 'bg-[#3a5a40]' : ''
        } `}
      onClick={onSquareClick}>
      <span className={`fade-in ${value ? 'visible' : 'invisible'} font-script`}>{value}</span>
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningPositions = winnerInfo ? winnerInfo.positions : [];

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="card w-80 shadow-2xl  p-6 bg-[#a3b18a] rounded-lg">
        <div className="text-center text-3xl  mb-4 font-cursive">{status}</div>
        <div className="flex justify-center">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} highlight={winningPositions.includes(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} highlight={winningPositions.includes(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} highlight={winningPositions.includes(2)} />
        </div>
        <div className="flex justify-center">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} highlight={winningPositions.includes(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} highlight={winningPositions.includes(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} highlight={winningPositions.includes(5)} />
        </div>
        <div className="flex justify-center">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} highlight={winningPositions.includes(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} highlight={winningPositions.includes(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} highlight={winningPositions.includes(8)} />
        </div>
        <button
          className="mt-4 w-full px-4 py-2 bg-[#588157] text-white font-bold rounded
           hover:bg-[#6a9b6b] focus:outline-none focus:ring-2 focus:ring-[#588157] "
          onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  );
}

// Function to calculate the winner and return the winning positions
function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], positions: [a, b, c] }; // Return winner and winning positions
    }
  }
  return null;
}