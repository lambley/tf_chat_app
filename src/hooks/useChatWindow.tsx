// src/hooks/useChatWindow.ts
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Answers, Message, UseChatWindowProps } from "@/types";

export const useChatWindow = ({
  onAskQuestion,
  modelIsReady,
}: UseChatWindowProps) => {
  const [inputContext, setInputContext] = useState("");
  const [inputQuestion, setInputQuestion] = useState("");
  const [answers, setAnswers] = useState([] as Answers[]);
  const [messages, setMessages] = useState([] as Message[]);
  const [currentStep, setCurrentStep] = useState<
    "context" | "question" | "request answers"
  >("context");

  useEffect(() => {
    const initialMessage: Message = {
      text: "Please provide some context for your question.",
      sender: "bot",
      timestamp: getTimeStamp(),
    };
    setMessages([initialMessage]);
  }, []);

  const onAskQuestionHandler = async () => {
    const question = inputQuestion;
    const context = inputContext;
    const answers = await onAskQuestion(question, context);

    setAnswers(answers);
    setInputQuestion("");

    console.log("Answers:", answers);

    addBotMessage(answers);

    setCurrentStep("request answers");
  };

  const addBotMessage = (answers: Answers[]): void => {
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    let botMessage: Message;
    if (!randomAnswer) {
      botMessage = {
        text: "Sorry, I couldn't find an answer to your question.",
        sender: "bot",
        timestamp: getTimeStamp(),
      };
    } else {
      botMessage = {
        text: randomAnswer.text,
        sender: "bot",
        timestamp: getTimeStamp(),
      };
    }
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

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
      setCurrentStep("question");
    } else if (
      (currentStep === "question" || currentStep === "request answers") &&
      inputQuestion.trim() !== ""
    ) {
      setMessages([
        ...messages,
        { text: inputQuestion, sender: "user", timestamp },
      ]);
      onAskQuestionHandler();
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

  return {
    modelIsReady,
    inputContext,
    setInputContext,
    inputQuestion,
    setInputQuestion,
    answers,
    setAnswers,
    messages,
    setMessages,
    currentStep,
    setCurrentStep,
    onAskQuestionHandler,
    handleInputChange,
    handleSubmit,
    handleNewContext,
    handleCtrlEnter,
  };
};

export default useChatWindow;
