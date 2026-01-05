import Image from "next/image"

const team = [
  {
    name: "Sarah Martinez",
    role: "Founder & Creative Director",
    bio: "With 10 years in design and a passion for storytelling, Sarah leads our creative vision and ensures every gift captures the perfect emotion.",
    image: "/female-designer-headshot.png",
  },
  {
    name: "Michael Chen",
    role: "Master Craftsman",
    bio: "A third-generation woodworker and artisan specialist, Michael brings traditional techniques and modern innovation to every handcrafted piece.",
    image: "/male-craftsman-headshot.png",
  },
  {
    name: "Emma Thompson",
    role: "Personalization Specialist",
    bio: "Expert in calligraphy and custom design, Emma transforms your personal memories and moments into beautiful, artistic statements.",
    image: "/professional-headshot-of-female-quality-specialist.jpg",
  },
  {
    name: "David Rodriguez",
    role: "Quality Assurance Manager",
    bio: "With an eye for perfection, David ensures every gift meets our highest standards before reaching your loved ones.",
    image: "/professional-headshot-of-male-engraver.jpg",
  },
]

export function AboutTeam() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Talented Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our passionate artisans bring decades of combined experience in crafting meaningful, personalized gifts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center bg-white rounded-lg">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image 
                  src={member.image || "/placeholder.svg"} 
                  alt={member.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-purple-500 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
