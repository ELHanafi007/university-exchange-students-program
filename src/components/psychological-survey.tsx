'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Psychological question bank - each question serves multiple purposes
const psychologicalQuestions = [
  {
    id: 'future-self',
    type: 'visualization',
    question: "Where do you see yourself in 5 years? Be specific about the environment, people, and achievements.",
    subtext: "This helps us understand your aspirations and how international experience could accelerate them.",
    options: [
      {
        text: "Leading a team in a multinational company, traveling frequently for work",
        insight: "high-ambition, global-minded",
        recommendation: "Exchange programs in business hubs like Singapore, London, or New York"
      },
      {
        text: "Conducting groundbreaking research at a prestigious university or lab abroad",
        insight: "academic-focused, research-driven", 
        recommendation: "Research-focused exchanges in Germany, Switzerland, or Japan"
      },
      {
        text: "Running my own startup with an international team and client base",
        insight: "entrepreneurial, risk-tolerant",
        recommendation: "Innovation ecosystems like Silicon Valley, Berlin, or Tel Aviv"
      },
      {
        text: "Working remotely while exploring different cultures and countries",
        insight: "location-independent, experience-seeking",
        recommendation: "Programs with flexible schedules and multiple destination options"
      },
      {
        text: "I haven't thought that far ahead yet - still figuring things out",
        insight: "exploratory, needs guidance",
        recommendation: "Structured programs with strong mentorship and career counseling"
      }
    ]
  },
  {
    id: 'barrier-diagnosis', 
    type: 'obstacle-analysis',
    question: "What's the REAL reason you haven't applied yet? Be brutally honest.",
    subtext: "Identifying the actual barrier is the first step to overcoming it.",
    options: [
      {
        text: "Financial concerns - I'm worried about costs and don't know about funding options",
        insight: "financial-anxiety",
        solution: "Scholarships cover 70%+ of students. We'll show you exactly how to fund it."
      },
      {
        text: "Academic fears - Will credits transfer? Will it delay my graduation?",
        insight: "academic-uncertainty", 
        solution: "98% of credits transfer seamlessly. We have dedicated academic advisors."
      },
      {
        text: "Confidence gap - I don't feel 'good enough' for competitive programs",
        insight: "imposter-syndrome",
        solution: "Most qualified students feel this way. Our acceptance rate is 85% for applicants."
      },
      {
        text: "Family concerns - My family is worried about safety/culture/distance",
        insight: "family-apprehension",
        solution: "We provide family orientation sessions and 24/7 support systems."
      },
      {
        text: "Information overload - The process seems too complicated and overwhelming",
        insight: "analysis-paralysis",
        solution: "We simplify everything into a 3-step process with personal guidance."
      },
      {
        text: "I never seriously considered it an option for someone like me",
        insight: "perception-barrier",
        solution: "You're exactly who these programs are designed for. Let us show you why."
      }
    ]
  },
  {
    id: 'motivation-levers',
    type: 'value-alignment', 
    question: "Which of these outcomes would make the biggest impact on your life?",
    subtext: "This helps us tailor the experience to what matters most to you.",
    options: [
      {
        text: "Building a global professional network that opens doors worldwide",
        insight: "career-acceleration",
        benefit: "Exchange students see 3x more job offers and 25% higher starting salaries"
      },
      {
        text: "Gaining independence and confidence by thriving in a new environment",
        insight: "personal-growth",
        benefit: "97% of students report life-changing personal development"
      },
      {
        text: "Accessing specialized courses and research opportunities unavailable here",
        insight: "academic-enhancement",
        benefit: "Learn from world experts and access cutting-edge facilities"
      },
      {
        text: "Experiencing new cultures and making lifelong international friends",
        insight: "cultural-enrichment", 
        benefit: "Develop cultural intelligence - the #1 skill global employers seek"
      },
      {
        text: "Proving to myself that I can succeed anywhere in the world",
        insight: "self-validation",
        benefit: "Build unshakable confidence that transforms every area of your life"
      }
    ]
  },
  {
    id: 'support-assessment',
    type: 'ecosystem-analysis',
    question: "What kind of support system do you have around this decision?",
    subtext: "Understanding your environment helps us provide the right resources.",
    options: [
      {
        text: "Strong family support - they're excited and encouraging",
        insight: "high-support",
        action: "We'll equip your family with information to become your biggest cheerleaders"
      },
      {
        text: "Mixed reactions - some support, some concerns from family/friends",
        insight: "moderate-support",
        action: "We provide family counseling sessions and success stories to address concerns"
      },
      {
        text: "Lack of understanding - people around me don't see the value",
        insight: "low-support",
        action: "We connect you with alumni who faced similar challenges and succeeded"
      },
      {
        text: "I haven't discussed it seriously with anyone yet",
        insight: "undeclared-intent",
        action: "We help you build a compelling case to present to your support network"
      }
    ]
  },
  {
    id: 'readiness-evaluation',
    type: 'commitment-gauge',
    question: "On a scale of 1-10, how ready are you to take the first step?",
    subtext: "Be honest - this isn't a test, it's a starting point for your journey.",
    options: [
      {
        text: "1-3: Interested but need significant guidance and reassurance",
        insight: "early-contemplation",
        nextStep: "Let's start with our beginner's roadmap and success stories"
      },
      {
        text: "4-6: Seriously considering but have specific questions/concerns", 
        insight: "active-contemplation",
        nextStep: "Perfect! Let's address your specific concerns with personalized solutions"
      },
      {
        text: "7-8: Ready to move forward but need help with the application process",
        insight: "preparation-stage",
        nextStep: "Excellent! We'll guide you through each step of the application"
      },
      {
        text: "9-10: I'm committed and just need the final push to apply",
        insight: "action-ready",
        nextStep: "Outstanding! Let's get your application submitted this week"
      }
    ]
  }
]

