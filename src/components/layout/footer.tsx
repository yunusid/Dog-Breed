import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Dog Breed Helper. All rights reserved.
        </p>
      </div>
    </footer>
  )
}