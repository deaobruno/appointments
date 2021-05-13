import {mongoose} from '../../database/db.js';
import {User} from '../models/user.js';
      
let timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

let AppointmentSchema = mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Missing attribute!'],
  },
  start: {
    type: String,
    required: [true, 'Missing attribute!'],
    match: [timeRegex, 'Wrong format'],
    minLength: [5, 'Wrong format'],
    maxLength: [5, 'Wrong format'],
  },
  end: {
    type: String,
    required: [true, 'Missing attribute!'],
    match: [timeRegex, 'Wrong format'],
    minLength: [5, 'Wrong format'],
    maxLength: [5, 'Wrong format'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: User,
    required: [true, 'Missing attribute!'],
  },
});

let Appointment = mongoose.model('Appointment', AppointmentSchema);

export {Appointment};