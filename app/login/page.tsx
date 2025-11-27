"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Leaf, User, Phone, MapPin, Map, ArrowRight, CheckCircle } from "lucide-react"

const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"]

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    division: "",
    area: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate login/signup
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/dashboard")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D5016]">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-serif text-xl font-semibold text-[#2D5016]">Harvest-Guard</span>
          </Link>

          {/* Header */}
          <h1 className="font-serif text-3xl font-bold text-[#2D5016]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-[#8B7355]">
            {isLogin
              ? "Sign in to access your dashboard and tools."
              : "Register to start protecting your harvest today."}
          </p>

          {/* Toggle */}
          <div className="mt-6 flex rounded-lg bg-[#FAF8F5] p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                isLogin ? "bg-white text-[#2D5016] shadow-sm" : "text-[#8B7355] hover:text-[#2D5016]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                !isLogin ? "bg-white text-[#2D5016] shadow-sm" : "text-[#8B7355] hover:text-[#2D5016]"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#2D5016]">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7355]" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] py-3 pl-12 pr-4 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#2D5016]">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7355]" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] py-3 pl-12 pr-4 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="division" className="mb-2 block text-sm font-medium text-[#2D5016]">
                    Division
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7355]" />
                    <select
                      id="division"
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] py-3 pl-12 pr-4 text-sm text-[#2D5016] focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                    >
                      <option value="">Select your division</option>
                      {divisions.map((division) => (
                        <option key={division} value={division}>
                          {division}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="area" className="mb-2 block text-sm font-medium text-[#2D5016]">
                    District / Area
                  </label>
                  <div className="relative">
                    <Map className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7355]" />
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#2D5016]/20 bg-[#FAF8F5] py-3 pl-12 pr-4 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                      placeholder="Enter your district or area"
                    />
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#2D5016] text-white hover:bg-[#2D5016]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Please wait..."
              ) : isLogin ? (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Benefits */}
          {!isLogin && (
            <div className="mt-8 rounded-lg bg-[#FAF8F5] p-4">
              <p className="mb-3 text-sm font-medium text-[#2D5016]">What you'll get:</p>
              <ul className="space-y-2">
                {[
                  "Personalized weather forecasts",
                  "AI-powered crop advice",
                  "Storage & market tips",
                  "Community support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#8B7355]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#E8A838]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-[#8B7355]">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden bg-[#2D5016] lg:block lg:w-1/2">
        <div className="relative flex h-full items-center justify-center p-12">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/placeholder.svg?height=1000&width=800"
              alt="Farmer in field"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-lg text-center">
            <h2 className="font-serif text-4xl font-bold text-white">Join Thousands of Farmers</h2>
            <p className="mt-4 text-lg text-white/80">
              Access free tools, get expert advice, and connect with a community dedicated to reducing food loss in
              Bangladesh.
            </p>
            <div className="mt-8 flex justify-center gap-8">
              <div>
                <p className="font-serif text-4xl font-bold text-[#E8A838]">5,000+</p>
                <p className="text-sm text-white/70">Registered Farmers</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold text-[#E8A838]">8</p>
                <p className="text-sm text-white/70">Districts Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
