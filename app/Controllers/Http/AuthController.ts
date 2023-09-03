import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
  constructor(protected ctx: HttpContextContract) {}

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()

    const user = await User.findByOrFail('email', email)

    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Invalid credentials')
    }

    try {
      const token = await auth.use('api').login(user, {
        expiresIn: '7 days',
      })
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}