import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Provider, ThemeProvider } from "~/providers/providers";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/sonner";


export const metadata = {
  title: "IdeaCanvas",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
