import { Zain } from "next/font/google";
import "./globals.css";
import Header from "@/components/home/header/Header";

export const metadata = {
  title: "Sidra Honey Shop",
  description:
    "We offer a variety of honey varieties that are delicious in taste and rich in health benefits. If you enjoy honey and its many benefits, I highly recommend you explore our products. Feel free to browse our website or contact us with any questions.",
};

const zain = Zain({
  weight: ["200", "300", "400", "700"],
  subsets: ["arabic"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${zain.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
