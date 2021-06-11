import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// 小工具表格模型
const ruleSchema = new mongoose.Schema({
    rule_id: { type: 'String', required: true, index: true, unique: true },
    item_code:  { type: 'String', required: true },
    text:  { type: 'String', required: true },
    parent:  { type: 'String', required: true },
    children: [{
      child: { type: 'String'},
    }],
    leaf:  { type: 'String', required: true },
  });

module.exports =  mongoose.model('ruleForm',ruleSchema,'ruleForms');