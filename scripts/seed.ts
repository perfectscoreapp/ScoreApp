import 'dotenv/config';
import { seedDatabase } from '@/utils/seedDatabase'

async function main() {
  try {
    await seedDatabase()
    console.log('Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('Failed to seed database:', error)
    process.exit(1)
  }
}

main() 