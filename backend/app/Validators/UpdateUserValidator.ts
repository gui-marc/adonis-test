import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullName: schema.string.optional(),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string.optional({ trim: true }, [rules.minLength(8), rules.maxLength(40)]),
  })

  public messages: CustomMessages = {
    'email.unique': 'Email is already in use',
    'password.minLength': 'Password must be at least 8 characters',
    'password.maxLength': 'Password must be at most 40 characters',
  }
}
