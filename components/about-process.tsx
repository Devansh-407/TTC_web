import Image from "next/image"

const processSteps = [
  {
    step: "1",
    title: "Design Consultation",
    description: "We begin with a personal consultation to understand your vision, recipient, and the story you want to tell. Our team helps you choose the perfect style and personalization options.",
    image: "/artisan-workshop-with-craftsperson-working-on-wood.jpg",
  },
  {
    step: "2",
    title: "Material Selection",
    description: "We carefully select premium materials, including archival-quality papers, fine ribbons, and sustainable packaging to ensure your gift is both beautiful and lasting.",
    image: "/artisan-workshop-with-craftsperson-working-on-wood.jpg",
  },
  {
    step: "3",
    title: "Handcrafting",
    description: "Our skilled artisans bring your vision to life through traditional crafting techniques, personal touches, and meticulous attention to every detail of your unique gift.",
    image: "/artisan-workshop-with-craftsperson-working-on-wood.jpg",
  },
  {
    step: "4",
    title: "Quality Assurance",
    description: "Every completed gift undergoes thorough quality inspection to ensure it meets our exacting standards before being carefully packaged and shipped to create the perfect moment.",
    image: "/artisan-workshop-with-craftsperson-working-on-wood.jpg",
  },
]

export function AboutProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Crafting Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From concept to completion, every step is carefully executed with attention to detail and love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {processSteps.map((step) => (
            <div key={step.step} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image 
                    src={step.image || "/placeholder.svg"} 
                    alt={step.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
