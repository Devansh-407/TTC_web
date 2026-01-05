import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gift, Upload, MessageSquare, ShoppingCart } from "lucide-react"

const steps = [
  {
    icon: Gift,
    title: "Choose Gift",
    description: "Select from our curated collection of handcrafted gift categories and styles.",
  },
  {
    icon: Upload,
    title: "Upload Photos",
    description: "Share your favorite memories and photos to personalize your chosen gift.",
  },
  {
    icon: MessageSquare,
    title: "Add Message",
    description: "Include a heartfelt message or special dedication to make it truly meaningful.",
  },
  {
    icon: ShoppingCart,
    title: "Place Order",
    description: "Complete your order and we'll handcraft your perfect gift with love and care.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Create Your Perfect Gift</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to create personalized, meaningful presents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-md">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
