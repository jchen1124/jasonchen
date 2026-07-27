import { type FormEvent, useState } from "react";
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

  const submitGuess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (guess.length !== 5 || allGuesses.length >= 5) {
      return;
    }

    setAllGuesses((currentGuesses) => [...currentGuesses, guess]);
    setGuess("");
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
        <div className="wordle-game">
          <div className="wordle-grid">
            {[...Array(5)].map((_, row) => (
              <div key={row} style={{ display: "flex" }}>
                {[...Array(5)].map((_, col) => (
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
                        ? getColor(
                            targetWord,
                            allGuesses[row]?.[col] || "",
                            col
                          )
                        : "white",
                    }}
                  >
                    {allGuesses[row]?.[col] || ""}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <form className="wordle-form" onSubmit={submitGuess}>
            <input
              className="wordle-input"
              value={guess}
              maxLength={5}
              onChange={(event) =>
                setGuess(event.target.value.toUpperCase().slice(0, 5))
              }
            />
            <button className="wordle-submit" type="submit">
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Wordle;
