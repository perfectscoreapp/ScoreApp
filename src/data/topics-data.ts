export const gradeTopics = {
  "grade-6": {
    name: "6th Grade",
    description: "Core subjects and foundational concepts",
    topics: {
      math: {
        name: "Mathematics",
        description: "Master mathematical concepts and problem-solving skills",
        color: "bg-blue-500",
        subtopics: [
          {
            id: "algebra-basics",
            name: "Basic Algebra",
            description: "Introduction to algebraic concepts",
            units: ["Variables", "Simple Equations", "Basic Functions", "Number Properties"]
          },
          {
            id: "geometry-basics",
            name: "Basic Geometry",
            description: "Introduction to geometric concepts",
            units: ["Basic Shapes", "Angles", "Perimeter", "Area"]
          }
        ]
      },
      science: {
        name: "Science",
        description: "Explore the natural world through scientific inquiry",
        color: "bg-green-500",
        subtopics: [
          {
            id: "earth-science",
            name: "Earth Science",
            description: "Study of Earth and its systems",
            units: ["Earth Structure", "Weather", "Natural Resources", "Space"]
          },
          {
            id: "life-science",
            name: "Life Science",
            description: "Study of living organisms",
            units: ["Cells", "Plants", "Animals", "Ecosystems"]
          }
        ]
      }
    }
  },
  "grade-7": {
    name: "7th Grade",
    description: "Advanced concepts and critical thinking",
    topics: {
      math: {
        name: "Mathematics",
        description: "Advanced mathematical concepts",
        color: "bg-blue-500",
        subtopics: [
          {
            id: "pre-algebra",
            name: "Pre-Algebra",
            description: "Preparation for algebraic concepts",
            units: ["Integers", "Rational Numbers", "Expressions", "Linear Equations"]
          },
          {
            id: "geometry-intermediate",
            name: "Intermediate Geometry",
            description: "Advanced geometric concepts",
            units: ["Triangles", "Circles", "Surface Area", "Volume"]
          }
        ]
      },
      science: {
        name: "Science",
        description: "Advanced scientific concepts",
        color: "bg-green-500",
        subtopics: [
          {
            id: "physical-science",
            name: "Physical Science",
            description: "Study of matter and energy",
            units: ["Matter", "Energy", "Forces", "Motion"]
          },
          {
            id: "life-science-advanced",
            name: "Advanced Life Science",
            description: "Advanced study of living systems",
            units: ["Cell Processes", "Genetics", "Evolution", "Human Body"]
          }
        ]
      }
    }
  },
  "grade-8": {
    name: "8th Grade",
    description: "Complex problem solving and analysis",
    topics: {
      math: {
        name: "Mathematics",
        description: "Complex mathematical concepts",
        color: "bg-blue-500",
        subtopics: [
          {
            id: "algebra-1",
            name: "Algebra I",
            description: "Core algebraic concepts",
            units: ["Systems of Equations", "Quadratic Functions", "Polynomials", "Factoring"]
          },
          {
            id: "geometry-advanced",
            name: "Advanced Geometry",
            description: "Complex geometric concepts",
            units: ["Transformations", "Similarity", "Trigonometry", "Proofs"]
          }
        ]
      },
      science: {
        name: "Science",
        description: "Complex scientific concepts",
        color: "bg-green-500",
        subtopics: [
          {
            id: "chemistry-intro",
            name: "Introduction to Chemistry",
            description: "Basic chemical concepts",
            units: ["Atoms", "Elements", "Compounds", "Reactions"]
          },
          {
            id: "physics-intro",
            name: "Introduction to Physics",
            description: "Basic physics concepts",
            units: ["Forces", "Energy", "Waves", "Electricity"]
          }
        ]
      }
    }
  }
} 