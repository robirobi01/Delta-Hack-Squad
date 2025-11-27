import { AlertTriangle, CheckCircle, Info, Bell } from "lucide-react"

const alerts = [
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Heavy Rain Warning",
    message: "Heavy rainfall expected Thursday. Secure stored grains.",
    time: "2 hours ago",
  },
  {
    type: "info",
    icon: Info,
    title: "Market Update",
    message: "Rice prices up 5% in Dhaka wholesale markets.",
    time: "5 hours ago",
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Drying Complete",
    message: "Optimal drying conditions for next 3 days.",
    time: "1 day ago",
  },
]

const typeStyles = {
  warning: "border-[#E8A838] bg-[#E8A838]/10 text-[#E8A838]",
  info: "border-blue-500 bg-blue-50 text-blue-500",
  success: "border-[#2D5016] bg-[#2D5016]/10 text-[#2D5016]",
}

export function AlertsCard() {
  return (
    <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-[#2D5016]">Recent Alerts</h3>
        <div className="relative">
          <Bell className="h-5 w-5 text-[#8B7355]" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E8A838] text-[10px] font-bold text-white">
            3
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 rounded-lg border-l-4 p-3 ${typeStyles[alert.type as keyof typeof typeStyles]}`}
          >
            <alert.icon className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#2D5016]">{alert.title}</p>
              <p className="text-xs text-[#8B7355]">{alert.message}</p>
              <p className="mt-1 text-xs text-[#8B7355]/70">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
