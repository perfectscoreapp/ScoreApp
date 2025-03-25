"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  {
    id: "grades",
    label: "Grades",
    href: "/dashboard/grades",
  },
  {
    id: "topics",
    label: "Topics",
    href: "/dashboard/topics",
  },
  {
    id: "test-prep",
    label: "Test Preparation",
    href: "/dashboard/test-prep",
  },
]

export function DashboardTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <nav className="container flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`
                inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium
                ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }
              `}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 