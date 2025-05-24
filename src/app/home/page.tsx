'use client';

import NumberGuessingGame from "@/components/numberGuessingGame";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
        <div className="container mx-auto px-4 py-8">
          <NumberGuessingGame />
        </div>
      </div>
    </div>
  );
}
