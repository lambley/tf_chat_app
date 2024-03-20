type Answers = {
  text: string;
  startIndex: number;
  endIndex: number;
  score: number;
};

type Message = {
  text: string;
  sender: "user" | "bot";
  isContext?: boolean;
  timestamp: string;
};

type UseChatWindowProps = {
  id: string;
  onAskQuestion: (question: string, context: string) => Promise<Answers[]>;
  modelIsReady: boolean;
};

type ChatWindowProps = {
  onAskQuestion: (question: string, context: string) => Promise<Answers[]>;
  modelIsReady: boolean;
  inputContext: string;
  setInputContext: (input: string) => void;
  inputQuestion: string;
  setInputQuestion: (input: string) => void;
  answers: Answers[];
  setAnswers: (answers: Answers[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  currentStep: "context" | "question" | "request answers";
  setCurrentStep: (step: "context" | "question" | "request answers") => void;
  onAskQuestionHandler: () => void;
  addBotMessage: (answers: Answers[]) => void;
  getTimeStamp: () => string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type { Answers, Message, UseChatWindowProps, ChatWindowProps };
