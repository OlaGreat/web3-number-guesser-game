import React from 'react';
import {CardContent,Card} from './card'

interface GameStatsProps {
  guessesUsed: number;
  maxGuesses: number;
  difficultyLabel: string;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  guessesUsed, 
  maxGuesses, 
  difficultyLabel 
}) => {
  const remainingGuesses = maxGuesses - guessesUsed;
  const progressPercentage = (guessesUsed / maxGuesses) * 100;
  
  const getProgressColor = () => {
    if (progressPercentage <= 50) return 'bg-green-500';
    if (progressPercentage <= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="bg-white/5 border-white/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white/70 text-sm uppercase tracking-wide">Difficulty</p>
            <p className="text-2xl font-bold text-white">{difficultyLabel}</p>
          </div>
          
          <div>
            <p className="text-white/70 text-sm uppercase tracking-wide">Guesses Used</p>
            <p className="text-2xl font-bold text-white">
              {guessesUsed} / {maxGuesses}
            </p>
          </div>
          
          <div>
            <p className="text-white/70 text-sm uppercase tracking-wide">Remaining</p>
            <p className={`text-2xl font-bold ${remainingGuesses <= 2 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {remainingGuesses}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;