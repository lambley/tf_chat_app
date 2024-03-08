import React from "react";
import useChatWindow from "@/hooks/useChatWindow";
import { ChatWindowProps } from "@/types";

const ChatWindow = (props: ChatWindowProps) => {
  const chatWindowProps = useChatWindow(props);

  return (
    <div className="w-full mx-auto p-4 border rounded-lg shadow-md">
      {/* Message Display Area */}
      <div className="h-96 max-h-96 border-b mb-4 overflow-y-auto">
        {chatWindowProps.messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${
              message.sender === "user"
                ? message.isContext
                  ? "bg-orange-500"
                  : "bg-blue-500"
                : "bg-gray-100"
            } rounded-lg my-1 text-black w-3/5 ${
              message.sender === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <div className="flex content-center justify-between">
              <span>
                <span className="font-bold">
                  {
                    {
                      user: "You: ",
                      bot: "Bot: ",
                    }[message.sender]
                  }
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
      <form onSubmit={chatWindowProps.handleSubmit} className="flex flex-col">
        {chatWindowProps.currentStep === "context" && (
          <textarea
            value={chatWindowProps.inputContext}
            onChange={chatWindowProps.handleInputChange}
            onKeyDown={chatWindowProps.handleCtrlEnter}
            placeholder="Type your context..."
            className="flex-1 p-2 border rounded-tl-md rounded-tr-md focus:outline-none focus:ring focus:border-blue-300 text-black resize-none"
            disabled={!chatWindowProps.modelIsReady}
            autoFocus={chatWindowProps.modelIsReady}
          />
        )}
        {(chatWindowProps.currentStep === "question" || chatWindowProps.currentStep === "request answers") && (
          <textarea
            value={chatWindowProps.inputQuestion}
            onChange={chatWindowProps.handleInputChange}
            onKeyDown={chatWindowProps.handleCtrlEnter}
            placeholder={
              chatWindowProps.currentStep === "request answers"
                ? "Ask another question..."
                : "Type your question..."
            }
            className="flex-1 p-2 border rounded-tl-md rounded-tr-md focus:outline-none focus:ring focus:border-blue-300 text-black resize-none"
            disabled={!chatWindowProps.modelIsReady}
            autoFocus={chatWindowProps.modelIsReady}
          />
        )}
        <button
          type="submit"
          className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-br-md rounded-bl-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {chatWindowProps.currentStep === "context" ? "Submit Context" : "Submit Question"}
        </button>
        {chatWindowProps.currentStep === "request answers" && (
          <button
            type="button"
            onClick={chatWindowProps.handleNewContext}
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
