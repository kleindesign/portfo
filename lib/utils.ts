import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToCurlyQuotes(text: string): string {
  if (!text) return text

  return (
    text
      // Convert straight apostrophes to curly apostrophes
      .replace(/(\w)'(\w)/g, "$1'$2") // Between letters (don't → don't)
      .replace(/(\w)'(s|t|re|ve|ll|d|m)\b/g, "$1'$2") // Common contractions

      // Convert straight quotes to curly quotes
      .replace(/"([^"]*)"/g, '"$1"') // Wrap quoted text with curly quotes

      // Handle edge cases for opening quotes after spaces or at start
      .replace(/(\s|^)"(\w)/g, '$1"$2')
      // Handle edge cases for closing quotes before spaces, punctuation, or at end
      .replace(/(\w)"(\s|[.,!?;:]|$)/g, '$1"$2')

      // Clean up any remaining straight quotes at boundaries
      .replace(/^"/g, '"')
      .replace(/"$/g, '"')
  )
}
