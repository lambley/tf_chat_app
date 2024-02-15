"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import QnaModel from "@/lib/tensorflowInit";

export default function Home() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const loadingText = "Loading TensorFlow.js scripts...";
  const loadedText = "TensorFlow.js scripts have loaded!";

  useEffect(() => {
    const model = new QnaModel();
    model.initialize(() => {
      setScriptLoaded(true);
    });
  }, []);

  const renderScriptLoadingMessage = () => {
    const message = scriptLoaded ? loadedText : loadingText;
    const messageClass = scriptLoaded ? "text-green-500" : "text-red-500";

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
