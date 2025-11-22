import type { Metadata } from "next";
import "./global.css";
import { LanguageProvider } from "@/lib/contents/LanguageContext";

export const metadata: Metadata = {
  title: "Lab Yaoundé - Laboratoires de biologie médicale",
  description: "Des laboratoires proches de vous, une expertise médicale reconnue pour prévenir et soigner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}