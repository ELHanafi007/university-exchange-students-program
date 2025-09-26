'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faculties = [
  "Faculty of Arts & Humanities",
  "Faculty of Sciences", 
  "Faculty of Engineering",
  "Faculty of Business & Economics",
  "Faculty of Law",
  "Faculty of Medicine",
  "Faculty of Social Sciences",
  "Other"
]

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate"]
const genders = ["Male", "Female", "Non-binary", "Prefer not to say"]

export function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { title: "Basic Information", fields: ["faculty", "year", "gender"] },
    { title: "Awareness", fields: ["knowsAboutProgram", "readsEmails"] },
    { title: "Interest", fields: ["interestedInAbroad", "triedApplying"] },
    { title: "Support", fields: ["familySupport", "suggestions"] },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form
      console.log('Form data:', formData)
      setIsComplete(true)
      
      // In a real app, you would send this to your API
      fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">✅</span>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your response has been recorded. Your insights will help improve exchange programs for all students.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Submit Another Response
        </button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {steps[currentStep]?.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-teal-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Basic Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Faculty *</label>
                  <select
                    onChange={(e) => handleInputChange('faculty', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select your faculty</option>
                    {faculties.map(faculty => (
                      <option key={faculty} value={faculty}>{faculty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study *</label>
                  <select
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select your year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Prefer not to say</option>
                    {genders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Awareness */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Were you aware of the student exchange program? *
                  </label>
                  <div className="space-y-3">
                    {['Yes', 'No', 'Unsure'].map(option => (
                      <label key={option} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="knowsAboutProgram"
                          onChange={() => handleInputChange('knowsAboutProgram', option)}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How often do you read university emails? *
                  </label>
                  <div className="space-y-3">
                    {['Always', 'Sometimes', 'Rarely', 'Never'].map(option => (
                      <label key={option} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="readsEmails"
                          onChange={() => handleInputChange('readsEmails', option)}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Add more steps as needed */}

          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Submit Survey' : 'Next'}
            {currentStep < steps.length - 1 && '→'}
          </button>
        </div>
      </div>
    </div>
  )
}