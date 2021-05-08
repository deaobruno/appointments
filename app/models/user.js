import mongoose from '../../database/db.js'

let UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Missing attribute!']
  },
})

let UserModel = mongoose.model('UserModel', UserSchema)

export default UserModel