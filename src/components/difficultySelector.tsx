import React from 'react';
import { Card, CardContent } from './card';
import { Difficulty } from './NumberGuessingGame';

interface DifficultyConfig {
  maxGuesses: number;
  label: string;
}

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  difficultyConfig: Record<Difficulty, DifficultyConfig>;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onSelectDifficulty,
  difficultyConfig
}) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 hover:bg-green-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'hard': return 'bg-red-500 hover:bg-red-600';
    }
  };

  const getDifficultyDescription = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Perfect for beginners';
      case 'medium': return 'A balanced challenge';
      case 'hard': return 'For the brave!';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Choose Your Challenge</h3>
        <p className="text-white/70">Select a difficulty level to start playing</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {difficulties.map((difficulty) => (
          <Card key={difficulty} className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <header className="text-center pb-2">
              <nav className="text-white text-xl">
                {difficultyConfig[difficulty].label}
              </nav>
            </header>
            <CardContent className="text-center space-y-3">
              <div className="text-white/80">
                <p className="text-2xl font-bold text-white">
                  {difficultyConfig[difficulty].maxGuesses}
                </p>
                <p className="text-sm">guesses</p>
              </div>
              <p className="text-white/60 text-sm">
                {getDifficultyDescription(difficulty)}
              </p>
              <button
                onClick={() => onSelectDifficulty(difficulty)}
                className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${getDifficultyColor(difficulty)}`}
              >
                Start Game
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;