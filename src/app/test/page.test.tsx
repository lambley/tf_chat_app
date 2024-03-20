import React from "react";
import { render } from "@testing-library/react";
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

    it("renders loading message", () => {
      const { getByText } = render(<Home />);
      expect(getByText("Loading TensorFlow.js scripts...")).toBeInTheDocument();
    });
  });
});
