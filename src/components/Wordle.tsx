import { useEffect, useState } from "react";
import { ANSWER_WORDS, type WordleWord } from "../data/wordleWords";
import { messages } from "../data/wonMessages";
import "../styles/Wordle.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

type LetterColor = "#6AAA63" | "#C9B458" | "#787C7E";
const GRID_SIZE = 5;

const getWord = () => {
  const randomIndex = Math.floor(Math.random() * ANSWER_WORDS.length);
  return ANSWER_WORDS[randomIndex];
};

const getColor = (
  targetWord: string,
  char: string,
  index: number,
): LetterColor => {
  if (targetWord[index] === char) {
    return "#6AAA63";
  }

  if (targetWord.includes(char)) {
    return "#C9B458";
  }

  return "#787C7E";
};

const clearButtonFocus = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

const Wordle = () => {
  const [isGameMode, setGameMode] = useState(false);
  const [targetWord, setTargetWord] = useState<WordleWord | null>(null);
  const [guess, setGuess] = useState(""); // Current Guess
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [wonMessage, setWonMessage] = useState<string | null>(null);

  const startGame = () => {
    clearButtonFocus();
    setGameMode(true);
    setTargetWord(getWord());
    setGuess("");
    setAllGuesses([]);
    setWonMessage(null);
  };

  const endGame = () => {
    clearButtonFocus();
    setGameMode(false);
    setTargetWord(null);
    setGuess("");
    setAllGuesses([]);
    setWonMessage(null);
  };


  useEffect(() => {
    if (!isGameMode) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (wonMessage) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();

        if (guess.length === 5 && allGuesses.length < 5 && targetWord) {
          setAllGuesses((currentGuesses) => [...currentGuesses, guess]);

          if (guess === targetWord.word) {
            setWonMessage(messages[allGuesses.length]);
          }

          setGuess("");
        }

        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        setGuess((currentGuess) => currentGuess.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key) && guess.length < 5) {
        event.preventDefault();
        setGuess((currentGuess) => (currentGuess + event.key).toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allGuesses.length, guess, isGameMode, targetWord, wonMessage]);

  // handles game-over timeout
  useEffect(() => {
    if (!isGameMode || (!wonMessage && allGuesses.length !== 5)) {
      return;
    }

    const timer = window.setTimeout(() => {
      endGame();
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [allGuesses.length, isGameMode, wonMessage]);

  return (
    <div className="game-mode-wrap">
      <div className="game-mode-buttons">
        <button
          className={`game-mode ${isGameMode ? "active" : ""}`}
          onClick={isGameMode ? endGame : startGame}
          type="button"
        >
          <span>{isGameMode ? "End Game" : "Game Mode"}</span>
        </button>
        {isGameMode && (
          <div className="game-info-wrap">
            <button
              aria-label="Game info"
              className="game-info"
              title="Game info"
              type="button"
            >
              <InfoOutlinedIcon />
            </button>

            <div className="game-info-popover" role="tooltip">
              <div className="game-info-title">Tech Wordle</div>
              <p className="game-info-copy">
                Guess the hidden 5-letter word in 5 tries.
              </p>

              <div className="game-info-rules">
                <span>Type letters directly on the board.</span>
                <span>Press Enter to submit.</span>
                <span>Use Backspace to delete.</span>
              </div>

              <div className="game-info-legend" aria-label="Color meanings">
                <div className="game-info-legend-item">
                  <span className="game-info-swatch correct" />
                  <span>Correct spot</span>
                </div>
                <div className="game-info-legend-item">
                  <span className="game-info-swatch close" />
                  <span>Wrong spot</span>
                </div>
                <div className="game-info-legend-item">
                  <span className="game-info-swatch missing" />
                  <span>Not in word</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isGameMode && (
        <div className="wordle-game">
          {(wonMessage || allGuesses.length === GRID_SIZE) && (
            <div className="wordle-result" aria-live="polite">
              {wonMessage || targetWord?.word}
            </div>
          )}

          <div className="wordle-grid">
            {allGuesses.length >= 2 && (
              <div className="hint-wrap">
                <button
                  aria-label="Show hint"
                  className="hint-btn"
                  title="Hint"
                  type="button"
                >
                  <TipsAndUpdatesOutlinedIcon />
                </button>

                <div className="hint-popover" role="tooltip">
                  <span className="hint-title">Hint</span>
                  <p>{targetWord?.hint}</p>
                </div>
              </div>
            )}
            {[...Array(GRID_SIZE)].map((_, row) => (
              <div className="wordle-grid-row" key={row}>
                {[...Array(GRID_SIZE)].map((_, col) => {
                  const rowGuess =
                    allGuesses[row] || (row === allGuesses.length ? guess : "");
                  const letter = rowGuess[col] || "";
                  const isSubmittedGuess = Boolean(allGuesses[row]);
                  const isCurrentTile =
                    !isSubmittedGuess &&
                    row === allGuesses.length &&
                    Boolean(letter);

                  return (
                    <div
                      className={`wordle-tile ${
                        isSubmittedGuess ? "submitted" : ""
                      } ${isCurrentTile ? "current" : ""}`}
                      key={col}
                      style={{
                        backgroundColor:
                          isSubmittedGuess && targetWord
                            ? getColor(targetWord.word, letter, col)
                            : undefined,
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