// Advanced micro-interactions
function ProgressOrb({ progress, size = 60 }: { progress: number; size?: number }) {
  const pathLength = useMotionValue(0)
  const pathLengthSpring = useSpring(pathLength, { damping: 20, stiffness: 100 })
  
  useEffect(() => {
    pathLength.set(progress)
  }, [progress, pathLength])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <motion.circle
          cx="30"
          cy="30"
          r="28"
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="3"
          pathLength={1}
        />
        <motion.circle
          cx="30"
          cy="30"
          r="28"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={useTransform(pathLengthSpring, v => 1 - v)}
          transform="rotate(-90 30 30)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-900 font-bold text-sm">{Math.round(progress * 100)}%</span>
      </div>
    </div>
  )
}

function InsightBadge({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full"
    >
      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
      <span className="text-cyan-700 text-sm font-medium">{text}</span>
    </motion.div>
  )
}

export function PsychologicalSurvey() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userInsights, setUserInsights] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showInsight, setShowInsight] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef(null)

  const progress = (currentStep / psychologicalQuestions.length) * 100

  const handleAnswer = (optionIndex: number, questionId: string) => {
    setSelectedOption(optionIndex)
    const option = psychologicalQuestions[currentStep].options[optionIndex]
    
    // Add insight to user profile
    if (option.insight && !userInsights.includes(option.insight)) {
      setUserInsights(prev => [...prev, option.insight])
    }

    // Show insight feedback
    setShowInsight(true)
    
    setTimeout(() => {
      setShowInsight(false)
      setSelectedOption(null)
      
      if (currentStep < psychologicalQuestions.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        setIsComplete(true)
      }
    }, 2000)
  }

  if (isComplete) {
    return <TransformationSequence insights={userInsights} />
  }

  const currentQuestion = psychologicalQuestions[currentStep]

  return (
    <section ref={containerRef} className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Advanced Progress System */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-cyan-600 font-medium">Self-Discovery Journey</span>
              <h3 className="text-gray-900 text-xl font-bold mt-1">{currentQuestion.type.replace('-', ' ').toUpperCase()}</h3>
            </div>
            <ProgressOrb progress={progress / 100} />
          </div>
          
          {/* Multi-dimensional Progress */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {psychologicalQuestions.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full ${
                  index <= currentStep ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </div>
        </div>

        {/* Survey Engine */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 1.05 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="relative"
            >
              {/* Question Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl">
                {/* Question Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                        {currentQuestion.question}
                      </h2>
                      <p className="text-cyan-700 text-lg">{currentQuestion.subtext}</p>
                    </div>
                    <div className="text-4xl ml-6 opacity-50">💭</div>
                  </div>
                </motion.div>

                {/* Options Grid */}
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: 0.1 * index + 0.4,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        x: 10,
                        backgroundColor: "rgba(34, 211, 238, 0.1)",
                        borderColor: "rgba(34, 211, 238, 0.5)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(index, currentQuestion.id)}
                      disabled={showInsight}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group ${
                        selectedOption === index 
                          ? 'bg-cyan-50 border-cyan-400 scale-105' 
                          : 'bg-gray-50 border-gray-200 hover:border-cyan-400'
                      } ${showInsight && selectedOption !== index ? 'opacity-30' : ''}`}
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div 
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                            selectedOption === index ? 'border-cyan-500 bg-cyan-500 text-white' : 'border-gray-400'
                          }`}
                          animate={{ scale: selectedOption === index ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {selectedOption === index && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              ✓
                            </motion.div>
                          )}
                        </motion.div>
                        
                        <div className="flex-1">
                          <span className="text-gray-900 text-lg font-medium leading-relaxed">
                            {option.text}
                          </span>
                          
                          {/* Show insight when selected */}
                          {selectedOption === index && showInsight && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 p-3 bg-cyan-50 rounded-lg border border-cyan-200"
                            >
                              <div className="text-cyan-700 text-sm">
                                {option.recommendation || option.solution || option.benefit || option.action || option.nextStep}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* User Insights Panel */}
              {userInsights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex flex-wrap gap-2 justify-center"
                >
                  {userInsights.map((insight, index) => (
                    <InsightBadge key={insight} text={insight.replace('-', ' ')} delay={index * 0.1} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function TransformationSequence({ insights }: { insights: string[] }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center text-gray-900 p-8 max-w-2xl"
      >
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎯</span>
        </div>
        <h2 className="text-5xl font-bold mb-6">Your Path Is Clear</h2>
        <p className="text-xl mb-6 text-gray-700">
          Based on your answers, we've identified your unique strengths and opportunities. 
          You're exactly the type of student who thrives in international environments.
        </p>
        <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-green-600 hover:to-teal-600 transition-all duration-300">
          Start Your Application Journey
        </button>
      </motion.div>
    </div>
  )
}