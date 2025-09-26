import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { surveySchema } from '@/lib/validations/survey'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = surveySchema.parse(body)
    
    // Save to database
    const response = await prisma.surveyResponse.create({
      data: validatedData
    })
    
    return NextResponse.json({ 
      success: true, 
      id: response.id 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Survey submission error:', error)
    return NextResponse.json(
      { error: 'Invalid survey data' },
      { status: 400 }
    )
  }
}