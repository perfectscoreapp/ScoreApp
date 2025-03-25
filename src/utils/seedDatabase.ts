import { Grade } from "@/models/Grade"
import { Topic } from "@/models/Topic"
import { Question } from "@/models/Question"
import connectToDatabase from "@/lib/mongodb"

const sampleGrades = [
  {
    name: "6th Grade",
    slug: "6th-grade",
    description: "Sixth grade curriculum covering essential math and science concepts",
    subjects: [
      {
        id: "math-6",
        name: "Mathematics",
        slug: "math",
        description: "Core mathematics concepts for 6th grade",
        icon: "📐"
      },
      {
        id: "science-6",
        name: "Science",
        slug: "science",
        description: "Introduction to scientific principles and methods",
        icon: "🔬"
      }
    ],
    order: 1,
    isActive: true
  }
]

const sampleTopics = [
  {
    name: "Basic Arithmetic",
    slug: "basic-arithmetic",
    description: "Learn the fundamentals of arithmetic operations",
    gradeSlug: "6th-grade",
    subjectSlug: "math",
    difficultyLevel: "Beginner",
    estimatedTimeMinutes: 30,
    learningObjectives: [
      "Understand addition and subtraction",
      "Master multiplication tables",
      "Learn basic division"
    ],
    order: 1,
    isActive: true
  },
  {
    name: "Algebra Basics",
    slug: "algebra-basics",
    description: "Introduction to algebraic expressions and equations",
    gradeSlug: "6th-grade",
    subjectSlug: "math",
    difficultyLevel: "Intermediate",
    estimatedTimeMinutes: 45,
    learningObjectives: [
      "Understand variables and constants",
      "Learn to solve simple equations",
      "Work with algebraic expressions"
    ],
    order: 2,
    isActive: true
  },
  {
    name: "Scientific Method",
    slug: "scientific-method",
    description: "Learn the basic steps of scientific inquiry",
    gradeSlug: "6th-grade",
    subjectSlug: "science",
    difficultyLevel: "Beginner",
    estimatedTimeMinutes: 40,
    learningObjectives: [
      "Understand the steps of scientific method",
      "Learn to form hypotheses",
      "Practice experimental design"
    ],
    order: 1,
    isActive: true
  },
  {
    name: "Matter and Energy",
    slug: "matter-and-energy",
    description: "Explore the fundamental concepts of matter and energy",
    gradeSlug: "6th-grade",
    subjectSlug: "science",
    difficultyLevel: "Beginner",
    estimatedTimeMinutes: 35,
    learningObjectives: [
      "Understand states of matter",
      "Learn about energy forms",
      "Explore energy transformations"
    ],
    order: 2,
    isActive: true
  },
  {
    name: "Advanced Algebra",
    slug: "advanced-algebra",
    description: "Complex algebraic concepts and problem solving",
    gradeSlug: "6th-grade",
    subjectSlug: "math",
    difficultyLevel: "Intermediate",
    estimatedTimeMinutes: 50,
    learningObjectives: [
      "Master complex equations",
      "Work with inequalities",
      "Understand functions"
    ],
    order: 3,
    isActive: true
  }
]

const sampleQuestions = [
  {
    text: "What is 2 + 2?",
    type: "multiple-choice",
    choices: [
      { 
        id: "a", 
        text: "3", 
        isCorrect: false,
        rationale: "3 is incorrect because 2 + 2 equals 4, not 3."
      },
      { 
        id: "b", 
        text: "4", 
        isCorrect: true,
        rationale: "4 is correct because when you add 2 and 2 together, you get 4."
      },
      { 
        id: "c", 
        text: "5", 
        isCorrect: false,
        rationale: "5 is incorrect because 2 + 2 equals 4, not 5."
      },
      { 
        id: "d", 
        text: "6", 
        isCorrect: false,
        rationale: "6 is incorrect because 2 + 2 equals 4, not 6."
      }
    ],
    answerRationale: "This is a basic arithmetic question that tests your understanding of addition. When you add 2 and 2 together, you get 4. This is a fundamental concept in mathematics that you should be able to solve quickly.",
    points: 10,
    difficulty: "easy",
    keywords: ["addition", "arithmetic", "basic math", "numbers"],
    order: 1,
    isActive: true
  },
  {
    text: "Solve for x: 2x + 4 = 10",
    type: "text",
    correctAnswer: "3",
    answerRationale: "To solve this equation, follow these steps:\n1. Subtract 4 from both sides: 2x = 6\n2. Divide both sides by 2: x = 3\nTherefore, x = 3 is the correct answer.",
    points: 15,
    difficulty: "medium",
    keywords: ["algebra", "equations", "solving equations", "linear equations"],
    order: 2,
    isActive: true
  },
  {
    text: "Which of the following is a prime number?",
    type: "multiple-choice",
    choices: [
      { 
        id: "a", 
        text: "15", 
        isCorrect: false,
        rationale: "15 is not a prime number because it can be divided by 3 and 5."
      },
      { 
        id: "b", 
        text: "17", 
        isCorrect: true,
        rationale: "17 is a prime number because it can only be divided by 1 and itself."
      },
      { 
        id: "c", 
        text: "21", 
        isCorrect: false,
        rationale: "21 is not a prime number because it can be divided by 3 and 7."
      },
      { 
        id: "d", 
        text: "25", 
        isCorrect: false,
        rationale: "25 is not a prime number because it can be divided by 5."
      }
    ],
    answerRationale: "A prime number is a natural number greater than 1 that can only be divided by 1 and itself. Among the given options, only 17 meets this criteria. The other numbers (15, 21, and 25) can be divided by other numbers besides 1 and themselves.",
    points: 15,
    difficulty: "medium",
    keywords: ["prime numbers", "number theory", "divisibility", "mathematics"],
    order: 3,
    isActive: true
  },
  {
    text: "What is the capital of France?",
    type: "text",
    correctAnswer: "Paris",
    answerRationale: "Paris is the capital city of France. It has been France's capital since 508 CE, making it one of Europe's oldest capitals. Paris is known for its rich history, culture, and iconic landmarks like the Eiffel Tower and the Louvre Museum.",
    points: 10,
    difficulty: "easy",
    keywords: ["geography", "capitals", "France", "Europe"],
    order: 4,
    isActive: true
  }
]

export async function seedDatabase() {
  try {
    await connectToDatabase()

    // Clear existing data
    await Grade.deleteMany({})
    await Topic.deleteMany({})
    await Question.deleteMany({})

    // Insert grades
    const grades = await Grade.insertMany(sampleGrades)
    console.log('Inserted grades:', grades.length)

    // Insert topics
    const topics = await Topic.insertMany(sampleTopics)
    console.log('Inserted topics:', topics.length)

    // Insert questions for each topic
    const questionPromises = topics.map(async (topic) => {
      // Create questions specific to each topic
      const topicQuestions = sampleQuestions.map((question, index) => ({
        ...question,
        topicId: topic._id.toString(),
        text: `${question.text} (${topic.name})`, // Make questions unique per topic
        order: index + 1
      }))
      return Question.insertMany(topicQuestions)
    })

    const questions = await Promise.all(questionPromises)
    console.log('Inserted questions:', questions.flat().length)

    // Create indexes
    await Topic.collection.createIndexes([
      {
        key: { slug: 1 },
        unique: true
      },
      {
        key: { gradeSlug: 1, subjectSlug: 1, name: 1 },
        unique: true
      }
    ])

    // Create index for questions
    await Question.collection.createIndexes([
      {
        key: { topicId: 1, order: 1 }
      }
    ])

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
} 