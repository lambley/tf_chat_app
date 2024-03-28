import { Answers } from "@/types";

const createErrorAnswer = (errorMessage: string): Answers => ({
  text: `Error: ${errorMessage}`,
  startIndex: 0,
  endIndex: 0,
  score: 0,
});

const testAnswer: Answers[] = [
  {
    text: "Test answer",
    startIndex: 0,
    endIndex: 0,
    score: 0,
  },
];

const testAnswerArray: Answers[] = [
  ...testAnswer,
  ...testAnswer,
  ...testAnswer,
];

export { createErrorAnswer, testAnswer, testAnswerArray };
