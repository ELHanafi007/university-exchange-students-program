'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Define proper interfaces
interface Solution {
  title: string;
  description: string;
  action: string;
  stat: string;
  statLabel: string;
}

interface Testimonial {
  quote: string;
  student: string;
  outcome: string;
}

interface BarrierData {
  id: string;
  title: string;
  myth: string;
  reality: string;
  solutions: Solution[];
  testimonial: Testimonial;
}

const barriersData: BarrierData[] = [
  {
    id: 'financial',
    title: "💰 Financial Barriers",
    myth: "I can&apos;t afford to study abroad",
    reality: "87% of eligible students qualify for scholarships they never apply for",
    solutions: [
      {
        title: "Hidden Scholarship Calculator",
        description: "Most students miss 3-5 scholarships they&apos;re automatically eligible for",
        action: "Check your instant eligibility score",
        stat: "$8,500",
        statLabel: "Average uncovered funding per student"
      },
      {
        title: "Cost-Neutral Programs", 
        description: "Exchange programs where you pay your home university tuition",
        action: "Discover tuition-swap options",
        stat: "40%",
        statLabel: "Programs with no extra tuition"
      },
      {
        title: "Strategic Destination Matching",
        description: "Countries where living costs are lower than your current city",
        action: "Find cheaper-than-home destinations", 
        stat: "25+",
        statLabel: "Cities cheaper than campus life"
      }
    ],
    testimonial: {
      quote: "I thought I needed to be rich. Turns out I just needed to apply. The scholarships covered everything.",
      student: "Jessica, Engineering → South Korea",
      outcome: "Graduated debt-free with job offers from 3 multinationals"
    }
  },
  {
    id: 'academic',
    title: "📚 Academic Concerns", 
    myth: "It will delay my graduation",
    reality: "94% of exchange students graduate on time or early with better grades",
    solutions: [
      {
        title: "Credit Transfer Guarantee",
        description: "Pre-approved course equivalencies before you apply",
        action: "See guaranteed credit matches",
        stat: "100%",
        statLabel: "Credit transfer success rate"
      },
      {
        title: "Accelerated Programs",
        description: "Summer/winter intensives that count as full semesters",
        action: "Explore fast-track options",
        stat: "6-8",
        statLabel: "Weeks for full semester credit"
      },
      {
        title: "Research Opportunities", 
        description: "Access to facilities and mentors unavailable locally",
        action: "Find research partnerships",
        stat: "3x",
        statLabel: "More publication opportunities"
      }
    ],
    testimonial: {
      quote: "I actually graduated early because the research I did abroad counted for two capstone projects.",
      student: "Michael, Biology → Germany", 
      outcome: "Published paper led to PhD admission at MIT"
    }
  },
  {
    id: 'confidence',
    title: "😰 Confidence Gap",
    myth: "I&apos;m not good enough for competitive programs",
    reality: "Programs are designed for students exactly like you - they need diversity, not perfection",
    solutions: [
      {
        title: "Automatic Qualification Check",
        description: "Real-time assessment of your actual eligibility vs perceived barriers",
        action: "Take the 2-min reality check",
        stat: "85%",
        statLabel: "Of &apos;unqualified&apos; students actually qualify"
      },
      {
        title: "Peer Matching System",
        description: "Connect with students who had the same doubts and succeeded",
        action: "Meet your doubt-busting buddy",
        stat: "92%",
        statLabel: "Report increased confidence after matching"
      },
      {
        title: "Application Bootcamp",
        description: "Step-by-step guidance from current exchange students",
        action: "Join free workshop",
        stat: "3.5x",
        statLabel: "Higher acceptance rate with coaching"
      }
    ],
    testimonial: {
      quote: "I almost didn&apos;t apply because I thought my grades were too average. Turns out they wanted my unique perspective, not perfect scores.",
      student: "Sarah, Business → Singapore",
      outcome: "Now working as cultural consultant for Fortune 500 companies"
    }
  },
  {
    id: 'family',
    title: "👪 Family Concerns",
    myth: "My family won&apos;t support me going so far away",
    reality: "Families become the biggest supporters once they understand the safety nets and benefits",
    solutions: [
      {
        title: "Family Orientation Portal",
        description: "Dedicated resources to address parental concerns directly",
        action: "Share with your family",
        stat: "78%",
        statLabel: "Parental approval after information"
      },
      {
        title: "24/7 Support Guarantee",
        description: "Round-the-clock emergency contacts and on-ground support",
        action: "See safety protocols",
        stat: "15min",
        statLabel: "Average emergency response time"
      },
      {
        title: "Cultural Bridge Programs", 
        description: "Pre-departure cultural training for students and families",
        action: "Access family resources",
        stat: "100+",
        statLabel: "Families connected monthly"
      }
    ],
    testimonial: {
      quote: "My parents were terrified until they saw the support system. Now they brag about me to everyone.",
      student: "Carlos, Medicine → Australia",
      outcome: "Family started hosting international students themselves"
    }
  }
]

