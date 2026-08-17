import { useCallback, useEffect, useRef, useState } from "react";
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
  const gameInputRef = useRef<HTMLInputElement>(null);
  const [isGameMode, setGameMode] = useState(false);
  const [targetWord, setTargetWord] = useState<WordleWord | null>(null);
  const [guess, setGuess] = useState(""); // Current Guess
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [wonMessage, setWonMessage] = useState<string | null>(null);

  const focusGameInput = useCallback(() => {
    gameInputRef.current?.focus({ preventScroll: true });
  }, []);

  const startGame = () => {
    clearButtonFocus();
    setGameMode(true);
    setTargetWord(getWord());
    setGuess("");
    setAllGuesses([]);
    setWonMessage(null);
    focusGameInput();
  };

  const endGame = () => {
    clearButtonFocus();
    setGameMode(false);
    setTargetWord(null);
    setGuess("");
    setAllGuesses([]);
    setWonMessage(null);
  };

  const handleGameInput = useCallback(
    (key: string) => {
      if (wonMessage || allGuesses.length >= GRID_SIZE) {
        return;
      }

      if (key === "Enter") {
        if (guess.length === GRID_SIZE && targetWord) {
          setAllGuesses((currentGuesses) => [...currentGuesses, guess]);

          if (guess === targetWord.word) {
            setWonMessage(messages[allGuesses.length]);
          }

          setGuess("");
        }

        return;
      }

      if (key === "Backspace") {
        setGuess((currentGuess) => currentGuess.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z]$/.test(key) && guess.length < GRID_SIZE) {
        setGuess((currentGuess) => (currentGuess + key).toUpperCase());
      }
    },
    [allGuesses.length, guess, targetWord, wonMessage],
  );

  useEffect(() => {
    if (isGameMode) {
      focusGameInput();
    }
  }, [focusGameInput, isGameMode]);

  useEffect(() => {
    if (!isGameMode) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" ||
        event.key === "Backspace" ||
        /^[a-zA-Z]$/.test(event.key)
      ) {
        event.preventDefault();
        handleGameInput(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGameInput, isGameMode]);

  // handles game-over timeout
  useEffect(() => {
    if (!isGameMode || (!wonMessage && allGuesses.length !== GRID_SIZE)) {
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

      <input
        aria-label="Wordle guess"
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        className="wordle-native-input"
        enterKeyHint="done"
        inputMode="text"
        maxLength={GRID_SIZE}
        onChange={(event) => {
          if (!isGameMode || wonMessage || allGuesses.length >= GRID_SIZE) {
            return;
          }

          setGuess(
            event.currentTarget.value
              .replace(/[^a-zA-Z]/g, "")
              .slice(0, GRID_SIZE)
              .toUpperCase(),
          );
        }}
        ref={gameInputRef}
        spellCheck={false}
        type="text"
        value={guess}
      />

      {isGameMode && (
        <div className="wordle-game" onClick={focusGameInput}>
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
