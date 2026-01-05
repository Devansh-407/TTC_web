import { Button } from "@/components/ui/button"
import { Phone, Gift, Headphones } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
        <p className="text-gray-600 text-sm mb-4">
          Have questions about our products or services? Our friendly team is ready to help.
        </p>
        <p className="font-medium text-gray-900 mb-1">+91 6396202262</p>
        <p className="text-sm text-gray-600 mb-4">tohfacreations3@gmail.com</p>
        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">Call Now</Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Orders</h3>
        <p className="text-gray-600 text-sm mb-4">
          Ready to create something special? Let's discuss your custom gift ideas and bring them to life.
        </p>
        <p className="font-medium text-gray-900 mb-1">Custom Design Team</p>
        <p className="text-sm text-gray-600 mb-4">tohfacreations3@gmail.com</p>
        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">Start Project</Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Headphones className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Support</h3>
        <p className="text-gray-600 text-sm mb-4">
          Need help with an existing order or have concerns? Our support team is here for you.
        </p>
        <p className="font-medium text-gray-900 mb-1">24/7 Live Chat</p>
        <p className="text-sm text-gray-600 mb-4">tohfacreations3@gmail.com</p>
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Get Help</Button>
      </div>
    </div>
  )
}
