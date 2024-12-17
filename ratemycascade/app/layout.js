import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import "./globals.css";
import{AuthProvider} from "./providers";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Rate My Cascade",
  description: "Rates my Cascade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavBar />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
