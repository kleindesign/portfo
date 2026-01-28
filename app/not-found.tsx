import Link from "next/link"

export default function NotFound() {
  return (
    <div className="pb-16 px-6 max-w-[1400px] mx-auto text-center">
      <h1 className="text-2xl font-normal mb-4">404</h1>
      <p className="text-base mb-6">“Page not found”</p>
      <Link href="/" className="text-sm underline">
        “Return to homepage”
      </Link>
    </div>
  )
}
