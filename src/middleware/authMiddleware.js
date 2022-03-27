import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  // check json web token exist and is valid
  if (token) {
    jwt.verify(token, 'jwt secret token', (err, decodedToken) => {
      if (err) {
        console.error(err)
        res.redirect('/login')
      } else {
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  res.locals.user = null
  // check json web token exist and is valid
  if (token) {
    jwt.verify(token, 'jwt secret token', async (err, decodedToken) => {
      if (err) {
        console.error(err)
        next()
      } else {
        const user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    next()
  }
}
