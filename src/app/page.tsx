import Script from "next/script";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Script
        src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/@tensorflow-models/qna"
        strategy="beforeInteractive"
      ></Script>
      <h1 className="text-5xl font-bold">Hello World</h1>
    </main>
  );
}
