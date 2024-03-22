import React from "react";
import { render, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom/extend-expect";
import mockQnaModel from "@/__mocks__/mockQnaModel";

describe("Home", () => {
  describe("page rendering", () => {
    beforeEach(() => {
      jest.mock("@/lib/tensorflowInit", () => {
        return mockQnaModel;
      });
    });

    it("renders without crashing", () => {
      render(<Home />);
    });

    it("renders initial loading message", () => {
      const { getByText } = render(<Home />);
      expect(getByText("Loading TensorFlow.js scripts...")).toBeInTheDocument();
    });

    it("renders loaded message", async () => {
      const { getByText } = render(<Home />);
      waitFor(
        () => {
          expect(
            getByText("TensorFlow.js scripts have loaded!")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("renders chat window", () => {
      render(<Home />);
      expect(document.querySelector("#chat-window")).toBeInTheDocument();
    });
  });
});
