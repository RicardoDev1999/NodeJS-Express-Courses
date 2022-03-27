import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

const handleErrors = (err) => {
  let errors = { email: '', password: '' }

  // incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'Invalid Email'
  }

  // incorrect password
  if (err.message === 'Incorrect password') {
    errors.email = 'Invalid Password'
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = `We couldn't create this account.`
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const createAndSetToken = (id, res) => {
  const jwtMaxAge = 3 * 24 * 60 * 60 // 3 days in seconds
  const token = jwt.sign({ id }, 'jwt secret token', {
    expiresIn: jwtMaxAge,
  })
  res.cookie('jwt', token, { httpOnly: true, maxAge: jwtMaxAge * 1000 })
}

export const signup_get = (req, res) => {
  res.render('auth/signup')
}

export const signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    const token = createAndSetToken(user._id, res)
    res.cookie('jwt', token, { httpOnly: true, maxAge: jwtMaxAge * 1000 })
    res.status(201).send()
  } catch (err) {
    var errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

export const login_get = (req, res) => {
  res.render('auth/login')
}

export const login_post = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    createAndSetToken(user._id, res)
    res.status(200).json({})
  } catch (err) {
    var errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

export const logout_get = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}
