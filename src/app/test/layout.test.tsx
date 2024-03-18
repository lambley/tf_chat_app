import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";
import "@testing-library/jest-dom/extend-expect";

describe("RootLayout", () => {
  it("renders children", () => {
    const metadata = {
      title: "Test Title",
      description: "Test Description",
    };

    const { getByText } = render(
      <RootLayout metadata={metadata}>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
