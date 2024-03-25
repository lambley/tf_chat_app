import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useChatWindow from "../useChatWindow";
import { UseChatWindowProps } from "@/types";

describe("useChatWindow", () => {
  const testUseChatWindowProps: UseChatWindowProps = {
    id: "test",
    onAskQuestion: jest.fn(),
    modelIsReady: true,
  };

  describe("useEffect", () => {});

  describe("onAskQuestionHandler", () => {});

  describe("addBotMessage", () => {});

  describe("getTimeStamp", () => {});

  describe("handleInputChange", () => {});

  describe("handleSubmit", () => {});

  describe("handleNewContext", () => {});

  describe("handleCtrlEnter", () => {
  });
});
