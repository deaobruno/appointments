import mongoose from 'mongoose'

mongoose.connect(
  'mongodb://localhost/appointments', 
  { 
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
  },
  console.log('Connected to DB')
)

export {mongoose}