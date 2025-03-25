import { Schema, model, models } from 'mongoose'

export interface ITopic {
  _id: string
  name: string
  slug: string
  description: string
  gradeSlug: string
  subjectSlug: string
  imageUrl?: string
  prerequisites?: string[]
  learningObjectives?: string[]
  estimatedTimeMinutes?: number
  difficultyLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
  tags?: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  order: number
}

const TopicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    gradeSlug: { type: String, required: true },
    subjectSlug: { type: String, required: true },
    imageUrl: { type: String },
    prerequisites: [{ type: String }],
    learningObjectives: [{ type: String }],
    estimatedTimeMinutes: { type: Number },
    difficultyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

// Create compound index for efficient querying
TopicSchema.index({ gradeSlug: 1, subjectSlug: 1 })

// Create unique index on slug
TopicSchema.index({ slug: 1 }, { unique: true })

export const Topic = models.Topic || model<ITopic>('Topic', TopicSchema) 