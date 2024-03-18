import React from "react";
import type { Metadata } from "next";
import "../styles/globals.css";
import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants";

export const metadata: Metadata = {
  title: "TF Question App",
  description: "A simple app to ask questions using TensorFlow.js.",
};

interface RootLayoutProps {
  metadata?: Metadata;
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, metadata }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
