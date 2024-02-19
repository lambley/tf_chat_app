"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import QnaModel from "@/lib/tensorflowInit";
import { Answers } from "@/types";

export default function Home() {
  const [tfInstance, setTfInstance] = useState<QnaModel>(null);

  const modelIsready = tfInstance !== null;

  const loadingText = "Loading TensorFlow.js scripts...";
  const loadedText = "TensorFlow.js scripts have loaded!";

  useEffect(() => {
    async function initializeModel() {
    const model = new QnaModel();
      await model.initialize(() => setTfInstance(model));
    }

    initializeModel();
  }, []);

  const renderScriptLoadingMessage = () => {
    const message = tfInstance ? loadedText : loadingText;
    const messageClass = tfInstance ? "text-green-500" : "text-red-500";

    return <p className={"h-24 " + messageClass}>{message}</p>;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Ask a Question</h1>
      <div className="w-3/4">{ChatWindow()}</div>
      {renderScriptLoadingMessage()}
    </main>
  );
}
