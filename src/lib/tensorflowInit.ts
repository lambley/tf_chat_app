import * as qna from "@tensorflow-models/qna";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

let cachedModel: qna.QuestionAndAnswer | null = null;

class QnaModel {
  private static instance: QnaModel | null = null;
  private model: qna.QuestionAndAnswer | null = null;

  constructor() {}

  static getInstance() {
    if (!QnaModel.instance) {
      QnaModel.instance = new QnaModel();
    }
    return QnaModel.instance;
  }

  async initialize(onLoadCallback: () => void) {
    try {
      if (!this.model) {
        // Check if the model is not already initialized
        this.model = cachedModel || (await qna.load());
        cachedModel = this.model; // Cache the initialized model
        console.log("Q&A model initialized successfully!");
        onLoadCallback();
      } else {
        console.log("Q&A model is already initialized. Reusing existing model.");
        onLoadCallback();
      }
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
