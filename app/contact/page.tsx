"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  CheckCircle,
  Heart,
  Users,
  Briefcase,
  MessageSquare,
} from "lucide-react"

export default function ContactPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const contactInfo = [
    {
      icon: Mail,
      labelEn: "Email",
      labelBn: "ইমেইল",
      value: "info@harvest-guard.org",
      href: "mailto:info@harvest-guard.org",
    },
    { icon: Phone, labelEn: "Phone", labelBn: "ফোন", value: "+880 1XXX-XXXXXX", href: "tel:+8801XXXXXXXXX" },
    { icon: MapPin, labelEn: "Address", labelBn: "ঠিকানা", value: isEn ? "Dhaka, Bangladesh" : "ঢাকা, বাংলাদেশ", href: "#" },
  ]

  const involvementOptions = [
    {
      icon: Heart,
      titleEn: "Donate",
      titleBn: "দান করুন",
      descEn: "Support our mission with a contribution",
      descBn: "একটি অবদান দিয়ে আমাদের মিশন সমর্থন করুন",
    },
    {
      icon: Users,
      titleEn: "Volunteer",
      titleBn: "স্বেচ্ছাসেবক",
      descEn: "Join our team and make a difference",
      descBn: "আমাদের দলে যোগ দিন এবং পার্থক্য তৈরি করুন",
    },
    {
      icon: Briefcase,
      titleEn: "Partner",
      titleBn: "অংশীদার",
      descEn: "Collaborate with us as an organization",
      descBn: "একটি সংস্থা হিসাবে আমাদের সাথে সহযোগিতা করুন",
    },
    {
      icon: MessageSquare,
      titleEn: "General Inquiry",
      titleBn: "সাধারণ জিজ্ঞাসা",
      descEn: "Ask questions or share feedback",
      descBn: "প্রশ্ন করুন বা প্রতিক্রিয়া শেয়ার করুন",
    },
  ]

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20">
          <img src="/placeholder.svg?height=600&width=1600" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300">
              {isEn ? "Get In Touch" : "যোগাযোগ করুন"}
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {isEn ? "Contact Us" : "আমাদের সাথে যোগাযোগ করুন"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {isEn
                ? "Have questions, want to get involved, or need support? We'd love to hear from you."
                : "প্রশ্ন আছে, যুক্ত হতে চান, বা সহায়তা প্রয়োজন? আমরা আপনার কাছ থেকে শুনতে চাই।"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-emerald-800">{isEn ? "Thank You!" : "ধন্যবাদ!"}</h3>
                  <p className="mt-2 text-gray-600">
                    {isEn
                      ? "Your message has been received. We'll get back to you within 24-48 hours."
                      : "আপনার বার্তা পেয়েছি। আমরা ২৪-৪৮ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব।"}
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {isEn ? "Send Another Message" : "আরেকটি বার্তা পাঠান"}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="mb-6 font-serif text-2xl font-bold text-emerald-800">
                    {isEn ? "Send Us a Message" : "আমাদের একটি বার্তা পাঠান"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-emerald-800">
                          {isEn ? "Your Name" : "আপনার নাম"}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          placeholder={isEn ? "Enter your name" : "আপনার নাম লিখুন"}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-emerald-800">
                          {isEn ? "Email Address" : "ইমেইল ঠিকানা"}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-emerald-800">
                          {isEn ? "Phone Number (Optional)" : "ফোন নম্বর (ঐচ্ছিক)"}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          placeholder="+880 1XXX-XXXXXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-emerald-800">
                          {isEn ? "Subject" : "বিষয়"}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        >
                          <option>{isEn ? "General Inquiry" : "সাধারণ জিজ্ঞাসা"}</option>
                          <option>{isEn ? "Donation" : "দান"}</option>
                          <option>{isEn ? "Volunteering" : "স্বেচ্ছাসেবা"}</option>
                          <option>{isEn ? "Partnership" : "অংশীদারিত্ব"}</option>
                          <option>{isEn ? "Farmer Support" : "কৃষক সহায়তা"}</option>
                          <option>{isEn ? "Technical Support" : "প্রযুক্তিগত সহায়তা"}</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-emerald-800">
                        {isEn ? "Your Message" : "আপনার বার্তা"}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full resize-none rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        placeholder={isEn ? "How can we help you?" : "আমরা কিভাবে আপনাকে সাহায্য করতে পারি?"}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                      {isEn ? "Send Message" : "বার্তা পাঠান"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info & Options */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
                <h2 className="mb-6 font-serif text-2xl font-bold text-emerald-800">
                  {isEn ? "Contact Information" : "যোগাযোগের তথ্য"}
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 rounded-lg bg-emerald-50 p-4 transition-colors hover:bg-emerald-100"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                        <item.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{isEn ? item.labelEn : item.labelBn}</p>
                        <p className="font-medium text-emerald-800">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-6 border-t border-emerald-100 pt-6">
                  <p className="mb-4 text-sm font-medium text-gray-500">
                    {isEn ? "Follow us on social media" : "সামাজিক মাধ্যমে আমাদের অনুসরণ করুন"}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors hover:bg-amber-500 hover:text-white"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors hover:bg-amber-500 hover:text-white"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors hover:bg-amber-500 hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Ways to Get Involved */}
              <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
                <h2 className="mb-6 font-serif text-2xl font-bold text-emerald-800">
                  {isEn ? "Ways to Get Involved" : "যুক্ত হওয়ার উপায়"}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {involvementOptions.map((option, index) => (
                    <div key={index} className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                      <option.icon className="mb-2 h-6 w-6 text-amber-500" />
                      <h3 className="font-semibold text-emerald-800">{isEn ? option.titleEn : option.titleBn}</h3>
                      <p className="mt-1 text-xs text-gray-600">{isEn ? option.descEn : option.descBn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img src="/placeholder.svg?height=400&width=1200" alt="" className="h-64 w-full object-cover lg:h-80" />
          </div>
        </div>
      </section>
    </div>
  )
}
