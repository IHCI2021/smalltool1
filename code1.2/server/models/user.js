import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String,require:true},
  password:{type:String,require:true},
  create_time:{type:'Date',default:Date.now}
})

module.exports =  mongoose.model('User',userSchema,'user');
