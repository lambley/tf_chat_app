import React, { useState, FormEvent, ChangeEvent } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
  isContext?: boolean;
};

const ChatWindow = () => {
  const [inputContext, setInputContext] = useState("");
  const [inputQuestion, setInputQuestion] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
  const [currentStep, setCurrentStep] = useState<"context" | "question">(
    "context"
  );

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (currentStep === "context") {
      setInputContext(e.target.value);
    } else {
      setInputQuestion(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === "context" && inputContext.trim() !== "") {
      setMessages([
        ...messages,
        { text: inputContext, sender: "user", isContext: true },
      ]);
      setInputContext("");
      setCurrentStep("question");
    } else if (currentStep === "question" && inputQuestion.trim() !== "") {
      setMessages([...messages, { text: inputQuestion, sender: "user" }]);
      setInputQuestion("");
    }
  };

  const handleNewContext = () => {
    setInputContext("");
    setInputQuestion("");
    setCurrentStep("context");
  };

  return (
    <div className="max-w-md w-auto mx-auto mt-10 p-4 border rounded-lg shadow-md">
      {/* Message Display Area */}
      <div className="h-48 border-b mb-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${
              message.sender === "user"
                ? message.isContext
                  ? "bg-blue-500"
                  : "bg-blue-100"
                : "bg-gray-100"
            } rounded-lg my-1 text-black`}
          >
            {message.isContext && <span className="font-bold">Context: </span>}
            {message.text}
          </div>
        ))}
      </div>

      {/* Message Input and Submit Button */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        {currentStep === "context" && (
          <textarea
            value={inputContext}
            onChange={handleInputChange}
            placeholder="Type your context..."
            className="flex-1 p-2 border rounded-tl-md rounded-tr-md focus:outline-none focus:ring focus:border-blue-300 text-black resize-none"
          />
        )}
        {currentStep === "question" && (
          <textarea
            value={inputQuestion}
            onChange={handleInputChange}
            placeholder="Type your question..."
            className="flex-1 p-2 border rounded-tl-md rounded-tr-md focus:outline-none focus:ring focus:border-blue-300 text-black resize-none"
          />
        )}
        <button
          type="submit"
          className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-br-md rounded-bl-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {currentStep === "context" ? "Submit Context" : "Submit Question"}
        </button>
        {currentStep === "question" && (
          <button
            type="button"
            onClick={handleNewContext}
            className="mt-1 px-4 py-2 bg-gray-500 text-white rounded-br-md rounded-bl-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
          >
            New Context
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatWindow;
