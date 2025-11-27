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
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 border-emerald-600/20 bg-white/80 text-emerald-800 hover:bg-emerald-50 backdrop-blur-sm"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{t("lang.switch")}</span>
    </Button>
  )
}
