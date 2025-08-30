import { Button } from "@/components/ui/button";
import RatingStars from "./RatingStars";

export default function Reviews() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Reviews
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-gray-900">4.0</div>
            <div>
              <div className="flex items-center mb-1">
                <RatingStars value={4} outOf={5} size={4} />
              </div>
              <p className="text-sm text-gray-600">Based on 127 reviews</p>
            </div>
          </div>
          <Button variant="outline">Write a Review</Button>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">JD</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">John Doe</span>
                <RatingStars value={5} outOf={5} size={4} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "Excellent product quality and fast delivery. Exactly as
                described and works perfectly."
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Verified Purchase • 2 days ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
