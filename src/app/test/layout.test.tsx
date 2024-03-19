import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";
import "@testing-library/jest-dom/extend-expect";

describe("RootLayout", () => {
  it("renders children", () => {
    const text = "Hello, World!";

    const { getByText } = render(
      <RootLayout>
        <div>{text}</div>
      </RootLayout>
    );

    expect(getByText(text)).toBeInTheDocument();
  });
});
