import mongoose from 'mongoose'
import validator from 'validator'
import bcrpyt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter an password'],
      minlength: [6, 'The password must have at least 6 characters'],
    },
  },
  { timestamps: true }
)

// hook called before saving on the database

userSchema.pre('save', async function (next) {
  const salt = await bcrpyt.genSalt()
  this.password = await bcrpyt.hash(this.password, salt)
  next()
})

// static method to login the user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrpyt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect password')
  }
  throw Error(`Incorrect email`)
}

export const User = mongoose.model('user', userSchema)
