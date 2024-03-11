import { Answers } from '@/types';

const createErrorAnswer = (errorMessage: string): Answers => ({
  text: `Error: ${errorMessage}`,
  startIndex: 0,
  endIndex: 0,
  score: 0,
});

export { createErrorAnswer };
