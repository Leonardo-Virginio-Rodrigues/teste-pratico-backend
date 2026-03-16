import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)
const name = () => vine.string().minLength(8).maxLength(124)
const role = () => vine.enum(['ADMIN', 'MANAGER', 'FINANCE', 'USER'])
/**
 * Validator to use when performing signup
 */
export const signupValidator = vine.create({
  name: name(),
  email: email().unique({ table: 'users', column: 'email' }),
  role: role(),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use when performing update user
 */
export const updateOneValidator = vine.create({
  name: name().optional(),
  email: email().unique({ table: 'users', column: 'email' }).optional(),
  role: role().optional(),
  password: password().optional(),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
