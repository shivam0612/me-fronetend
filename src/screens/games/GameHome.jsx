import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameHome = () => {
  const navigate = useNavigate()

  const gamesData = [
    {
      id: 1,
      name: 'Snake Game',
      description: 'Classic Snake Game 🐍',
      imageUrl: 'https://play-lh.googleusercontent.com/vuu1fRp56d3jr3pj28X9Gyx8p4Txj7AAFO-HpwpD1nou0mv1fyWJl00TkWPLk232qBI',
      route: '/snakegame'
    },
    {
      id: 2,
      name: 'TIC TAC TOE',
      description: 'Tic Tac Toe: Classic Multiplayer Game 🎯',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1673735396428-d51dc2a7a62d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      route: '/tttgame'
    }, {
      id: 2,
      name: 'Sliding Puzzle',
      description: 'Sliding Puzzle: Challenging Tile Game 🧩',
      imageUrl: 'https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/4f/f0/ce/4ff0ce6f-fa56-12ba-36f3-ab24ca196604/source/512x512bb.jpg',
      route: '/puzzlegame'
    }, {
      id: 2,
      name: 'New Game',
      description: 'Launching Soon',
      imageUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      route: '/gamehome'
    },
    // Add more game objects as needed
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };


  return (
    <>
      <div className='body-tag ' style={{ height: "max-content", paddingBottom: "2rem" }}>
        <h3 className="title gamehometitle pt-5">GAMES</h3>

        <div className="game-home-container">
          <div className="game-cards">
            {gamesData.map((game) => (
              <div key={game.id}
                onClick={() => handleCardClick(game.route)}
                className="game-card">
                <img src={game.imageUrl} alt={game.name} className="game-image" />
                <h1 className="game-name text-info">{game.name}</h1>
                <p className="game-description">{game.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div></>
  );
};

export default GameHome;
