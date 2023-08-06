import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isXNext) {
      // If it's the computer's turn (Player 2)
      const computerMove = generateComputerMove(board);
      if (computerMove !== null) {
        setTimeout(() => {
          handleClick(computerMove);
        }, 1000); // Add a delay to make the computer move visible
      }
    }
  }, [board, isXNext]);

  const calculateWinner = (currentBoard) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const generateComputerMove = (currentBoard) => {
    // Check if there are empty squares on the board
    const emptySquares = currentBoard.reduce((acc, val, index) => {
      if (val === null) {
        acc.push(index);
      }
      return acc;
    }, []);

    // Check if the computer can win in the next move
    for (const index of emptySquares) {
      const newBoard = [...currentBoard];
      newBoard[index] = 'O';
      if (calculateWinner(newBoard) === 'O') {
        return index;
      }
    }

    // Check if the player can win in the next move and block them
    for (const index of emptySquares) {
      const newBoard = [...currentBoard];
      newBoard[index] = 'X';
      if (calculateWinner(newBoard) === 'X') {
        return index;
      }
    }

    // If no immediate winning moves or blocking moves, make a random move
    if (emptySquares.length > 0) {
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      return randomIndex;
    }

    return null; // No available moves
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? `${userInfo.name}` : 'AI'}`;

  return (
    <div className="game">
      <h1 className='gametitle'>TIC TAC TOE</h1>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
};

export default TicTacToeGame;
