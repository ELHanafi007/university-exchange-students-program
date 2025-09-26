'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Advanced navigation data with icons and submenus
const navigationData = [
  {
    name: 'Home',
    href: '#home',
    icon: '🏠',
    description: 'Start your journey',
    subItems: [
      { name: 'Hero', href: '#hero' },
      { name: 'Stats', href: '#stats' },
      { name: 'Features', href: '#features' }
    ]
  },
  {
    name: 'Discover',
    href: '#discover',
    icon: '🔍',
    description: 'Find your path',
    subItems: [
      { name: 'Programs', href: '#programs' },
      { name: 'Destinations', href: '#destinations' },
      { name: 'Scholarships', href: '#scholarships' }
    ]
  },
  {
    name: 'Survey',
    href: '#survey',
    icon: '📊',
    description: 'Personalized assessment',
    subItems: [
      { name: 'Start Survey', href: '#survey-start' },
      { name: 'Results', href: '#survey-results' },
      { name: 'Success Stories', href: '#stories' }
    ]
  },
  {
    name: 'Barriers',
    href: '#barriers',
    icon: '🚧',
    description: 'Overcome challenges',
    subItems: [
      { name: 'Solutions', href: '#solutions' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Resources', href: '#resources' }
    ]
  },
  {
    name: 'Contact',
    href: '#contact',
    icon: '📞',
    description: 'Get in touch',
    subItems: [
      { name: 'Advisors', href: '#advisors' },
      { name: 'Application', href: '#apply' },
      { name: 'Support', href: '#support' }
    ]
  }
]

// Advanced Hamburger Icon with Morphing Animation
function MorphingHamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div className="relative w-8 h-8">
      {/* Top Line */}
      <motion.span
        className="absolute left-0 w-full h-0.5 bg-current rounded-full"
        style={{ top: isOpen ? '50%' : '20%', transform: 'translateY(-50%)' }}
        animate={{
          rotate: isOpen ? 45 : 0,
          width: isOpen ? '100%' : '100%',
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Middle Line - Morphs into circle */}
      <motion.span
        className="absolute left-1/2 top-1/2 w-0.5 h-0.5 bg-current rounded-full"
        animate={{
          scale: isOpen ? 10 : 1,
          opacity: isOpen ? 0 : 1,
          x: "-50%",
          y: "-50%"
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      
      {/* Bottom Line */}
      <motion.span
        className="absolute left-0 w-full h-0.5 bg-current rounded-full"
        style={{ top: isOpen ? '50%' : '80%', transform: 'translateY(-50%)' }}
        animate={{
          rotate: isOpen ? -45 : 0,
          width: isOpen ? '100%' : '100%',
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Surrounding Orbital Dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-current rounded-full"
          animate={{
            scale: isOpen ? [0, 1, 0] : 0,
            opacity: isOpen ? [0, 1, 0] : 0,
            x: isOpen ? [
              Math.cos((i * 120 * Math.PI) / 180) * 12,
              Math.cos((i * 120 * Math.PI) / 180) * 20,
              Math.cos((i * 120 * Math.PI) / 180) * 12
            ] : 0,
            y: isOpen ? [
              Math.sin((i * 120 * Math.PI) / 180) * 12,
              Math.sin((i * 120 * Math.PI) / 180) * 20,
              Math.sin((i * 120 * Math.PI) / 180) * 12
            ] : 0,
          }}
          transition={{
            duration: 0.6,
            delay: isOpen ? i * 0.1 : 0,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}

// Floating Background Orbs
function FloatingOrbs() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10 blur-xl"
          style={{
            width: 100 + i * 40,
            height: 100 + i * 40,
            background: `radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(59, 130, 246, 0.1) 70%)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
        />
      ))}
    </>
  )
}

// Animated Navigation Item
function NavItem({ item, isActive, onClick }: { item: any; isActive: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        onClick={onClick}
        className="relative px-4 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 group"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
          animate={{ opacity: isActive || isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Icon */}
        <motion.span
          className="text-lg"
          animate={{ scale: isActive || isHovered ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {item.icon}
        </motion.span>
        
        {/* Text */}
        <span className="font-medium text-white/90 group-hover:text-white transition-colors">
          {item.name}
        </span>
        
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            layoutId="activeIndicator"
          />
        )}
      </motion.button>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 backdrop-blur-xl rounded-xl p-3 border border-white/10 shadow-2xl z-50 min-w-max"
          >
            <div className="text-cyan-400 text-sm font-medium">{item.description}</div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full my-2" />
            <div className="flex flex-col gap-1">
              {item.subItems.map((subItem: any, idx: number) => (
                <a
                  key={idx}
                  href={subItem.href}
                  className="px-2 py-1 text-white/70 hover:text-cyan-300 text-sm transition-colors rounded hover:bg-white/5"
                >
                  {subItem.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Navbar Component
export function UltimateNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const navbarRef = useRef(null)
  const pathname = usePathname()

  const { scrollY } = useScroll()
  const scrollYSpring = useSpring(scrollY, { damping: 30, stiffness: 100 })
  const backgroundOpacity = useTransform(scrollYSpring, [0, 100], [0, 0.95])
  const blurAmount = useTransform(scrollYSpring, [0, 100], [0, 20])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
      if (e.key === 'ArrowRight') setActiveItem(prev => (prev + 1) % navigationData.length)
      if (e.key === 'ArrowLeft') setActiveItem(prev => (prev - 1 + navigationData.length) % navigationData.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <motion.nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: `rgba(255, 255, 255, ${backgroundOpacity})`,
          backdropFilter: `blur(${blurAmount}px)`,
        }}
        animate={{
          y: isScrolled ? 0 : 0,
          padding: isScrolled ? '0.5rem 0' : '1rem 0',
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Floating Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingOrbs />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  🌍
                </motion.div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <motion.h1 
                  className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  GlobalEdu
                </motion.h1>
                <motion.p 
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Transform Your Future
                </motion.p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden lg:flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {navigationData.map((item, index) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={activeItem === index}
                  onClick={() => setActiveItem(index)}
                />
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-2xl overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Apply Now
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Sparkle Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: '10%',
                        top: '30%',
                      }}
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MorphingHamburger isOpen={isOpen} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed top-24 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl lg:hidden overflow-hidden"
              >
                {/* Menu Header */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
                  <p className="text-gray-600 text-sm">Choose your destination</p>
                </div>

                {/* Menu Items */}
                <div className="p-4 space-y-2">
                  {navigationData.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-cyan-50 transition-colors group"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-cyan-600">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <motion.div
                        className="w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.5 }}
                      />
                    </motion.a>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-gray-200">
                  <motion.button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Your Journey
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-50"
        style={{ scaleX: useTransform(scrollYSpring, [0, 1000], [0, 1]) }}
        initial={{ scaleX: 0 }}
      />
    </>
  )
}

// Additional Component: Navigation Indicator for Desktop
function NavigationIndicator() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = navigationData.map(item => item.href.substring(1))
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach(section => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4 p-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        {navigationData.map((item, index) => {
          const section = item.href.substring(1)
          const isActive = activeSection === section

          return (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Tooltip */}
              <motion.div
                className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
              >
                {item.name}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-black/80" />
              </motion.div>

              {/* Navigation Dot */}
              <motion.div
                className={`w-3 h-3 rounded-full border-2 transition-colors ${
                  isActive
                    ? 'bg-cyan-500 border-cyan-500 scale-150'
                    : 'bg-white border-gray-400 group-hover:border-cyan-400'
                }`}
                animate={{
                  scale: isActive ? 1.5 : 1,
                  boxShadow: isActive ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none',
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}

// Export both components
export { NavigationIndicator }