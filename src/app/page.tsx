import { PsychologicalHero } from '@/components/psychological-hero'
import { PsychologicalSurvey } from '@/components/psychological-survey'
import { BarrierDeconstruction } from '@/components/barrier-deconstruction'
import { UltimateNavbar } from '@/components/NavBar'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Add the navbar */}
      <UltimateNavbar />
      
      <PsychologicalHero />
      <PsychologicalSurvey />
      <BarrierDeconstruction />
      
      {/* Next sections will be added here */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">More Transformative Sections Coming</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {[
              { icon: "🌟", title: "Success Stories", desc: "Real student transformations" },
              { icon: "💎", title: "Benefits Deep Dive", desc: "Career & personal ROI" },
              { icon: "🗺️", title: "Destination Explorer", desc: "Interactive country matching" },
              { icon: "🎯", title: "Application Mastery", desc: "Step-by-step guidance" }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Credit */}
      <footer className="py-6 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            Developed by <span className="text-cyan-400 font-medium">YaRa</span>
          </p>
        </div>
      </footer>
    </main>
  )
}