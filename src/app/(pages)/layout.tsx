import Providers from "@/GlobalRedux/Providers";
import "../globals.css";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"], weight: "600" });

export const metadata = {
  title: {
    default: "Home",
  },
  description: "Food Ordering app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
