import React, { useState, useEffect } from 'react';

const generateRandomNumbers = () => {
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
};

const initialNumbers = generateRandomNumbers();

const PuzzleGame = () => {
    const [numbers, setNumbers] = useState(initialNumbers);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        setIsSolved(numbers.every((number, index) => number === index + 1));
    }, [numbers]);

    const handleTileClick = (index) => {
        const emptyIndex = numbers.indexOf(9);
        const currentRow = Math.floor(emptyIndex / 3);
        const targetRow = Math.floor(index / 3);
        const currentColumn = emptyIndex % 3;
        const targetColumn = index % 3;

        // Check if the clicked tile is adjacent to the empty tile
        if (
            (Math.abs(currentRow - targetRow) === 1 && currentColumn === targetColumn) ||
            (Math.abs(currentColumn - targetColumn) === 1 && currentRow === targetRow)
        ) {
            const newNumbers = [...numbers];
            [newNumbers[index], newNumbers[emptyIndex]] = [newNumbers[emptyIndex], newNumbers[index]];
            setNumbers(newNumbers);
        }
    };

    const renderTiles = () => {
        return numbers.map((number, index) => (
            <div key={index} className={`tile ${number === 9 ? 'empty' : ''}`} onClick={() => handleTileClick(index)}>
                {number !== 9 && number}
            </div>
        ));
    };

    const handleRestart = () => {
        setNumbers(generateRandomNumbers());
        setIsSolved(false);
    };

    return (
        <>
        <div className='body-tag vh-100'>
        <div className="puzzle-container pt-5 pb-5">
            <h1 className='gametitle'>Sliding Puzzle</h1>

            <div className="puzzle-board" >
                {renderTiles()}
            </div>
            <div className="puzzle-info">
                {isSolved ? <p>Congratulations! Puzzle solved!</p> : <button onClick={handleRestart}>Restart</button>}
            </div>
        </div>
        </div>
        </>
    );
};

export default PuzzleGame;
