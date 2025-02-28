"use client";
// Components
import Board from "./Board";
import GameOver from "./GameOver";
import Reset from "./Reset";
// React
import { useState, useEffect, useMemo } from "react";

const PLAYER_X = "X";
const PLAYER_O = "O";
const CLICK_SOUND = "/sounds/clicksound.wav";
const GAME_OVER_SOUND = "/sounds/gameoversound.wav";

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState(null);
  const [gameOverAndResetHidden, setGameOverAndResetHidden] = useState({
    hidden: true,
    winner: "",
  });

  // Memoize audio instances to avoid creating new ones on every render
  const clickAudio = useMemo(() => {
    if (typeof window !== "undefined") {
      return new Audio(CLICK_SOUND);
    }
    return null;
  }, []);

  const gameOverAudio = useMemo(() => {
    if (typeof window !== "undefined") {
      return new Audio(GAME_OVER_SOUND);
    }
    return null;
  }, []);

  // Safe audio play function with error handling
  const playSound = (audio) => {
    audio.play().catch((error) => {
      console.log("Audio playback prevented:", error);
    });
  };

  const handleReset = () => {
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
    setGameOverAndResetHidden({ hidden: true, winner: "" });
  };

  const winningCombinations = [
    // Rows
    {
      combo: [0, 1, 2],
      strikeClass: "strike-row-1",
    },
    {
      combo: [3, 4, 5],
      strikeClass: "strike-row-2",
    },
    {
      combo: [6, 7, 8],
      strikeClass: "strike-row-3",
    },
    //Columns
    {
      combo: [0, 3, 6],
      strikeClass: "strike-column-1",
    },
    {
      combo: [1, 4, 7],
      strikeClass: "strike-column-2",
    },
    {
      combo: [2, 5, 8],
      strikeClass: "strike-column-3",
    },
    // Diagonals
    {
      combo: [0, 4, 8],
      strikeClass: "strike-diagonal-1",
    },
    {
      combo: [2, 4, 6],
      strikeClass: "strike-diagonal-2",
    },
  ];

  function checkWinner(tiles, setStrikeClass) {
    let winnerFound = false;

    for (const winningCombination of winningCombinations) {
      const { combo, strikeClass } = winningCombination;
      const tileValue1 = tiles[combo[0]];
      const tileValue2 = tiles[combo[1]];
      const tileValue3 = tiles[combo[2]];

      if (
        tileValue1 != null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
      ) {
        setStrikeClass(strikeClass);
        winnerFound = true;

        if (tileValue1 === PLAYER_X) {
          setGameOverAndResetHidden({ hidden: false, winner: "Player X wins" });
        } else {
          setGameOverAndResetHidden({ hidden: false, winner: "Player O wins" });
        }
        break;
      }
    }

    // Check for draw - only if no winner and all tiles are filled
    if (!winnerFound && tiles.every((tile) => tile !== null)) {
      setGameOverAndResetHidden({ hidden: false, winner: "Draw" });
    }
  }

  useEffect(() => {
    checkWinner(tiles, setStrikeClass);
  }, [tiles]);

  useEffect(() => {
    // Only play click sound if at least one tile is filled and it's not the initial render
    if (tiles.some((tile) => tile !== null)) {
      playSound(clickAudio);
    }
  }, [tiles, clickAudio]);

  useEffect(() => {
    if (gameOverAndResetHidden.hidden === false) {
      playSound(gameOverAudio);
    }
  }, [gameOverAndResetHidden, gameOverAudio]);

  const handleTileClick = (index) => {
    // Prevent clicks if tile is already filled or game is over
    if (tiles[index] !== null || gameOverAndResetHidden.hidden === false) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);

    // Switch player turn
    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div
        aria-live="polite"
        className="game-status"
        data-current-player={gameOverAndResetHidden.hidden ? playerTurn : null}
        data-game-over={!gameOverAndResetHidden.hidden ? "true" : "false"}
        data-winner={gameOverAndResetHidden.winner}
      >
        {gameOverAndResetHidden.hidden
          ? `Current turn: Player ${playerTurn}`
          : gameOverAndResetHidden.winner}
      </div>
      <Board
        playerTurn={playerTurn}
        onTileCliked={handleTileClick}
        tiles={tiles}
        strikeClass={strikeClass}
      />
      <GameOver gameOverAndResetHidden={gameOverAndResetHidden} />
      <Reset
        gameOverAndResetHidden={gameOverAndResetHidden}
        reSet={handleReset}
      />
    </div>
  );
}

export default TicTacToe;
