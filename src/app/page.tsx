import Image from "next/image";
import NumberGuessingGame from "@/components/NumberGuessingGame"
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 py-8">
            <NumberGuessingGame />
          </div>
        </div>
      </div>
      </div>
      );
  }