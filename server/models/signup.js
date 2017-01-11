import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const signupSchema = new Schema({
  fname: { type: 'String', required: true },
  lname: { type: 'String', required: true },
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
  mobile: { type: 'String', required: true, },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('signup', signupSchema);
