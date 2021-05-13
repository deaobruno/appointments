import {mongoose} from '../../database/db.js';

let UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Missing attribute!']
  },
});

let User = mongoose.model('User', UserSchema);

export {User};