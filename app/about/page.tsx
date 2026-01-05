import { AboutHero } from "@/components/about-hero"
import { AboutStory } from "@/components/about-story"
import { AboutProcess } from "@/components/about-process"
import { AboutValues } from "@/components/about-values"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutProcess />
      <AboutValues />
    </div>
  )
}
