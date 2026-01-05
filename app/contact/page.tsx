import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any questions about our handcrafted gifts.
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+91 6396202262</p>
              <p className="text-gray-500 text-sm">Available 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">tohfacreations3@gmail.com</p>
              <p className="text-gray-500 text-sm">We respond within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">28/476, Gokula Gali Gudri Mansoor Khan</p>
              <p className="text-gray-500 text-sm">Dhuliya Ganj, Agra-282003, Uttar Pradesh</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Looking for something specific?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/gifts">Browse Gifts</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/signin">My Account</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Connect With Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Follow us on social media for inspiration, behind-the-scenes content, and special offers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Facebook, name: "Facebook", followers: "12.5K", color: "bg-blue-500", href: "https://facebook.com/tohfacreations" },
                { icon: Instagram, name: "Instagram", followers: "8.2K", color: "bg-purple-500", href: "https://instagram.com/tohfacreations" },
                { icon: Twitter, name: "Twitter", followers: "5.8K", color: "bg-sky-400", href: "https://twitter.com/tohfacreations" },
                { icon: Linkedin, name: "LinkedIn", followers: "5.1K", color: "bg-blue-600", href: "https://linkedin.com/company/tohfacreations" },
              ].map((social) => (
                <div key={social.name} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 ${social.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <social.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{social.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{social.followers} followers</p>
                  <Button asChild className={`w-full ${social.color} hover:opacity-90 text-white`}>
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      Follow
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Recent Posts Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Recent Posts</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what we've been working on lately
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  image: "/vintage-wooden-jewelry-box-with-rose-patterns.jpg",
                  time: "2 hours ago",
                  text: "Just finished this beautiful custom jewelry box for Sarah's anniversary gift! 🎁",
                  platform: "Instagram"
                },
                {
                  image: "/artisan-workshop-with-craftsperson-working-on-wood.jpg",
                  time: "1 day ago",
                  text: "Behind the scenes: Creating magic one piece at a time in our studio ✨",
                  platform: "Facebook"
                },
                {
                  image: "/leather-photo-album-with-personalized-cover.jpg",
                  time: "3 days ago",
                  text: "Emily's reaction when she received her custom photo album was priceless. 💕",
                  platform: "Instagram"
                },
              ].map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt="Post"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        {post.platform}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">{post.time}</p>
                    <p className="text-gray-700">{post.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
