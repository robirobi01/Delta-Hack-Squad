import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const prices = [
  { crop: "Rice (Coarse)", price: 42, unit: "BDT/kg", change: 2.5, trend: "up" },
  { crop: "Rice (Fine)", price: 58, unit: "BDT/kg", change: -1.2, trend: "down" },
  { crop: "Wheat", price: 35, unit: "BDT/kg", change: 0, trend: "stable" },
  { crop: "Potato", price: 28, unit: "BDT/kg", change: 5.0, trend: "up" },
  { crop: "Onion", price: 45, unit: "BDT/kg", change: -3.5, trend: "down" },
]

export function MarketPricesCard() {
  return (
    <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-[#2D5016]">Market Prices</h3>
        <span className="text-xs text-[#8B7355]">Updated today</span>
      </div>
      <div className="space-y-3">
        {prices.map((item, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg bg-[#FAF8F5] px-4 py-3">
            <div>
              <p className="font-medium text-[#2D5016]">{item.crop}</p>
              <p className="text-xs text-[#8B7355]">{item.unit}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#2D5016]">{item.price}</p>
              <div
                className={`flex items-center justify-end gap-1 text-xs ${
                  item.trend === "up" ? "text-green-600" : item.trend === "down" ? "text-red-500" : "text-[#8B7355]"
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