function SolutionCard({ solution, index, isActive }: { solution: Solution; index: number; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-cyan-50 border-cyan-400 shadow-lg shadow-cyan-500/20' 
          : 'bg-gray-50 border-gray-200 hover:border-cyan-400'
      }`}
    >
      <h4 className="text-gray-900 font-bold text-lg mb-2">{solution.title}</h4>
      <p className="text-gray-700 text-sm mb-4">{solution.description}</p>
      <div className="flex items-center justify-between">
        <button className="text-cyan-600 text-sm font-medium hover:text-cyan-500 transition-colors">
          {solution.action} →
        </button>
        <div className="text-right">
          <div className="text-gray-900 font-bold text-xl">{solution.stat}</div>
          <div className="text-gray-600 text-xs">{solution.statLabel}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function BarrierDeconstruction() {
  const [activeBarrier, setActiveBarrier] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const currentBarrier = barriersData[activeBarrier]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            The <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Real Barriers</span> 
            <br />And How to Smash Through Them
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every barrier has a solution. We&apos;ve helped thousands of students overcome these exact concerns 
            and unlock life-changing opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* Left Column - Barrier Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Which barrier feels most real to you?</h3>
            
            {barriersData.map((barrier, index) => (
              <motion.button
                key={barrier.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setActiveBarrier(index)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  activeBarrier === index
                    ? 'bg-cyan-50 border-cyan-400 shadow-lg'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{barrier.title.split(' ')[0]}</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    activeBarrier === index 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {index + 1}/{barriersData.length}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-red-600 text-sm line-through">Myth: {barrier.myth}</div>
                  <div className="text-green-600 text-sm font-medium">Reality: {barrier.reality}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column - Solutions */}
          <motion.div
            key={activeBarrier}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Solutions Grid */}
            <div className="grid gap-4">
              <h4 className="text-gray-900 text-xl font-bold">Proven Solutions That Work:</h4>
              {currentBarrier.solutions.map((solution: Solution, solutionIndex: number) => (
                <SolutionCard 
                  key={solutionIndex} 
                  solution={solution} 
                  index={solutionIndex}
                  isActive={activeBarrier === solutionIndex}
                />
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
            >
              <div className="text-cyan-500 text-4xl mb-4">"</div>
              <p className="text-gray-900 text-lg italic mb-4">{currentBarrier.testimonial.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-600 font-medium">{currentBarrier.testimonial.student}</div>
                  <div className="text-gray-600 text-sm">{currentBarrier.testimonial.outcome}</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
            >
              🚀 Get Personalized Solutions for Your Situation
            </motion.button>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <div className="flex gap-1">
              {barriersData.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeBarrier ? 'bg-cyan-500 w-6' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-700 text-sm">
              Barrier {activeBarrier + 1} of {barriersData.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}