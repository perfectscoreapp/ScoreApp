"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/dashboard">
            <span className="font-bold">PerfectScore</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard/progress"
              className="transition-colors hover:text-foreground/80"
            >
              Progress
            </Link>
            <Link
              href="/dashboard/subscription"
              className="transition-colors hover:text-foreground/80"
            >
              Subscription
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
} 