import { Question } from "@/types/question"

export const sampleQuestions: Question[] = [
  {
    id: "mc-1",
    type: "multiple-choice",
    question: "Which of the following are prime numbers? (Select all that apply)",
    explanation: "A prime number is a natural number greater than 1 that is only divisible by 1 and itself.",
    points: 2,
    options: [
      { id: "mc-1-1", text: "2" },
      { id: "mc-1-2", text: "4" },
      { id: "mc-1-3", text: "7" },
      { id: "mc-1-4", text: "9" },
      { id: "mc-1-5", text: "11" }
    ],
    correctAnswers: ["mc-1-1", "mc-1-3", "mc-1-5"]
  },
  {
    id: "sc-1",
    type: "single-choice",
    question: "What is the capital of France?",
    explanation: "Paris is the capital and largest city of France.",
    points: 1,
    options: [
      { id: "sc-1-1", text: "London" },
      { id: "sc-1-2", text: "Berlin" },
      { id: "sc-1-3", text: "Paris" },
      { id: "sc-1-4", text: "Madrid" }
    ],
    correctAnswer: "sc-1-3"
  },
  {
    id: "ti-1",
    type: "text-input",
    question: "What is the chemical symbol for water?",
    explanation: "H₂O is the chemical formula for water, representing two hydrogen atoms and one oxygen atom.",
    points: 1,
    correctAnswer: "H2O",
    caseSensitive: false,
    allowPartialMatch: false
  },
  {
    id: "dd-1",
    type: "drag-drop",
    question: "Match the planets with their order from the Sun:",
    explanation: "The order of planets from the Sun is: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    points: 4,
    items: [
      { id: "planet-1", text: "Mercury" },
      { id: "planet-2", text: "Venus" },
      { id: "planet-3", text: "Earth" },
      { id: "planet-4", text: "Mars" }
    ],
    zones: [
      { id: "pos-1", label: "First Planet" },
      { id: "pos-2", label: "Second Planet" },
      { id: "pos-3", label: "Third Planet" },
      { id: "pos-4", label: "Fourth Planet" }
    ],
    correctPlacements: [
      { itemId: "planet-1", zoneId: "pos-1" },
      { itemId: "planet-2", zoneId: "pos-2" },
      { itemId: "planet-3", zoneId: "pos-3" },
      { itemId: "planet-4", zoneId: "pos-4" }
    ]
  },
  {
    id: "ht-1",
    type: "highlight-text",
    question: "Highlight all the adjectives in the following sentence:",
    explanation: "Adjectives are words that describe or modify nouns.",
    points: 3,
    content: "The quick brown fox jumps over the lazy dog.",
    correctHighlights: [
      {
        start: 4,
        end: 9,
        text: "quick"
      },
      {
        start: 10,
        end: 15,
        text: "brown"
      },
      {
        start: 35,
        end: 39,
        text: "lazy"
      }
    ]
  }
] 