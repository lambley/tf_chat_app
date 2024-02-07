"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setScriptLoaded(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Script
        src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"
        strategy="beforeInteractive"
        onLoad={() => console.log("TensorFlow.js script loaded")}
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/@tensorflow-models/qna"
        strategy="beforeInteractive"
        onLoad={() => console.log("QnA script loaded")}
      ></Script>
      <h1 className="text-5xl font-bold">Hello World</h1>
      {scriptLoaded && <p>TensorFlow.js scripts have loaded!</p>}
    </main>
  );
}
