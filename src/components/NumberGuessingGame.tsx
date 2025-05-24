import React, { useState, useCallback } from 'react';
import GameBoard from './gameBoard';
import DifficultySelector from './difficultySelector';
import { Card, CardContent } from './card';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameState = 'selecting' | 'playing' | 'won' | 'lost';

export interface GameConfig {
  maxGuesses: number;
  difficulty: Difficulty;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { maxGuesses: number; label: string }> = {
  easy: { maxGuesses: 10, label: 'Easy' },
  medium: { maxGuesses: 7, label: 'Medium' },
  hard: { maxGuesses: 5, label: 'Hard' },
};

const NumberGuessingGame = () => {
  const [gameState, setGameState] = useState<GameState>('selecting');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [guesses, setGuesses] = useState<number[]>([]);
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    maxGuesses: DIFFICULTY_CONFIG.medium.maxGuesses,
    difficulty: 'medium'
  });

  const startGame = useCallback((selectedDifficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIG[selectedDifficulty];
    const newSecretNumber = Math.floor(Math.random() * 100) + 1;
    
    setDifficulty(selectedDifficulty);
    setGameConfig({
      maxGuesses: config.maxGuesses,
      difficulty: selectedDifficulty
    });
    setSecretNumber(newSecretNumber);
    setGuesses([]);
    setGameState('playing');
    
    console.log(`Game started - Difficulty: ${selectedDifficulty}, Secret Number: ${newSecretNumber}, Max Guesses: ${config.maxGuesses}`);
  }, []);

  const makeGuess = useCallback((guess: number) => {
    console.log(`Player guessed: ${guess}`);
    
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    if (guess === secretNumber) {
      setGameState('won');
      console.log('Player won!');
    } else if (newGuesses.length >= gameConfig.maxGuesses) {
      setGameState('lost');
      console.log('Player lost - out of guesses');
    }
  }, [guesses, secretNumber, gameConfig.maxGuesses]);

  const resetGame = useCallback(() => {
    setGameState('selecting');
    setGuesses([]);
    setSecretNumber(0);
    console.log('Game reset');
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-white mb-2">
            🎯 Number Guessing Game
          </CardTitle>
          <p className="text-white/80 text-lg">
            Can you guess the secret number between 1 and 100?
          </p>
        </CardHeader>
        <CardContent>
          {gameState === 'selecting' ? (
            <DifficultySelector 
              onSelectDifficulty={startGame}
              difficultyConfig={DIFFICULTY_CONFIG}
            />
          ) : (
            <GameBoard
              gameState={gameState}
              secretNumber={secretNumber}
              guesses={guesses}
              gameConfig={gameConfig}
              onMakeGuess={makeGuess}
              onReset={resetGame}
              difficultyLabel={DIFFICULTY_CONFIG[difficulty].label}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberGuessingGame;