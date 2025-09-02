import { QuizComponent } from "~/components/quiz-component";
import { QuizProvider } from "~/providers/quiz-provider";

export default function QuizRoute() {
  return (
    <QuizProvider>
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-quiz-bg)" }}
      >
        <QuizComponent />
      </div>
    </QuizProvider>
  );
}

