import mongoose from 'mongoose'

const Schema = mongoose.Schema

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Course = mongoose.model('Course', courseSchema)

export { Course }
