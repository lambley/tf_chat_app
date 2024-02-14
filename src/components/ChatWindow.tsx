import React, { useState, FormEvent, ChangeEvent } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const ChatWindow = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([] as Message[]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
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
              message.sender === "user" ? "bg-blue-100" : "bg-gray-100"
            } rounded-lg my-1 text-black`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Message Input and Submit Button */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-tl-md rounded-tr-md focus:outline-none focus:ring focus:border-blue-300 text-black resize-none"
        />
        <button
          type="submit"
          className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-br-md rounded-bl-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
