import { z } from 'zod'

export const surveySchema = z.object({
  faculty: z.string().min(1, "Please select your faculty"),
  year: z.string().min(1, "Please select your year"),
  gender: z.string().optional(),
  knowsAboutProgram: z.string().min(1, "This field is required"),
  readsEmails: z.string().min(1, "This field is required"),
  interestedInAbroad: z.string().min(1, "This field is required"),
  triedApplying: z.string().min(1, "This field is required"),
  reasonNotApplied: z.string().optional(),
  otherReason: z.string().optional(),
  familySupport: z.string().min(1, "This field is required"),
  suggestions: z.string().optional(),
})

export type SurveyFormData = z.infer<typeof surveySchema>