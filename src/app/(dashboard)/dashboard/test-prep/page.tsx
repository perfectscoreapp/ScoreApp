import Link from "next/link"

const testPrep = [
  {
    id: "sat",
    name: "SAT",
    description: "College Board's standardized test for college admissions",
    subjects: ["Math", "Reading", "Writing"],
    color: "bg-blue-500",
  },
  {
    id: "act",
    name: "ACT",
    description: "Alternative standardized test for college admissions",
    subjects: ["Math", "Reading", "Writing", "Science"],
    color: "bg-green-500",
  },
  {
    id: "psat",
    name: "PSAT",
    description: "Preliminary SAT and National Merit Scholarship Qualifying Test",
    subjects: ["Math", "Reading", "Writing"],
    color: "bg-purple-500",
  },
  {
    id: "ap",
    name: "AP Exams",
    description: "Advanced Placement tests for college credit",
    subjects: ["Various Subjects"],
    color: "bg-yellow-500",
  },
]

export default function TestPrepPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Test Preparation</h1>
          <p className="mt-2 text-muted-foreground">
            Practice materials and study guides for standardized tests
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testPrep.map((test) => (
            <div
              key={test.id}
              className="group relative rounded-lg border p-6 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold">{test.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {test.description}
              </p>
              <div className="mt-4">
                <h4 className="text-sm font-medium">Subjects Covered:</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {test.subjects.map((subject) => (
                    <li
                      key={subject}
                      className="rounded-full bg-muted px-3 py-1 text-xs"
                    >
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/dashboard/test-prep/${test.id}`}
                className="absolute inset-0"
              >
                <span className="sr-only">View {test.name} preparation</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 