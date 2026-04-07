import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "ResQ Internal",
  description: "Talk to me",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

const themeScript = `
(function(){
  var t = localStorage.getItem('resq-theme');
  document.documentElement.classList.toggle('dark', t !== 'light');
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-metropolis antialiased bg-surface-light text-primaryDark dark:bg-surface-dark dark:text-primaryDark-dark">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
