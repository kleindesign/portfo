import type React from "react"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import CurlyQuotes from "@/components/curly-quotes"

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["200", "300", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
})

const roboto = {}; // Placeholder for roboto variable, should be replaced with actual import

export const metadata: Metadata = {
  title: "Daniel Klein Design",
  description: "Daniel Klein Design Portfolio",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} font-kanit bg-white text-black antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.scrollTo(0, 0);
                if (window.location.pathname === '/' || window.location.pathname === '') {
                  window.scrollTo(0, 0);
                }
              }
            `,
          }}
        />
        <CurlyQuotes />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
