import { Shield, Truck, RotateCcw, Star } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Secure Payment",
    desc: "SSL encrypted",
    color: "text-green-600",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "2-3 business days",
    color: "text-blue-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "30-day policy",
    color: "text-purple-600",
  },
  {
    icon: Star,
    title: "Top Rated",
    desc: "4.8/5 stars",
    color: "text-yellow-600",
  },
];

export default function TrustSignals() {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6">
      {items.map(({ icon: Icon, title, desc, color }) => (
        <div
          key={title}
          className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
        >
          <Icon className={`w-6 h-6 ${color}`} />
          <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-xs text-gray-600">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
