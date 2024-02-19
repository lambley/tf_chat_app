import { Answers } from "@/types";

type Message = {
  text: string;
  sender: "user" | "bot";
  isContext?: boolean;
  timestamp: string;
};

const ChatWindow = () => {
  const [inputContext, setInputContext] = useState("");
  const [inputQuestion, setInputQuestion] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
  const [currentStep, setCurrentStep] = useState<"context" | "question">(
    "context"
  );

  const getTimeStamp = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (currentStep === "context") {
      setInputContext(e.target.value);
    } else {
      setInputQuestion(e.target.value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timestamp = getTimeStamp();
    if (currentStep === "context" && inputContext.trim() !== "") {
      setMessages([
        ...messages,
        { text: inputContext, sender: "user", isContext: true, timestamp },
      ]);
      setInputContext("");
      setCurrentStep("question");
    } else if (currentStep === "question" && inputQuestion.trim() !== "") {
      setMessages([
        ...messages,
        { text: inputQuestion, sender: "user", timestamp },
      ]);
      setInputQuestion("");
    }
  };

  const handleNewContext = () => {
    setInputContext("");
    setInputQuestion("");
    setCurrentStep("context");
  };

  const handleCtrlEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
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
                  ? "bg-orange-500"
                  : "bg-blue-500"
                : "bg-gray-100"
            } rounded-lg my-1 text-black w-1/2 ml-auto`}
          >
            <div className="flex content-center justify-between">
              <span>
                <span className="font-bold">
                  {message.isContext ? "Context: " : "Question: "}
                </span>
                <span>{message.text}</span>
              </span>
              <span className="text-gray-100 text-sm">
                {message.timestamp}{" "}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input and Submit Button */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        {currentStep === "context" && (
          <textarea
            value={inputContext}
            onChange={handleInputChange}
            onKeyDown={handleCtrlEnter}
            placeholder="Type your context..."
            className="flex-1 p-2 border rounded-tl-md rounded-tr-md focus:outline-none focus:ring focus:border-blue-300 text-black resize-none"
          />
        )}
        {currentStep === "question" && (
          <textarea
            value={inputQuestion}
            onChange={handleInputChange}
            onKeyDown={handleCtrlEnter}
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
