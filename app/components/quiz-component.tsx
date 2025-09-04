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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800 text-2xl font-bold">Loading...</div>
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
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div
          className="text-white py-4 px-6"
          style={{ backgroundColor: "var(--color-persian-pink)" }}
        >
          <h1 className="text-xl font-bold text-center">SSH</h1>
        </div>

        {/* Results Content */}
        <div className="px-6 py-12 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fantastisch!
          </h1>
          <div
            className="text-6xl font-bold mb-6"
            style={{ color: "var(--color-persian-pink)" }}
          >
            {score}/{totalQuestions}
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Je hebt {score} van de {totalQuestions} scenario's succesvol
            doorlopen!
          </p>
          <button
            onClick={resetQuiz}
            className="text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg"
            style={{ backgroundColor: "var(--color-persian-pink)" }}
          >
            Opnieuw Beginnen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="text-white py-4 px-6"
        style={{ backgroundColor: "var(--color-persian-pink)" }}
      >
        <h1 className="text-xl font-bold text-center">SSH</h1>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`text-2xl ${canGoPrevious ? "text-gray-600" : "text-gray-300"}`}
          >
            ←
          </button>

          <div className="flex-1 mx-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-persian-pink)",
                  width: `${(questionNumber / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!hasAnswered || !canGoNext}
            className={`text-2xl ${hasAnswered && canGoNext ? "text-gray-600" : "text-gray-300"}`}
          >
            →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* Question Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          What would you do in this situation?
        </h2>

        {/* Desktop Grid Layout */}
        <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start">
          {/* Left Column - Image and Description (Desktop) / Top (Mobile) */}
          <div className="mb-6 md:mb-0">
            {/* Scenario Image */}
            <div className="mb-6 flex justify-center">
              <div className="w-full max-w-sm md:max-w-none">
                <img
                  src={currentScenario.image}
                  alt={currentScenario.title}
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Scenario Description */}
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <p className="text-gray-700 leading-relaxed">
                {currentScenario.description}
              </p>
            </div>
          </div>

          {/* Right Column - Answer Options (Desktop) / Bottom (Mobile) */}
          <div>
            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const showResult = hasAnswered && showExplanation;

                let buttonClasses =
                  "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";

                if (showResult) {
                  if (isSelected) {
                    buttonClasses += "border-2" + " bg-blue-50";
                    buttonClasses += " border-[var(--color-persian-pink)]";
                  } else {
                    buttonClasses += "bg-gray-50 border-gray-200";
                  }
                } else if (isSelected) {
                  buttonClasses += "border-2" + " bg-blue-50";
                  buttonClasses += " border-[var(--color-persian-pink)]";
                } else {
                  buttonClasses +=
                    "bg-white border-gray-200 hover:border-gray-300";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !hasAnswered && handleAnswerSelect(index)}
                    disabled={hasAnswered}
                    className={buttonClasses}
                  >
                    <div className="flex items-center">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 text-white"
                        style={{
                          backgroundColor: isSelected
                            ? "var(--color-persian-pink)"
                            : "#E5E7EB",
                        }}
                      >
                        <span
                          className={
                            isSelected ? "text-white" : "text-gray-600"
                          }
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                      </span>
                      <span className="flex-1 font-medium text-gray-800">
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Explanation - Full Width Below Grid */}
        {showExplanation &&
          currentQuestion.explanations &&
          selectedAnswer !== undefined && (
            <div className="mb-8 mt-8">
              <div
                className="bg-gray-50 rounded-xl p-6 border-l-4"
                style={{ borderColor: "var(--color-persian-pink)" }}
              >
                <div className="flex items-start">
                  <div className="text-2xl mr-3">💭</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">
                      Over jouw keuze
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {currentQuestion.explanations[selectedAnswer]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Navigation - Only show next when explanation is shown */}
        {hasAnswered && showExplanation && canGoNext && (
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200"
              style={{ backgroundColor: "var(--color-persian-pink)" }}
            >
              Volgende →
            </button>
          </div>
        )}

        {hasAnswered && showExplanation && !canGoNext && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowExplanation(false)}
              className="text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200"
              style={{ backgroundColor: "var(--color-persian-pink)" }}
            >
              Bekijk Resultaat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
