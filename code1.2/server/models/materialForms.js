import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// 小工具表格模型
const materalSchema = new Schema({
  item_code: { type: 'String', required: true, index: true, unique: true },
  item_name:  { type: 'String', required: true },
  item_content :{ type: 'String', required: true },
  basis: { type: 'String', required: true },
  conditions:[String],
  materials: [String],
  //审核时限
  legal_limit: { type: 'String', required: true },

  // 旧-位置不同 咨询电话
  phone_numbers: { type: 'String', require: true },

  // 咨询平台
  consult_platform: { type: 'String', require: true },
  // 网办PC端
  network_PC: {type: 'String', required: false },
  
  // 网办移动端
  network_mobile: {type: 'String', required: false},
  // 二维码
  service_QR_code_path: {type: 'String', required: false },
  // 自助终端
  self_help:{type: 'String', required: false},
  update_date: { type: 'Date', default: Date.now },
  //增加username关联
  create_user:{type:'String',require:true},
  //增加是否启用的状态，目前暂时只有两个， 0代表不启用， 1代表启用
  status: { type: 'Number',default: 1 , required: true },
});

module.exports =  mongoose.model('MaterialForm',materalSchema,'MaterialForms');
