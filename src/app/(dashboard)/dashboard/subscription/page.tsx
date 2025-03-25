import { SubscriptionForm } from "@/components/dashboard/subscription-form"

export default function SubscriptionPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground">
          Select the perfect plan to unlock your full learning potential.
        </p>
      </div>
      <SubscriptionForm />
    </div>
  )
} 