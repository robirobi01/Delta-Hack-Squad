"use client"

import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium text-sm">{t("lang.switch")}</span>
    </Button>
  )
}
