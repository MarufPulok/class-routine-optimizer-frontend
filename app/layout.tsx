import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Class Routine Optimizer",
  description: "Class Routine Optimizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
