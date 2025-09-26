'use client'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function PsychologicalHero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Floating elements motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(useTransform(mouseX, [0, 1000], [-10, 10]), springConfig)
  const cursorY = useSpring(useTransform(mouseY, [0, 1000], [-10, 10]), springConfig)

  // Typing effect for psychological impact
  const [displayedText, setDisplayedText] = useState('')
  const fullText = "The most successful students aren't smarter—they just had the courage to apply."

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  // Success stories data
  const successStories = [
    { name: "Sarah M.", program: "Engineering Exchange", location: "Tokyo, Japan", achievement: "Landed internship at Sony" },
    { name: "Alex K.", program: "Business Semester", location: "Singapore", achievement: "Founded startup with international team" },
    { name: "Maria L.", program: "Medical Research", location: "Berlin, Germany", achievement: "Published paper in international journal" },
    { name: "James T.", program: "Arts Program", location: "Florence, Italy", achievement: "Exhibited work in European gallery" }
  ]

  // Psychological triggers
  const psychologicalTriggers = [
    { icon: "🚀", text: "87% of exchange students report higher career satisfaction" },
    { icon: "💫", text: "Average salary increase: 25% for students with international experience" },
    { icon: "🌍", text: "Build a global network that lasts a lifetime" },
    { icon: "🎯", text: "Develop cultural intelligence - the #1 skill employers want" }
  ]

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative bg-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating universities */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${10 + (i * 12)}%`,
              x: cursorX,
              y: cursorY
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            🎓
          </motion.div>
        ))}

        {/* Animated globe */}
        <motion.div
          className="absolute -right-40 -top-40 w-96 h-96 opacity-20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🌍
        </motion.div>

        {/* Particle system */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 container mx-auto px-6 min-h-screen flex items-center"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Column - Psychological Impact */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            {/* Trust Builder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 text-sm font-medium">1,247 Students Transformed Their Lives</span>
            </motion.div>

            {/* Main Headline - Psychological Trigger */}
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              <span className="text-gray-900">Stop Dreaming,</span>
              <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Start Applying.
              </span>
            </motion.h1>

            {/* Subtext with Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                {displayedText}
                <span className="ml-1 animate-pulse">|</span>
              </div>
            </motion.div>

            {/* Psychological Triggers Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {psychologicalTriggers.map((trigger, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg backdrop-blur-sm border border-gray-200"
                >
                  <span className="text-2xl">{trigger.icon}</span>
                  <span className="text-sm text-gray-700">{trigger.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => document.getElementById('survey-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Discover Your Global Potential
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
              
              <button className="px-8 py-4 border border-cyan-500 text-cyan-700 rounded-xl font-medium hover:bg-cyan-50 transition-all duration-300">
                💫 See Success Stories
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Success Stories Carousel */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-gray-900 font-bold mb-4 text-lg">Recent Success Stories</h3>
              <div className="space-y-4">
                {successStories.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium group-hover:text-cyan-600 transition-colors">
                        {story.name}
                      </div>
                      <div className="text-cyan-700 text-sm">{story.program}</div>
                      <div className="text-blue-600 text-xs">→ {story.location}</div>
                    </div>
                    <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">47</div>
              <div className="text-green-700 text-sm">Students applied this week</div>
              <div className="w-full bg-green-200 rounded-full h-1 mt-2 overflow-hidden">
                <motion.div 
                  className="bg-green-500 h-1 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 2, delay: 2 }}
                />
              </div>
            </motion.div>

            {/* Urgency Creator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center"
            >
              <div className="text-red-600 font-bold mb-1">⏳ Limited Spots Available</div>
              <div className="text-red-700 text-sm">Spring semester deadline: 14 days</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator with Psychological Nudge */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="text-center">
          <div className="text-cyan-600 text-sm mb-2">Your future starts here</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-cyan-500 rounded-full flex justify-center mx-auto"
          >
            <motion.div
              className="w-1 h-3 bg-cyan-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Mouse Followers */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="w-4 h-4 border-2 border-cyan-500 rounded-full"></div>
      </motion.div>
    </section>
  )
}