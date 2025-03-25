# PerfectScore - K-12 Learning Platform

PerfectScore is a comprehensive educational application designed for K-12 students, offering personalized learning paths, progress tracking, and AI-powered assistance.

## Features

- 🎯 Personalized learning paths
- 🤖 AI-powered tutoring assistance
- 📊 Comprehensive progress tracking
- 👨‍👩‍👧‍👦 Parent dashboard for monitoring
- 🔒 Secure authentication
- 💳 Subscription management

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** PostgreSQL with Prisma
- **Payments:** Stripe
- **UI Components:** Radix UI
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- Clerk account
- Stripe account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/perfectscore/app.git
cd app
```

2. Install dependencies:

```bash
npm install
```

3. Copy the example environment variables:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:

```bash
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Database (Prisma)
DATABASE_URL=your_database_url

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
```

7. Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── (auth)/        # Authentication routes
│   └── (dashboard)/   # Protected dashboard routes
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   ├── auth/         # Authentication components
│   └── dashboard/    # Dashboard-specific components
├── lib/              # Utility functions and configurations
├── hooks/            # Custom React hooks
└── types/            # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@perfectscore.com or join our Discord community.
