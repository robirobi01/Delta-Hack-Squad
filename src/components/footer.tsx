import { Link } from "react-router-dom"
import { Sprout, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { href: "/about", labelKey: "nav.about" },
    { href: "/problem", labelKey: "nav.problem" },
    { href: "/approach", labelKey: "nav.approach" },
    { href: "/dashboard", labelKey: "nav.dashboard" },
    { href: "/chatbot", labelKey: "nav.chatbot" },
  ]

  const resourceLinks = [
    { href: "/farmers", labelKey: "nav.farmers" },
    { href: "/public", labelKey: "nav.public" },
    { href: "/roadmap", labelKey: "nav.roadmap" },
    { href: "/contact", labelKey: "nav.contact" },
    { href: "/login", labelKey: "nav.login" },
  ]

  return (
    <footer className="border-t border-emerald-600/10 bg-gradient-to-b from-emerald-900 to-emerald-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-white">Harvest-Guard</span>
                <span className="text-[10px] font-medium text-emerald-300">ফসল রক্ষা বাংলাদেশ</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-emerald-100/70">{t("footer.description")}</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-amber-500 hover:scale-110"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-emerald-100/70 transition-colors hover:text-amber-400">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t("footer.resources")}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-emerald-100/70 transition-colors hover:text-amber-400">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm text-emerald-100/70">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm text-emerald-100/70">+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm text-emerald-100/70">info@harvest-guard.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-emerald-100/60">
              © {new Date().getFullYear()} Harvest-Guard Bangladesh. {t("footer.rights")}
            </p>
            <p className="text-sm text-emerald-100/60">{t("footer.sdg")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
