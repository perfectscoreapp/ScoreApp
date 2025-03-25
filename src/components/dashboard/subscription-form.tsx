"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for individual students",
    price: "$9.99",
    features: [
      "Access to all basic topics",
      "Basic AI tutoring",
      "Progress tracking",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for serious learners",
    price: "$19.99",
    features: [
      "Access to all advanced topics",
      "Advanced AI tutoring",
      "Detailed analytics",
      "Priority support",
      "Practice tests",
    ],
  },
  {
    id: "family",
    name: "Family",
    description: "Perfect for parents with multiple children",
    price: "$29.99",
    features: [
      "Up to 4 student accounts",
      "All Pro features",
      "Parent dashboard",
      "Family progress reports",
      "24/7 support",
    ],
  },
]

interface SubscriptionFormProps {
  currentPlan?: string
}

export function SubscriptionForm({ currentPlan }: SubscriptionFormProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan || "basic")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In production, this would create a Stripe checkout session
      toast({
        title: "Redirecting to checkout...",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border p-6 ${
              selectedPlan === plan.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <label className="space-y-4">
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="absolute right-4 top-4"
              />
              <div>
                <h3 className="font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="text-2xl font-bold">{plan.price}</div>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Subscribe Now"}
        </button>
      </div>
    </form>
  )
} 