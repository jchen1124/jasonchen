import { useState } from "react";
import { ANSWER_WORDS } from "../data/wordleWords";
import "../styles/Wordle.css";

type LetterColor = "green" | "yellow" | "red"

const getWord = () => {
  const randomIndex = Math.floor(Math.random() * ANSWER_WORDS.length);
  return ANSWER_WORDS[randomIndex];
};

const getColor = (targetWord: string, char: string, index: number): LetterColor => {
    if (targetWord[index] == char){
      return "green"
    }
    if (targetWord.includes(char)){
      return "yellow"
    }
    return "red"
}

const Wordle = () => {
  const [isGameMode, setGameMode] = useState(false);
  const [targetWord, setTargetWord] = useState<string | null>(null);
  const [guess, setGuess] = useState("");
  const [allGuesses, setAllGuesses] = useState([]);
  

  const startGame = () => {
    setGameMode(true);
    setTargetWord(getWord());
  };

  const endGame = () => {
    setGameMode(false);
    setTargetWord(null);
  };
  return (
    <div className="game-mode-wrap">
      <button
        className={`game-mode ${isGameMode ? "active" : ""}`}
        onClick={isGameMode ? endGame : startGame}
      >
        <span>{isGameMode ? "End Game" : "Game Mode"}</span>
      </button>

      {isGameMode && (
        <div>
          {[...Array(5)].map((_, row) => (
            <div key={row} style={{ display: "flex" }}>
              {[...Array(5)].map((_, col) => {
                const letter = allGuesses[row]?.[col] || "";

                return (
                  <div
                    key={col}
                    style={{
                      width: 40,
                      height: 40,
                      border: "1px solid black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: allGuesses[row] && targetWord
                        ? getColor(targetWord, letter, col)
                        : "white",
                    }}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wordle;
