import Link from "next/link"
import { Dog, Globe, Book, Sparkles, Heart, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Dog className="mr-2" />
          Dog Breed Helper
        </Link>
        
        <nav className="hidden md:flex space-x-4">
          <Link href="/breeds" className="flex items-center hover:underline">
            <Dog className="mr-1" size={18} />
            Breeds
          </Link>
          <Link href="/compare" className="flex items-center hover:underline">
            <Globe className="mr-1" size={18} />
            Compare
          </Link>
          <Link href="/sizes" className="flex items-center hover:underline">
            <Globe className="mr-1" size={18} />
            Sizes
          </Link>
          <Link href="/temperament" className="flex items-center hover:underline">
            <Globe className="mr-1" size={18} />
            Temperament
          </Link>
        </nav>
      </div>
    </header>
  )
}