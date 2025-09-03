import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanations: string[]; // Array of explanations for each answer option
}

export interface QuizScenario {
  id: string;
  title: string;
  image: string;
  description: string;
  questions: QuizQuestion[];
}

interface QuizContextType {
  scenarios: QuizScenario[];
  currentScenarioIndex: number;
  currentQuestionIndex: number;
  userAnswers: Record<string, number>;
  score: number;
  isQuizComplete: boolean;
  nextQuestion: () => void;
  previousQuestion: () => void;
  selectAnswer: (questionId: string, answerIndex: number) => void;
  resetQuiz: () => void;
  getCurrentScenario: () => QuizScenario | null;
  getCurrentQuestion: () => QuizQuestion | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Super realistic scenarios based on common situations people actually encounter
const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: "scenario1",
    title: "Uitgaansgebied - Zaterdagavond",
    image: "/scenario1.svg",
    description:
      "Je loopt door het uitgaansgebied en ziet een man die een vrouw blijft volgen en steeds probeert een gesprek te beginnen. Ze draait zich weg en loopt steeds sneller, maar hij blijft aandringen met 'Kom op, één drankje maar!'",
    questions: [
      {
        id: "q1_1",
        question: "Je ziet deze situatie gebeuren. Wat doe je als eerste?",
        options: [
          "Naar de vrouw lopen en vragen: 'Hé, is alles oké met je?'",
          "De man aanspreken: 'Hey man, laat haar gewoon met rust'",
          "112 bellen omdat dit straatintimidatie is",
          "Doorlopen, dit gebeurt nu eenmaal in uitgaansgebieden",
        ],
        correctAnswer: 0,
        explanations: [
          "Uitstekende keuze! Door direct contact te maken met haar, laat je zien dat er iemand let op en geef je haar de controle. Ze kan aangeven of ze hulp wil zonder dat je de situatie escaleert. Dit is de veiligste eerste stap.",
          "Dit kan werken, maar is riskanter. Directe confrontatie kan de man agressief maken en de situatie escaleren. Bovendien neem je de controle weg bij de vrouw - misschien wil zij juist geen scene.",
          "112 is voor acute noodsituaties. Hoewel dit vervelend is, is het nog geen direct gevaar. Probeer eerst mildere interventies. Als de situatie escaleert, dan wel 112 bellen.",
          "Begrijpelijk dat je twijfelt, maar hierdoor blijft zij alleen in een vervelende situatie. Zelfs kleine signalen van steun kunnen veel betekenen. Je hoeft geen held te zijn, gewoon laten merken dat je er bent.",
        ],
      },
      {
        id: "q1_2",
        question:
          "De vrouw knikt geschrokken naar je en fluistert 'hij volgt me al 10 minuten'. Wat is je volgende stap?",
        options: [
          "Tegen de man zeggen: 'Ze wil niet praten, ga weg'",
          "Aanbieden om samen met haar naar binnen te gaan bij een café",
          "Vragen of ze iemand kan bellen om haar op te halen",
          "Een foto maken van de man voor het geval er iets gebeurt",
        ],
        correctAnswer: 1,
        explanations: [
          "Begrijpelijk dat je haar wilt verdedigen, maar nu heb je bevestigd dat zij hulp nodig heeft. Directe confrontatie kan de man agressief maken. Beter is om haar eerst in veiligheid te brengen.",
          "Perfect! Door samen naar binnen te gaan, breng je haar weg uit de situatie zonder confrontatie. Een café biedt veiligheid, personeel dat kan helpen, en de man zal waarschijnlijk niet naar binnen volgen.",
          "Dit kan een goede aanvullende stap zijn, maar los het niet direct op - hij blijft haar ondertussen volgen. Eerst zorgen dat ze veilig is, dan pas iemand bellen.",
          "Dit kan nuttig zijn voor later, maar helpt haar nu niet. Focus eerst op haar veiligheid. Bovendien kan hij agressief reageren als hij je ziet fotograferen.",
        ],
      },
    ],
  },
  {
    id: "scenario2",
    title: "Trein naar Werk - Spitsuur",
    image: "/scenario2.svg",
    description:
      "In de overvolle trein naar het werk zie je een oudere man die steeds 'per ongeluk' tegen een jonge vrouw aan botst en opmerkingen maakt over haar kleding. Ze probeert zich weg te draaien maar kan nergens heen door de drukte.",
    questions: [
      {
        id: "q2_1",
        question:
          "Hoe help je in deze krappe ruimte zonder een scene te maken?",
        options: [
          "Hardop zeggen: 'Stop met die vrouw lastig te vallen!'",
          "Je tussen hen in bewegen door te zeggen: 'Sorry, ik moet eruit'",
          "De conducteur roepen via de noodknop",
          "De situatie filmen als bewijs voor later",
        ],
        correctAnswer: 1,
        explanations: [
          "In een volle trein kan dit heel vervelend worden. De man kan ontkennen, anderen gaan staren, en de vrouw kan zich nog ongemakkelijker voelen. In krappe ruimtes is subtiele interventie vaak effectiever.",
          "Slimme aanpak! Door je tussen hen te bewegen met een neutrale reden verstoort je het gedrag zonder confrontatie. Je geeft haar ruimte en hij snapt dat er wordt opgelet. Simpel maar effectief.",
          "De noodknop is voor noodsituaties met direct gevaar. Dit kan overreactie lijken en trekt veel aandacht. Probeer eerst subtielere methoden, maar goed dat je aan autoriteit denkt.",
          "Kan nuttig zijn, maar lost de situatie nu niet op. Bovendien kan hij agressief reageren als hij je ziet filmen. Focus eerst op het stoppen van het gedrag, bewijs is voor later.",
        ],
      },
      {
        id: "q2_2",
        question:
          "Bij het uitstappen vraagt de vrouw: 'Gebeurt dit vaker? Ik dacht dat ik me aanstelde.' Wat zeg je?",
        options: [
          "'Je stelde je niet aan, dat was echt niet oké van hem'",
          "'Ach, dit soort dingen gebeuren wel vaker in de spits'",
          "'Je had gewoon harder moeten zeggen dat hij moest stoppen'",
          "'Misschien was het toch per ongeluk door de drukte'",
        ],
        correctAnswer: 0,
        explanations: [
          "Perfecte reactie! Je valideert haar gevoel en bevestigt dat haar waarneming klopt. Veel mensen twijfelen aan zichzelf bij intimidatie. Door dit te zeggen help je haar vertrouwen te behouden.",
          "Hoewel dit waar kan zijn, bagatelliseer je hiermee haar ervaring. 'Het gebeurt vaker' betekent niet dat het oké is. Ze heeft recht op validatie van haar gevoelens, niet normalisering.",
          "Dit is victim blaming. Je legt de verantwoordelijkheid bij haar terwijl de man het probleem is. Veel mensen durven niet hardop te protesteren uit angst of schaamte. Niet haar schuld.",
          "Hiermee twijfel je aan haar waarneming en gevoel. 'Per ongeluk' herhaaldelijk tegen dezelfde persoon? Haar instinct klopt meestal. Geloof en ondersteun haar ervaring.",
        ],
      },
    ],
  },
];

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  const totalQuestions = QUIZ_SCENARIOS.reduce(
    (total, scenario) => total + scenario.questions.length,
    0
  );
  const answeredQuestions = Object.keys(userAnswers).length;
  const isQuizComplete = answeredQuestions === totalQuestions;

  const score = Object.entries(userAnswers).reduce(
    (score, [questionId, answerIndex]) => {
      const question = QUIZ_SCENARIOS.flatMap(
        (scenario) => scenario.questions
      ).find((q) => q.id === questionId);
      return score + (question?.correctAnswer === answerIndex ? 1 : 0);
    },
    0
  );

  const getCurrentScenario = () => {
    return QUIZ_SCENARIOS[currentScenarioIndex] || null;
  };

  const getCurrentQuestion = () => {
    const scenario = getCurrentScenario();
    return scenario?.questions[currentQuestionIndex] || null;
  };

  const nextQuestion = () => {
    const currentScenario = getCurrentScenario();
    if (!currentScenario) return;

    if (currentQuestionIndex < currentScenario.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentScenarioIndex < QUIZ_SCENARIOS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex((prev) => prev - 1);
      const prevScenario = QUIZ_SCENARIOS[currentScenarioIndex - 1];
      setCurrentQuestionIndex(prevScenario.questions.length - 1);
    }
  };

  const selectAnswer = (questionId: string, answerIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const resetQuiz = () => {
    setCurrentScenarioIndex(0);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const value: QuizContextType = {
    scenarios: QUIZ_SCENARIOS,
    currentScenarioIndex,
    currentQuestionIndex,
    userAnswers,
    score,
    isQuizComplete,
    nextQuestion,
    previousQuestion,
    selectAnswer,
    resetQuiz,
    getCurrentScenario,
    getCurrentQuestion,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
