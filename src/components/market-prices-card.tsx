

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const prices = [
  { cropEn: "Rice (Coarse)", cropBn: "ধান (মোটা)", price: 42, unit: "BDT/kg", change: 2.5, trend: "up" },
  { cropEn: "Rice (Fine)", cropBn: "ধান (চিকন)", price: 58, unit: "BDT/kg", change: -1.2, trend: "down" },
  { cropEn: "Wheat", cropBn: "গম", price: 35, unit: "BDT/kg", change: 0, trend: "stable" },
  { cropEn: "Potato", cropBn: "আলু", price: 28, unit: "BDT/kg", change: 5.0, trend: "up" },
  { cropEn: "Onion", cropBn: "পেঁয়াজ", price: 45, unit: "BDT/kg", change: -3.5, trend: "down" },
]

export function MarketPricesCard() {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-emerald-800">{isEn ? "Market Prices" : "বাজার দর"}</h3>
        <span className="text-xs text-gray-500">{isEn ? "Updated today" : "আজ আপডেট হয়েছে"}</span>
      </div>
      <div className="space-y-3">
        {prices.map((item, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3">
            <div>
              <p className="font-medium text-emerald-800">{isEn ? item.cropEn : item.cropBn}</p>
              <p className="text-xs text-gray-500">{item.unit}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-emerald-800">{item.price}</p>
              <div
                className={`flex items-center justify-end gap-1 text-xs ${
                  item.trend === "up" ? "text-green-600" : item.trend === "down" ? "text-red-500" : "text-gray-500"
                }`}
              >
                {item.trend === "up" && <TrendingUp className="h-3 w-3" />}
                {item.trend === "down" && <TrendingDown className="h-3 w-3" />}
                {item.trend === "stable" && <Minus className="h-3 w-3" />}
                <span>
                  {item.change > 0 ? "+" : ""}
                  {item.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
