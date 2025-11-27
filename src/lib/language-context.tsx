import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "bn"

interface Translations {
  [key: string]: {
    en: string
    bn: string
  }
}

export const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", bn: "হোম" },
  "nav.about": { en: "About", bn: "আমাদের সম্পর্কে" },
  "nav.problem": { en: "Problem", bn: "সমস্যা" },
  "nav.approach": { en: "Our Approach", bn: "আমাদের পদ্ধতি" },
  "nav.dashboard": { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  "nav.chatbot": { en: "AI Chatbot", bn: "এআই চ্যাটবট" },
  "nav.farmers": { en: "For Farmers", bn: "কৃষকদের জন্য" },
  "nav.public": { en: "For Public", bn: "জনগণের জন্য" },
  "nav.roadmap": { en: "Roadmap", bn: "রোডম্যাপ" },
  "nav.contact": { en: "Contact", bn: "যোগাযোগ" },
  "nav.login": { en: "Login", bn: "লগইন" },
  "nav.getInvolved": { en: "Get Involved", bn: "যুক্ত হোন" },

  // Hero Section
  "hero.badge": { en: "Supporting SDG 12.3", bn: "SDG 12.3 সমর্থনে" },
  "hero.title1": { en: "Save the Harvest.", bn: "ফসল বাঁচান।" },
  "hero.title2": { en: "Secure the Future.", bn: "ভবিষ্যত সুরক্ষিত করুন।" },
  "hero.description": {
    en: "Reducing food loss in Bangladesh through technology, awareness, and farmer support. Together, we can protect millions of tonnes of food and secure livelihoods.",
    bn: "প্রযুক্তি, সচেতনতা এবং কৃষক সহায়তার মাধ্যমে বাংলাদেশে খাদ্য অপচয় হ্রাস করছি। একসাথে, আমরা লক্ষ লক্ষ টন খাদ্য রক্ষা করতে পারি।",
  },
  "hero.getStarted": { en: "Get Started", bn: "শুরু করুন" },
  "hero.learnMore": { en: "Learn More", bn: "আরও জানুন" },

  // Stats
  "stats.foodLost": { en: "Tonnes Food Lost Yearly", bn: "টন খাদ্য বার্ষিক অপচয়" },
  "stats.economicLoss": { en: "Economic Loss", bn: "অর্থনৈতিক ক্ষতি" },
  "stats.postHarvestLoss": { en: "Post-Harvest Loss", bn: "ফসল তোলার পর ক্ষতি" },
  "stats.peopleAffected": { en: "People Affected", bn: "প্রভাবিত মানুষ" },

  // Problem Section
  "problem.label": { en: "The Challenge", bn: "চ্যালেঞ্জ" },
  "problem.title": {
    en: "Bangladesh Loses Millions of Tonnes of Food Every Year",
    bn: "বাংলাদেশে প্রতি বছর লক্ষ লক্ষ টন খাদ্য অপচয় হয়",
  },
  "problem.description": {
    en: "From farm to table, food loss occurs at every stage of the supply chain — during harvesting, storage, transportation, and distribution.",
    bn: "খামার থেকে টেবিল পর্যন্ত, সরবরাহ শৃঙ্খলের প্রতিটি পর্যায়ে খাদ্য অপচয় হয় — ফসল কাটা, সংরক্ষণ, পরিবহন এবং বিতরণের সময়।",
  },
  "problem.point1": { en: "12-32% of staple crops lost post-harvest", bn: "১২-৩২% প্রধান ফসল ফসল কাটার পর নষ্ট হয়" },
  "problem.point2": { en: "Inadequate storage facilities and cold chains", bn: "অপর্যাপ্ত সংরক্ষণ সুবিধা এবং কোল্ড চেইন" },
  "problem.point3": { en: "Limited access to market information", bn: "বাজার তথ্যে সীমিত প্রবেশাধিকার" },
  "problem.point4": { en: "Climate unpredictability affecting harvests", bn: "জলবায়ু অনিশ্চয়তা ফসলকে প্রভাবিত করছে" },
  "problem.learnMore": { en: "Learn About the Problem", bn: "সমস্যা সম্পর্কে জানুন" },

  // Features Section
  "features.label": { en: "Our Solutions", bn: "আমাদের সমাধান" },
  "features.title": { en: "How We Help Reduce Food Loss", bn: "আমরা কিভাবে খাদ্য অপচয় কমাতে সাহায্য করি" },
  "features.description": {
    en: "Comprehensive tools and resources designed to support farmers and stakeholders across the food supply chain.",
    bn: "খাদ্য সরবরাহ শৃঙ্খল জুড়ে কৃষক এবং স্টেকহোল্ডারদের সহায়তা করার জন্য ডিজাইন করা ব্যাপক সরঞ্জাম এবং সংস্থান।",
  },
  "features.weather.title": { en: "Weather Forecasting", bn: "আবহাওয়ার পূর্বাভাস" },
  "features.weather.desc": {
    en: "Get accurate weather forecasts to plan harvesting and storage activities effectively.",
    bn: "ফসল কাটা এবং সংরক্ষণ কার্যক্রম কার্যকরভাবে পরিকল্পনা করতে সঠিক আবহাওয়ার পূর্বাভাস পান।",
  },
  "features.chatbot.title": { en: "AI Chatbot Support", bn: "এআই চ্যাটবট সহায়তা" },
  "features.chatbot.desc": {
    en: "24/7 AI-powered assistance for crop health, storage advice, and spoilage detection.",
    bn: "ফসলের স্বাস্থ্য, সংরক্ষণ পরামর্শ এবং পচন সনাক্তকরণের জন্য ২৪/৭ এআই-চালিত সহায়তা।",
  },
  "features.storage.title": { en: "Storage Advisory", bn: "সংরক্ষণ পরামর্শ" },
  "features.storage.desc": {
    en: "Best practices for post-harvest storage to minimize spoilage and maximize quality.",
    bn: "পচন কমাতে এবং গুণমান সর্বাধিক করতে ফসল কাটার পরের সংরক্ষণের সর্বোত্তম অনুশীলন।",
  },
  "features.supply.title": { en: "Supply Chain Guidance", bn: "সরবরাহ শৃঙ্খল নির্দেশিকা" },
  "features.supply.desc": {
    en: "Optimize transportation and distribution to reduce losses during transit.",
    bn: "পরিবহনের সময় ক্ষতি কমাতে পরিবহন এবং বিতরণ অপ্টিমাইজ করুন।",
  },
  "features.education.title": { en: "Educational Resources", bn: "শিক্ষামূলক সংস্থান" },
  "features.education.desc": {
    en: "Access training materials and guides on modern farming and storage techniques.",
    bn: "আধুনিক চাষ এবং সংরক্ষণ কৌশলের প্রশিক্ষণ সামগ্রী এবং গাইড অ্যাক্সেস করুন।",
  },
  "features.community.title": { en: "Community Network", bn: "কমিউনিটি নেটওয়ার্ক" },
  "features.community.desc": {
    en: "Connect with other farmers and experts for knowledge sharing and collaboration.",
    bn: "জ্ঞান ভাগাভাগি এবং সহযোগিতার জন্য অন্যান্য কৃষক এবং বিশেষজ্ঞদের সাথে সংযোগ করুন।",
  },
  "features.explore": { en: "Explore Our Approach", bn: "আমাদের পদ্ধতি অন্বেষণ করুন" },

  // Dashboard Section
  "dashboard.label": { en: "Tools & Resources", bn: "সরঞ্জাম ও সংস্থান" },
  "dashboard.title": { en: "Your Personalized Farmer Dashboard", bn: "আপনার ব্যক্তিগত কৃষক ড্যাশবোর্ড" },
  "dashboard.description": {
    en: "Access weather forecasts, storage tips, market prices, and AI-powered support — all in one place.",
    bn: "আবহাওয়ার পূর্বাভাস, সংরক্ষণ টিপস, বাজার দর এবং এআই-চালিত সহায়তা অ্যাক্সেস করুন — সব এক জায়গায়।",
  },
  "dashboard.weather": { en: "Real-time weather alerts", bn: "রিয়েল-টাইম আবহাওয়া সতর্কতা" },
  "dashboard.crop": { en: "Crop-specific guidance", bn: "ফসল-নির্দিষ্ট নির্দেশিকা" },
  "dashboard.market": { en: "Market price updates", bn: "বাজার দরের আপডেট" },
  "dashboard.storage": { en: "Storage best practices", bn: "সংরক্ষণের সর্বোত্তম অনুশীলন" },
  "dashboard.tryDemo": { en: "Try Dashboard Demo", bn: "ড্যাশবোর্ড ডেমো দেখুন" },

  // Testimonials
  "testimonials.label": { en: "Success Stories", bn: "সাফল্যের গল্প" },
  "testimonials.title": { en: "Farmers Who Saved Their Harvest", bn: "কৃষক যারা তাদের ফসল রক্ষা করেছেন" },

  // CTA Section
  "cta.title": {
    en: "Join Us in Securing Bangladesh's Food Future",
    bn: "বাংলাদেশের খাদ্য ভবিষ্যত সুরক্ষিত করতে আমাদের সাথে যোগ দিন",
  },
  "cta.description": {
    en: "Whether you're a farmer seeking support or someone who wants to make a difference, there's a place for you in our mission.",
    bn: "আপনি সহায়তা খুঁজছেন এমন কৃষক হোন বা পরিবর্তন আনতে চান এমন কেউ, আমাদের মিশনে আপনার জন্য জায়গা আছে।",
  },
  "cta.farmer": { en: "I'm a Farmer", bn: "আমি কৃষক" },
  "cta.help": { en: "I Want to Help", bn: "আমি সাহায্য করতে চাই" },

  // Footer
  "footer.description": {
    en: "Reducing food loss in Bangladesh through technology, awareness, and farmer support. Together, we secure the harvest.",
    bn: "প্রযুক্তি, সচেতনতা এবং কৃষক সহায়তার মাধ্যমে বাংলাদেশে খাদ্য অপচয় কমাচ্ছি। একসাথে, আমরা ফসল সুরক্ষিত করি।",
  },
  "footer.quickLinks": { en: "Quick Links", bn: "দ্রুত লিঙ্ক" },
  "footer.resources": { en: "Resources", bn: "সংস্থান" },
  "footer.contactUs": { en: "Contact Us", bn: "যোগাযোগ করুন" },
  "footer.rights": { en: "All rights reserved.", bn: "সর্বস্বত্ব সংরক্ষিত।" },
  "footer.sdg": { en: "Supporting SDG 12.3 - Reduce Food Loss & Waste", bn: "SDG 12.3 সমর্থন - খাদ্য অপচয় ও অপব্যয় হ্রাস" },

  // Language toggle
  "lang.switch": { en: "বাংলা", bn: "English" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "bn")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
