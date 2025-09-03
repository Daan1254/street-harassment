import React, { useState } from "react";
import { useQuiz } from "~/providers/quiz-provider";

export function QuizComponent() {
  const {
    getCurrentScenario,
    getCurrentQuestion,
    userAnswers,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    isQuizComplete,
    score,
    scenarios,
    currentScenarioIndex,
    currentQuestionIndex,
    resetQuiz,
  } = useQuiz();

  const [showExplanation, setShowExplanation] = useState(false);
  const currentScenario = getCurrentScenario();
  const currentQuestion = getCurrentQuestion();

  if (!currentScenario || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  const totalQuestions = scenarios.reduce(
    (total, scenario) => total + scenario.questions.length,
    0
  );
  const questionNumber =
    scenarios
      .slice(0, currentScenarioIndex)
      .reduce((total, scenario) => total + scenario.questions.length, 0) +
    currentQuestionIndex +
    1;

  const hasAnswered = userAnswers[currentQuestion.id] !== undefined;
  const selectedAnswer = userAnswers[currentQuestion.id];

  const handleAnswerSelect = (answerIndex: number) => {
    selectAnswer(currentQuestion.id, answerIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    nextQuestion();
  };

  const handlePrevious = () => {
    setShowExplanation(false);
    previousQuestion();
  };

  // Effect om showExplanation te updaten als we naar een vraag gaan die al beantwoord is
  React.useEffect(() => {
    if (currentQuestion && userAnswers[currentQuestion.id] !== undefined) {
      setShowExplanation(true);
    }
  }, [currentQuestion, userAnswers]);

  const canGoNext = questionNumber < totalQuestions;
  const canGoPrevious = questionNumber > 1;

  if (isQuizComplete && showExplanation === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fantastisch!
          </h1>
          <div className="text-6xl font-bold text-pink-500 mb-6">
            {score}/{totalQuestions}
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Je hebt {score} van de {totalQuestions} scenario's succesvol
            doorlopen!
          </p>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Opnieuw Beginnen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600">
      {/* Header with Progress */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/90 font-medium">
              Scenario {questionNumber} van {totalQuestions}
            </div>
            <div className="text-white/90 text-sm">
              {Math.round(((questionNumber - 1) / totalQuestions) * 100)}%
              voltooid
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((questionNumber - 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Scenario */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video bg-gray-50 flex items-center justify-center">
                <img
                  src={currentScenario.image}
                  alt={currentScenario.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-3">
                  {currentScenario.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentScenario.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Question & Answers */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {currentQuestion.question}
              </h1>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const showResult = hasAnswered && showExplanation;

                let buttonClasses =
                  "group w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 ";

                if (showResult) {
                  if (isSelected) {
                    buttonClasses += "bg-blue-50 border-blue-400 shadow-lg";
                  } else {
                    buttonClasses += "bg-white/50 border-white/30";
                  }
                } else if (isSelected) {
                  buttonClasses +=
                    "bg-white border-white shadow-lg transform scale-[1.02]";
                } else {
                  buttonClasses +=
                    "bg-white/80 border-white/50 hover:bg-white hover:border-white hover:shadow-lg hover:transform hover:scale-[1.01]";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !hasAnswered && handleAnswerSelect(index)}
                    disabled={hasAnswered}
                    className={buttonClasses}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mr-6 transition-colors ${
                          showResult && isSelected
                            ? "bg-blue-500 text-white"
                            : isSelected
                              ? "bg-pink-500 text-white"
                              : "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-pink-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span
                        className={`flex-1 font-semibold text-lg ${
                          showResult && isSelected
                            ? "text-blue-800"
                            : "text-gray-800"
                        }`}
                      >
                        {option}
                      </span>
                      {showResult && isSelected && (
                        <div className="text-blue-500 text-xl ml-4">→</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Explanation */}
        {showExplanation &&
          currentQuestion.explanations &&
          selectedAnswer !== undefined && (
            <div className="mt-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">💭</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-xl mb-3">
                      Over jouw keuze
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {currentQuestion.explanations[selectedAnswer]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 ${
              canGoPrevious
                ? "bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50"
                : "bg-white/10 text-white/40 cursor-not-allowed border-2 border-white/10"
            }`}
          >
            ← Vorige
          </button>

          {hasAnswered && showExplanation && canGoNext && (
            <button
              onClick={handleNext}
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Volgende →
            </button>
          )}

          {hasAnswered && showExplanation && !canGoNext && (
            <button
              onClick={() => setShowExplanation(false)}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Bekijk Resultaat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
