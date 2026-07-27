import { useEffect, useState } from "react";
import { ANSWER_WORDS } from "../data/wordleWords";
import "../styles/Wordle.css";

type LetterColor = "green" | "yellow" | "red";

const getWord = () => {
  const randomIndex = Math.floor(Math.random() * ANSWER_WORDS.length);
  return ANSWER_WORDS[randomIndex];
};

const getColor = (
  targetWord: string,
  char: string,
  index: number
): LetterColor => {
  if (targetWord[index] === char) {
    return "green";
  }

  if (targetWord.includes(char)) {
    return "yellow";
  }

  return "red";
};

const Wordle = () => {
  const [isGameMode, setGameMode] = useState(false);
  const [targetWord, setTargetWord] = useState<string | null>(null);
  const [guess, setGuess] = useState(""); // Current Guess
  const [allGuesses, setAllGuesses] = useState<string[]>([]);

  const startGame = () => {
    setGameMode(true);
    setTargetWord(getWord());
    setGuess("");
    setAllGuesses([]);
  };

  const endGame = () => {
    setGameMode(false);
    setTargetWord(null);
    setGuess("");
    setAllGuesses([]);
  };

  useEffect(() => {
    if (!isGameMode) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (guess.length === 5 && allGuesses.length < 5) {
          setAllGuesses((currentGuesses) => [...currentGuesses, guess]);
          setGuess("");
        }

        return;
      }

      if (event.key === "Backspace") {
        setGuess((currentGuess) => currentGuess.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key) && guess.length < 5) {
        setGuess((currentGuess) => (currentGuess + event.key).toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allGuesses.length, guess, isGameMode]);

  return (
    <div className="game-mode-wrap">
      <button
        className={`game-mode ${isGameMode ? "active" : ""}`}
        onClick={isGameMode ? endGame : startGame}
      >
        <span>{isGameMode ? "End Game" : "Game Mode"}</span>
      </button>

      {isGameMode && (
        <div className="wordle-game">
          <div className="wordle-grid">
            {[...Array(5)].map((_, row) => (
              <div key={row} style={{ display: "flex" }}>
                {[...Array(5)].map((_, col) => {
                  const rowGuess =
                    allGuesses[row] ||
                    (row === allGuesses.length ? guess : "");
                  const letter = rowGuess[col] || "";
                  const isSubmittedGuess = Boolean(allGuesses[row]);

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
                        color: isSubmittedGuess ? "white" : "black",
                        backgroundColor:
                          isSubmittedGuess && targetWord
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
        </div>
      )}
    </div>
  );
};

export default Wordle;
