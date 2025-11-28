
import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Sprout, User, Phone, MapPin, Map, ArrowRight, CheckCircle, Lock, Mail } from "lucide-react"
import gatherImg from "/img/gather.png"

const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"]
const divisionsBn = ["বরিশাল", "চট্টগ্রাম", "ঢাকা", "খুলনা", "ময়মনসিংহ", "রাজশাহী", "রংপুর", "সিলেট"]

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export default function LoginPage() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const isEn = language === "en"

  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: "", phone: "", password: "", division: "", area: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const email = `${formData.phone}@harvestguard.com`

      if (isLogin) {
        // Login
        if (!formData.phone || !formData.password) {
          alert(isEn ? "Please enter phone and password" : "অনুগ্রহ করে ফোন এবং পাসওয়ার্ড লিখুন")
          setIsSubmitting(false)
          return
        }
        await signInWithEmailAndPassword(auth, email, formData.password)
      } else {
        // Registration
        if (!formData.name || !formData.phone || !formData.password || !formData.division || !formData.area) {
          alert(isEn ? "Please fill all fields" : "অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন")
          setIsSubmitting(false)
          return
        }

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, formData.password)
        const user = userCredential.user

        // Store user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          phone: formData.phone,
          division: formData.division,
          area: formData.area,
          createdAt: new Date().toISOString()
        })
      }

      // Redirect to dashboard
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Auth error:", error)
      let errorMessage = isEn ? "Authentication failed" : "প্রমাণীকরণ ব্যর্থ হয়েছে"

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = isEn ? "Invalid phone or password" : "ভুল ফোন বা পাসওয়ার্ড"
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = isEn ? "User already exists" : "ব্যবহারকারী ইতিমধ্যে বিদ্যমান"
      } else if (error.code === 'auth/weak-password') {
        errorMessage = isEn ? "Password should be at least 6 characters" : "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
      }

      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGmailLogin = () => {
    alert(isEn
      ? "Gmail login will be available soon!"
      : "জিমেইল লগইন শীঘ্রই উপলব্ধ হবে!")
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
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <span className="font-serif text-xl font-semibold text-emerald-800">Harvest-Guard</span>
          </Link>

          {/* Header */}
          <h1 className="font-serif text-3xl font-bold text-emerald-800">
            {isLogin ? (isEn ? "Welcome Back" : "স্বাগতম") : isEn ? "Create Account" : "অ্যাকাউন্ট তৈরি করুন"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isLogin
              ? isEn
                ? "Sign in to access your dashboard and tools."
                : "আপনার ড্যাশবোর্ড এবং সরঞ্জাম অ্যাক্সেস করতে সাইন ইন করুন।"
              : isEn
                ? "Register to start protecting your harvest today."
                : "আজই আপনার ফসল রক্ষা করা শুরু করতে নিবন্ধন করুন।"}
          </p>

          {/* Toggle */}
          <div className="mt-6 flex rounded-lg bg-emerald-50 p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${isLogin ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500 hover:text-emerald-700"}`}
            >
              {isEn ? "Sign In" : "সাইন ইন"}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${!isLogin ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500 hover:text-emerald-700"}`}
            >
              {isEn ? "Register" : "নিবন্ধন"}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-emerald-800">
                  {isEn ? "Full Name" : "পুরো নাম"}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-emerald-200 bg-emerald-50 py-3 pl-12 pr-4 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    placeholder={isEn ? "Enter your full name" : "আপনার পুরো নাম লিখুন"}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-emerald-800">
                {isEn ? "Phone Number" : "ফোন নম্বর"}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-emerald-200 bg-emerald-50 py-3 pl-12 pr-4 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-emerald-800">
                {isEn ? "Password" : "পাসওয়ার্ড"}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-emerald-200 bg-emerald-50 py-3 pl-12 pr-4 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  placeholder={isEn ? "Enter your password" : "আপনার পাসওয়ার্ড লিখুন"}
                  minLength={6}
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="division" className="mb-2 block text-sm font-medium text-emerald-800">
                    {isEn ? "Division" : "বিভাগ"}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <select
                      id="division"
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-emerald-200 bg-emerald-50 py-3 pl-12 pr-4 text-sm text-emerald-800 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="">{isEn ? "Select your division" : "আপনার বিভাগ নির্বাচন করুন"}</option>
                      {(isEn ? divisions : divisionsBn).map((division) => (
                        <option key={division} value={division}>
                          {division}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="area" className="mb-2 block text-sm font-medium text-emerald-800">
                    {isEn ? "District / Area" : "জেলা / এলাকা"}
                  </label>
                  <div className="relative">
                    <Map className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-emerald-200 bg-emerald-50 py-3 pl-12 pr-4 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      placeholder={isEn ? "Enter your district or area" : "আপনার জেলা বা এলাকা লিখুন"}
                    />
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                isEn ? (
                  "Please wait..."
                ) : (
                  "অপেক্ষা করুন..."
                )
              ) : isLogin ? (
                <>
                  {isEn ? "Sign In" : "সাইন ইন"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  {isEn ? "Create Account" : "অ্যাকাউন্ট তৈরি করুন"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-emerald-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  {isEn ? "Or continue with" : "অথবা চালিয়ে যান"}
                </span>
              </div>
            </div>

            {/* Gmail Login Button */}
            <button
              type="button"
              onClick={handleGmailLogin}
              className="w-full flex items-center justify-center gap-3 rounded-lg border-2 border-emerald-200 bg-white py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:border-emerald-300"
            >
              <Mail className="h-5 w-5 text-red-500" />
              {isEn ? "Continue with Gmail" : "জিমেইল দিয়ে চালিয়ে যান"}
            </button>
          </form>

          {/* Benefits */}
          {!isLogin && (
            <div className="mt-8 rounded-lg bg-emerald-50 p-4">
              <p className="mb-3 text-sm font-medium text-emerald-800">{isEn ? "What you'll get:" : "আপনি যা পাবেন:"}</p>
              <ul className="space-y-2">
                {(isEn
                  ? [
                    "Personalized weather forecasts",
                    "AI-powered crop advice",
                    "Storage & market tips",
                    "Community support",
                  ]
                  : ["ব্যক্তিগত আবহাওয়া পূর্বাভাস", "এআই-চালিত ফসল পরামর্শ", "সংরক্ষণ ও বাজার টিপস", "সম্প্রদায় সহায়তা"]
                ).map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 shrink-0 text-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            {isEn
              ? "By continuing, you agree to our Terms of Service and Privacy Policy."
              : "চালিয়ে যাওয়ার মাধ্যমে, আপনি আমাদের সেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন।"}
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden bg-gradient-to-br from-emerald-600 to-emerald-800 lg:block lg:w-1/2">
        <div className="relative flex h-full items-center justify-center p-12">
          <div className="absolute inset-0 opacity-20">
            <img src={gatherImg} alt="Farmers gathering" className="h-full w-full object-cover" />
          </div>
          <div className="relative z-10 max-w-lg text-center">
            <h2 className="font-serif text-4xl font-bold text-white">
              {isEn ? "Join Thousands of Farmers" : "হাজার হাজার কৃষকের সাথে যোগ দিন"}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {isEn
                ? "Access free tools, get expert advice, and connect with a community dedicated to reducing food loss in Bangladesh."
                : "বিনামূল্যে সরঞ্জাম অ্যাক্সেস করুন, বিশেষজ্ঞ পরামর্শ পান এবং বাংলাদেশে খাদ্য অপচয় কমাতে নিবেদিত একটি সম্প্রদায়ের সাথে সংযোগ করুন।"}
            </p>
            <div className="mt-8 flex justify-center gap-8">
              <div>
                <p className="font-serif text-4xl font-bold text-amber-400">5,000+</p>
                <p className="text-sm text-white/70">{isEn ? "Registered Farmers" : "নিবন্ধিত কৃষক"}</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold text-amber-400">8</p>
                <p className="text-sm text-white/70">{isEn ? "Districts Covered" : "জেলা কভার করা হয়েছে"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
