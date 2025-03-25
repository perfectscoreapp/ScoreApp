import { auth } from "@clerk/nextjs"

export default async function ProgressPage() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground">
          Track your learning journey and achievements.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Total Questions</h3>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Correct Answers</h3>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Topics Completed</h3>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Time Spent</h3>
            <div className="text-2xl font-bold">0h</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Recent Progress</h2>
        <div className="rounded-lg border">
          <div className="p-6">
            <p className="text-sm text-muted-foreground">
              Your learning progress and statistics will appear here.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Achievement Badges</h2>
        <div className="rounded-lg border">
          <div className="p-6">
            <p className="text-sm text-muted-foreground">
              Earn badges by completing topics and maintaining streaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 