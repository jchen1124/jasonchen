import { useState } from "react";
import "../styles/Wordle.css";

const Wordle = () => {
  const [isGameMode, setGameMode] = useState(false);

  return (
    <div className="game-mode-wrap">
      <button
        className={`game-mode ${isGameMode ? "active" : ""}`}
        onClick={() => setGameMode((current) => !current)}
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
