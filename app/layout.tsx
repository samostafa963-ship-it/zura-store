import type { Metadata } from "next";
import "./globals.css";
import { SessionProviderWrapper } from "./components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "زورا — تسوق كل احتياجاتك",
  description: "زورا متجر إلكتروني لكل احتياجاتك",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}