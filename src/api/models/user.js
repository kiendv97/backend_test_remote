import mongoose, { Schema } from 'mongoose'
import md5 from 'md5'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})
userSchema.index({ username: 1, email: 1 })

userSchema.pre('save', function (next) {
  console.log('pre save ---->>>>>', this.isModified('password'))
  if (this.isModified('password')) {
    this.password = md5(this.password)
  }
  next()
})
userSchema.methods = {
  comparePassword (candidatePassword) {
    return this.password === md5(candidatePassword)
  },
  view () {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

const model = mongoose.model('User', userSchema)

export const schema = model.schema

export const userModel = {
  username: model.schema.tree.username,
  email: model.schema.tree.email,
  password: model.schema.tree.password
}

export default model
