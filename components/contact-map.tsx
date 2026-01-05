import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"

export function ContactMap() {
  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="relative">
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-gray-600 z-10">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Interactive Map</p>
              <p className="text-sm">123 Craft Street, Art District</p>
              <p className="text-sm">Mumbai, Maharashtra 400001</p>
            </div>
            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
              Get Directions <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Studio Details */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Studio</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-medium">The Tohfa Creations</p>
                <p className="text-gray-600">28/476, Gokula Gali Gudri Mansoor Khan</p>
                <p className="text-gray-600">Dhuliya Ganj, Agra-282003, Uttar Pradesh</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-medium">+91 6396202262</p>
                <p className="text-gray-600 text-sm">Call for appointments</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-medium">tohfacreations3@gmail.com</p>
                <p className="text-gray-600 text-sm">We respond within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Business Hours</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium">Closed</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span>Holiday Hours:</span>
                <span className="text-gray-600 text-sm">May vary - call ahead</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Studio Visits</h3>
            <p className="text-gray-700 mb-3">We welcome visitors to our studio! Schedule an appointment to:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>See our crafting process</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Discuss custom projects in person</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Browse our material samples</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Meet our artisan team</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
