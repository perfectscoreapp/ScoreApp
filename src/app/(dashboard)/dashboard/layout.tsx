import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <DashboardTabs />
      <main className="flex-1">{children}</main>
    </div>
  )
} 