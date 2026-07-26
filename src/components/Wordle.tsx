import { useState } from "react";
import { ANSWER_WORDS } from "../data/wordleWords";
import "../styles/Wordle.css";

const getWord = () => {
    const randomIndex = Math.floor(Math.random() * ANSWER_WORDS.length)
    return ANSWER_WORDS[randomIndex]
  }

const Wordle = () => {
  const [isGameMode, setGameMode] = useState(false);
  const [targetWord, setTargetWord] = useState<string | null>(null)
  
  const startGame = () => {
    setGameMode(true);
    setTargetWord(getWord());
  }

  const endGame = () => {
    setGameMode(false);
    setTargetWord(null);
  }
  return (
    <div className="game-mode-wrap">
      <button
        className={`game-mode ${isGameMode ? "active" : ""}`}
        onClick={isGameMode ? endGame : startGame}
      >
        <span>{isGameMode ? "End Game" : "Game Mode"}</span>
      </button>

      {isGameMode &&(
        <div>
            Game
        </div>
      )}

    </div>
  );

};

export default Wordle
