"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Sprout } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full border-b border-emerald-600/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/20">
            <Sprout className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-emerald-800">Harvest-Guard</span>
            <span className="text-[10px] font-medium text-emerald-600/70">ফসল রক্ষা বাংলাদেশ</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, 8).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Link href="/login">
            <Button
              variant="outline"
              className="border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              {t("nav.login")}
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25">
              {t("nav.getInvolved")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            className="rounded-lg p-2 text-emerald-700 hover:bg-emerald-50"
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
          "overflow-hidden border-t border-emerald-600/10 bg-white transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[600px]" : "max-h-0",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => setIsOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full border-emerald-600/30 text-emerald-700 bg-transparent">
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                {t("nav.getInvolved")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
