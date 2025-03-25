import { auth } from "@clerk/nextjs"

export default async function SettingsPage() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-lg border">
          <div className="p-6">
            <h2 className="text-xl font-bold">Profile Settings</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Update your personal information and preferences.
            </p>
          </div>
        </div>

        <div className="rounded-lg border">
          <div className="p-6">
            <h2 className="text-xl font-bold">Notification Settings</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Configure how and when you receive notifications.
            </p>
          </div>
        </div>

        <div className="rounded-lg border">
          <div className="p-6">
            <h2 className="text-xl font-bold">Subscription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your subscription and billing information.
            </p>
          </div>
        </div>

        <div className="rounded-lg border">
          <div className="p-6">
            <h2 className="text-xl font-bold">Privacy & Security</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Control your privacy settings and security preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 