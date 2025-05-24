'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from './card';

interface GuessInputProps {
  onGuess: (guess: number) => void;
  disabled: boolean;
  guesses: number[];
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuess, disabled, guesses }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    setError('');
    

    if (!inputValue.trim()) {
      setError('Please enter a number');
      return;
    }

    const guess = parseInt(inputValue);
    
    if (isNaN(guess)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (guess < 1 || guess > 100) {
      setError('Number must be between 1 and 100');
      return;
    }
    

    if (guesses.includes(guess)) {
      setError('You already guessed this number!');
      return;
    }
    

    onGuess(guess);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  return (
    <Card className="bg-white/5 border-white/20">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Enter your guess (1-100):
            </label>
            <div className="flex gap-3">
              <Input
                type="number"
                min="1"
                max="100"
                value={inputValue}
                onChange={handleInputChange}
                disabled={disabled}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40"
                placeholder="Enter a number..."
                autoFocus
              />
              <button
                type="submit"
                disabled={disabled || !inputValue.trim()}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Guess!
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 animate-fade-in">
                {error}
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GuessInput;