import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// 小工具表格模型
const materalSchema = new Schema({
  item_code: { type: 'String', required: true, index: true, unique: true },
  item_name:  { type: 'String', required: true, unique: true },
  item_content :{ type: 'String', required: true },
  basis: { type: 'String', required: true },
  conditions:[String],
  materials: [String],
  legal_limit: { type: 'String', required: true },
  promise_limit: { type: 'String', require: true },
  consult_QR_code_path: {type: 'String', required: false },
  service_QR_code_path: {type: 'String', required: false },
  addresses: [String],
  phone_numbers: [String],
  update_date: { type: 'Date', default: Date.now },
  phone_numbers_address: [String],
  //增加username关联
  create_user:{type:'String',require:true},
  //增加是否启用的状态，目前暂时只有两个， 0代表不启用， 1代表启用
  status: { type: 'Number',default: 1 , required: true },
});

module.exports =  mongoose.model('MaterialForm',materalSchema,'MaterialForms');
