"use client";

import React, { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import QnaModel from "@/lib/tensorflowInit";
import { Answers } from "@/types";
import { createErrorAnswer } from "@/lib/answerUtils";

export default function Home() {
  const [tfInstance, setTfInstance] = useState<QnaModel>();

  const modelIsReady = tfInstance !== undefined;

  const loadingText = "Loading TensorFlow.js scripts...";
  const loadedText = "TensorFlow.js scripts have loaded!";

  useEffect(() => {
    async function initializeModel() {
      const model = new QnaModel();
      await model.initialize(() => setTfInstance(model));
    }

    initializeModel();
  }, []);

  useEffect(() => {
    const askQuestion = async () => {
      const question = "What is the capital of France?";
      const context = "The capital of France is Paris.";
      const answers = await tfInstance?.askQuestion(question, context);
      console.log("Answers (hard-coded question):", answers);
    };

    if (tfInstance) {
      askQuestion();
    }
  }, [tfInstance]);

  const renderScriptLoadingMessage = () => {
    const message = tfInstance ? loadedText : loadingText;
    const messageClass = tfInstance ? "text-green-500" : "text-red-500";

    return <p className={"h-24 " + messageClass}>{message}</p>;
  };

  const handleOnAskQuestion = async (
    question: string,
    context: string
  ): Promise<Answers[]> => {
    if (tfInstance) {
      console.log("Asking question:", question, "with context:", context);
      const answers = await tfInstance.askQuestion(question, context);
      console.log("Answers:", answers);
      return answers;
    } else {
      console.error(
        "TensorFlow.js model not initialized. Unable to ask question."
      );
      return [
        createErrorAnswer(
          "TensorFlow.js model not initialized. Unable to ask question."
        ),
      ];
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Ask a Question</h1>
      <div className="max-w-lg w-full">
        <ChatWindow
          onAskQuestion={handleOnAskQuestion}
          modelIsReady={modelIsReady}
        />
      </div>
      {renderScriptLoadingMessage()}
    </main>
  );
}
