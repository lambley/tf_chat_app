import * as qna from "@tensorflow-models/qna";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

class QnaModel {
  private model: qna.QuestionAndAnswer | null;

  constructor() {
    this.model = null;
  }

  async initialize(onLoadCallback: () => void) {
    try {
      this.model = await qna.load();
      console.log("Q&A model initialized successfully!");
      onLoadCallback();
    } catch (error) {
      console.error("Error initializing Q&A model:", error);
    }
  }

  async askQuestion(question: string, context: string) {
    if (!this.model) {
      console.error("Q&A model not initialized. Call initialize() first.");
      return null;
    }

    try {
      const answers = await this.model.findAnswers(question, context);
      console.log("Question:", question);
      console.log("Answers:", answers);
      return answers;
    } catch (error) {
      console.error("Error asking question:", error);
      return null;
    }
  }
}

export default QnaModel;
