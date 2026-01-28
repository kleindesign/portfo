"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer py-8 px-6 animate-fade-in-up">
      <div className="max-w-[1400px] mx-auto">
        <div className="footer-text text-center text-sm">
          <span>
            <a href="/" target="_self" className="footer-link transition-all duration-300 ease-in-out">
              danielkleindesign
              <br />
              URBAN IMPACT DESIGNER • AMSTERDAM
              <br />© {currentYear} DANIEL KLEIN
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
