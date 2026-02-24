import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astra — The Spatial Productivity OS",
  description:
    "Stop switching contexts. Astra unites your documents, tasks, and departmental chats in a single zero-latency workspace powered by Cross-Departmental AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
