import React from 'react';
import GuessInput from './guessInput';
import GameStats from './gameStats';
import { Card, CardContent } from './card';
import { GameState, GameConfig } from './numberGuessingGame';

interface GameBoardProps {
  gameState: GameState;
  secretNumber: number;
  guesses: number[];
  gameConfig: GameConfig;
  onMakeGuess: (guess: number) => void;
  onReset: () => void;
  difficultyLabel: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  secretNumber,
  guesses,
  gameConfig,
  onMakeGuess,
  onReset,
  difficultyLabel
}) => {
  const getLastGuessResult = () => {
    if (guesses.length === 0) return null;
    const lastGuess = guesses[guesses.length - 1];
    
    if (lastGuess === secretNumber) return 'correct';
    if (lastGuess < secretNumber) return 'too-low';
    return 'too-high';
  };

  const getResultMessage = () => {
    const result = getLastGuessResult();
    if (!result || result === 'correct') return null;
    
    return result === 'too-low' ? 
      '📈 Too low! Try a higher number.' : 
      '📉 Too high! Try a lower number.';
  };

  const getResultColor = () => {
    const result = getLastGuessResult();
    if (result === 'too-low') return 'text-blue-300';
    if (result === 'too-high') return 'text-red-300';
    return 'text-green-300';
  };

  
  if (gameState === 'won') {
    return (
      <div className="text-center space-y-6 animate-scale-in">
        <div className="text-6xl animate-pulse">🎉</div>
        <div>
          <h3 className="text-3xl font-bold text-green-400 mb-2">
            Congratulations!
          </h3>
          <p className="text-white text-lg mb-2">
            You guessed the number <span className="font-bold text-green-400">{secretNumber}</span> correctly!
          </p>
          <p className="text-white/70">
            It took you {guesses.length} guess{guesses.length !== 1 ? 'es' : ''} on {difficultyLabel} mode.
          </p>
        </div>
        <button
          onClick={onReset}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  if (gameState === 'lost') {
    return (
      <div className="text-center space-y-6 animate-scale-in">
        <div className="text-6xl">😅</div>
        <div>
          <h3 className="text-3xl font-bold text-red-400 mb-2">
            Game Over!
          </h3>
          <p className="text-white text-lg mb-2">
            The secret number was <span className="font-bold text-red-400">{secretNumber}</span>.
          </p>
          <p className="text-white/70">
            Better luck next time! Try an easier difficulty if you'd like.
          </p>
        </div>
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GameStats
        guessesUsed={guesses.length}
        maxGuesses={gameConfig.maxGuesses}
        difficultyLabel={difficultyLabel}
      />

      {getResultMessage() && (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-4 text-center">
            <p className={`text-lg font-semibold ${getResultColor()}`}>
              {getResultMessage()}
            </p>
          </CardContent>
        </Card>
      )}

      <GuessInput
        onGuess={onMakeGuess}
        disabled={gameState !== 'playing'}
        guesses={guesses}
      />

      {guesses.length > 0 && (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-3">Your Guesses:</h4>
            <div className="flex flex-wrap gap-2">
              {guesses.map((guess, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    guess === secretNumber
                      ? 'bg-green-500 text-white'
                      : guess < secretNumber
                      ? 'bg-blue-500/50 text-blue-200'
                      : 'bg-red-500/50 text-red-200'
                  }`}
                >
                  {guess}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <button
          onClick={onReset}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Change Difficulty
        </button>
      </div>
    </div>
  );
};

export default GameBoard;