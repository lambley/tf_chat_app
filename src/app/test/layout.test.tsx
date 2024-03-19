import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";
import "@testing-library/jest-dom/extend-expect";

describe("RootLayout", () => {
  it("renders children", () => {
    const text: React.ReactNode = <div>Hello World!</div>;

    const { getByText } = render(<RootLayout>{text}</RootLayout>);

    expect(getByText("Hello World!")).toBeInTheDocument();
  });
});
