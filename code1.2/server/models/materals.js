import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const materalSchema = new Schema({
  leafId: { type: 'String', required: true, index: true, unique: true },
  name:  { type: 'String', required: true },
  materals: [{
    name: { type: 'String', required: true },
    submitMethod: { type: 'String', required: true },
    amount: { type: 'String', required: false },
    requirement: { type: 'String', required: false },
    apartment: { type: 'String', required: true },
    description: { type: 'String', required: false },
  }],
});

export default mongoose.model('Materal', materalSchema);
