"use client"

import { useEffect } from "react"

export default function CurlyQuotes() {
  useEffect(() => {
    function replaceStraightQuotes(element: HTMLElement) {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentElement
          if (!parent || parent.tagName === "SCRIPT" || parent.tagName === "STYLE" || parent.tagName === "TEXTAREA" || parent.tagName === "INPUT") {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        },
      })

      const nodesToReplace: { node: Text; newValue: string }[] = []

      let node: Node | null
      while ((node = walker.nextNode())) {
        if (node.nodeValue) {
          const original = node.nodeValue
          let replaced = original

          // First, replace ALL straight single quotes with curly apostrophe
          // This is the most aggressive approach - every ' becomes '
          replaced = replaced.replace(/'/g, "\u2019")
          
          // Replace straight double quotes
          replaced = replaced.replace(/(^|[\s([{])"/g, "$1\u201C")
          replaced = replaced.replace(/"/g, "\u201D")

          if (original !== replaced) {
            nodesToReplace.push({ node: node as Text, newValue: replaced })
          }
        }
      }

      nodesToReplace.forEach(({ node, newValue }) => {
        node.nodeValue = newValue
      })
    }

    // Run immediately
    replaceStraightQuotes(document.body)
    
    // Run again after short delays to catch dynamically loaded content
    const timeouts = [50, 100, 250, 500, 1000].map(delay => 
      setTimeout(() => replaceStraightQuotes(document.body), delay)
    )

    // Watch for any DOM changes
    const observer = new MutationObserver(() => {
      replaceStraightQuotes(document.body)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => {
      timeouts.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  return null
}
