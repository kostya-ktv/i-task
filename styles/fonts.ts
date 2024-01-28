import { Poppins } from "next/font/google";
import NextFont from "next/font/local";

const woff_font = NextFont({
  src: "../public/fonts/font.woff2",
  variable: "--font-woff",
});
const poppins_font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
});
export const fontInit = `${poppins_font.variable} ${woff_font.variable}`;
