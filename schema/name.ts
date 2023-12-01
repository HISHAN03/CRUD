import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const nameSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export const Name= mongoose.model('Name', nameSchema);

