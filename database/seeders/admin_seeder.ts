import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import env from '#start/env'

export default class AdminSeeder extends BaseSeeder {
  async run() {
    const email = env.get('ADMIN_EMAIL')
    const password = env.get('ADMIN_PASSWORD')

    const exists = await User.findBy('email', email)

    if (exists) return

    await User.create({
      name: 'Admin',
      email,
      password,
      role: 'ADMIN',
    })
  }
}
