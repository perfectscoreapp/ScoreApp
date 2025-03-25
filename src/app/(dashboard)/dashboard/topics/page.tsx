import Link from "next/link"
import { gradeTopics } from "@/data/topics-data"

export default function TopicsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Grade Levels</h1>
          <p className="mt-2 text-muted-foreground">
            Select your grade level to view relevant topics
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(gradeTopics).map(([gradeId, grade]) => (
            <Link
              key={gradeId}
              href={`/dashboard/topics/${gradeId}`}
              className="group relative rounded-lg border p-6 hover:shadow-md transition-all"
            >
              <h2 className="text-2xl font-semibold">{grade.name}</h2>
              <p className="mt-2 text-muted-foreground">
                {grade.description}
              </p>
              <div className="mt-4">
                <h3 className="text-sm font-medium">Available Subjects:</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {Object.values(grade.topics).map((topic) => (
                    <li
                      key={topic.name}
                      className={`rounded-full px-3 py-1 text-xs text-white ${topic.color}`}
                    >
                      {topic.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 