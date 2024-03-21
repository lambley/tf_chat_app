import { createErrorAnswer } from "../answerUtils";

describe("createErrorAnswer", () => {
  it("should return an answer object with the error message", () => {
    const errorMessage = "Something went wrong";
    const result = createErrorAnswer(errorMessage);
    expect(result).toEqual({
      text: `Error: ${errorMessage}`,
      startIndex: 0,
      endIndex: 0,
      score: 0,
    });
  });
});
