"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Sprout, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/problem", labelKey: "nav.problem" },
  { href: "/approach", labelKey: "nav.approach" },
  { href: "/dashboard", labelKey: "nav.dashboard" },
  { href: "/chatbot", labelKey: "nav.chatbot" },
  { href: "/farmers", labelKey: "nav.farmers" },
  { href: "/public", labelKey: "nav.public" },
  { href: "/roadmap", labelKey: "nav.roadmap" },
  { href: "/contact", labelKey: "nav.contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1a1a1a]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-500">
            <Sprout className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif text-lg font-semibold text-white">Harvest-Guard</span>
        </Link>

        {/* Desktop Navigation - centered */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, 6).map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                index === 0 ? "bg-white/10 text-white" : "text-white/70 hover:text-white",
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <button className="p-2 text-white/70 hover:text-white transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/login">
            <Button size="sm" className="rounded-full bg-white text-[#1a1a1a] hover:bg-white/90 font-medium">
              {t("nav.login")}
            </Button>
          </Link>
          <button className="p-2 text-white/70 hover:text-white transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            className="rounded-lg p-2 text-white hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden bg-[#1a1a1a] border-t border-white/10 transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[600px]" : "max-h-0",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full bg-white text-[#1a1a1a] hover:bg-white/90">
                {t("nav.login")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
