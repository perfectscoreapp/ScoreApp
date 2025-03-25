import mongoose from 'mongoose'

export interface IGrade {
  _id: string
  name: string
  slug: string
  description: string
  subjects: {
    id: string
    name: string
    slug: string
    description: string
    icon?: string
  }[]
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const GradeSchema = new mongoose.Schema<IGrade>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  subjects: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String }
  }],
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

// Create indexes for efficient querying
GradeSchema.index({ slug: 1 })
GradeSchema.index({ order: 1 })
GradeSchema.index({ 'subjects.slug': 1 })

export const Grade = (mongoose.models?.Grade as mongoose.Model<IGrade>) || 
  mongoose.model<IGrade>('Grade', GradeSchema) 