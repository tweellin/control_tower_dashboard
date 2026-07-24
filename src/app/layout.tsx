import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const x5SansUI = localFont({
  variable: "--font-x5-sans-ui",
  display: "swap",
  src: [
    { path: "../fonts/X5-Sans-UI_Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/X5-Sans-UI_Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/X5-Sans-UI_Bold.ttf", weight: "700", style: "normal" },
  ],
});

const x5Sans = localFont({
  variable: "--font-x5-sans",
  display: "swap",
  src: [
    { path: "../fonts/X5Sans-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/X5Sans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/X5Sans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/X5Sans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Supply Chain Control Tower",
  description: "Панель мониторинга цепочек поставок",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${x5SansUI.variable} ${x5Sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
