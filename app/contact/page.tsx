"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@harvest-guard.org",
    href: "mailto:info@harvest-guard.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1XXX-XXXXXX",
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
]

const involvementOptions = [
  {
    icon: Heart,
    title: "Donate",
    description: "Support our mission with a contribution",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Join our team and make a difference",
  },
  {
    icon: Briefcase,
    title: "Partner",
    description: "Collaborate with us as an organization",
  },
  {
    icon: MessageSquare,
    title: "General Inquiry",
    description: "Ask questions or share feedback",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#2D5016] py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "url('/placeholder.svg?height=600&width=1600')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-[#E8A838]/20 px-4 py-1.5 text-sm font-medium text-[#E8A838]">
              Get In Touch
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Have questions, want to get involved, or need support? We'd love to hear from you. Reach out through any
              of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2D5016]/10">
                    <CheckCircle className="h-8 w-8 text-[#2D5016]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D5016]">Thank You!</h3>
                  <p className="mt-2 text-[#8B7355]">
                    Your message has been received. We'll get back to you within 24-48 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 bg-[#2D5016] text-white hover:bg-[#2D5016]/90"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="mb-6 font-serif text-2xl font-bold text-[#2D5016]">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#2D5016]">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#2D5016]">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#2D5016]">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                          placeholder="+880 1XXX-XXXXXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#2D5016]">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D5016] focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                        >
                          <option>General Inquiry</option>
                          <option>Donation</option>
                          <option>Volunteering</option>
                          <option>Partnership</option>
                          <option>Farmer Support</option>
                          <option>Technical Support</option>
                          <option>Media Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#2D5016]">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full resize-none rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-[#2D5016] text-white hover:bg-[#2D5016]/90">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info & Options */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-8">
                <h2 className="mb-6 font-serif text-2xl font-bold text-[#2D5016]">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 rounded-lg bg-[#FAF8F5] p-4 transition-colors hover:bg-[#2D5016]/5"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D5016]/10">
                        <item.icon className="h-6 w-6 text-[#2D5016]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#8B7355]">{item.label}</p>
                        <p className="font-medium text-[#2D5016]">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-6 border-t border-[#2D5016]/10 pt-6">
                  <p className="mb-4 text-sm font-medium text-[#8B7355]">Follow us on social media</p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5016]/10 text-[#2D5016] transition-colors hover:bg-[#E8A838] hover:text-white"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5016]/10 text-[#2D5016] transition-colors hover:bg-[#E8A838] hover:text-white"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5016]/10 text-[#2D5016] transition-colors hover:bg-[#E8A838] hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Ways to Get Involved */}
              <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-8">
                <h2 className="mb-6 font-serif text-2xl font-bold text-[#2D5016]">Ways to Get Involved</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {involvementOptions.map((option, index) => (
                    <div key={index} className="rounded-lg border border-[#2D5016]/10 bg-[#FAF8F5] p-4">
                      <option.icon className="mb-2 h-6 w-6 text-[#E8A838]" />
                      <h3 className="font-semibold text-[#2D5016]">{option.title}</h3>
                      <p className="mt-1 text-xs text-[#8B7355]">{option.description}</p>
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
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/placeholder.svg?height=400&width=1200"
              alt="Location map"
              className="h-64 w-full object-cover lg:h-80"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
