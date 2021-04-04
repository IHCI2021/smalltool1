import MaterialForm from '../models/materialForms'
import {logInfo} from "../util/logger";

export function getAffairsByCount(req,res,next){

  let {pageNum,pageSize} = req.query;
  if(req.user.admin.name=="root"){
    MaterialForm.countDocuments({},(err,count)=>{
      if (err) {
        res.status(400)
        res.json({
          msg: JSON.stringify(err)
        });
      } else {
        MaterialForm.find({}, {
          item_name: 1,
          item_code: 1,
          update_date:1,
          create_user:1,
          _id: 0
        }).skip((pageNum - 1) * pageSize).limit(parseInt(pageSize)).exec((err, doc) => {
          if (err) {
            res.status(400)
            res.json({
              msg: JSON.stringify(err)
            })
          } else {
            res.json({
              result: doc,
              total: count,
              msg: '查询成功'
            })
          }
        })
      }
    })
  }else {
    MaterialForm.countDocuments({create_user: req.user.admin.name}, (err, count) => {
      if (err) {
        res.status(400)
        res.json({
          msg: JSON.stringify(err)
        });
      } else {
        MaterialForm.find({create_user: req.user.admin.name}, {
          item_name: 1,
          item_code: 1,
          update_date:1,
          create_user:1,
          _id: 0
        }).skip((pageNum - 1) * pageSize).limit(parseInt(pageSize)).exec((err, doc) => {
          if (err) {
            res.status(400)
            res.json({
              msg: JSON.stringify(err)
            })
          } else {
            res.json({
              result: doc,
              total: count,
              msg: '查询成功'
            })
          }
        })
      }
    })
  }
}
export function getAffairsByItemName(req,res,next){

  let {itemName} = req.query;
  let reg = new RegExp(itemName);
  if(req.user.admin.name=="root"){
    MaterialForm.find({}, {
      item_name: 1,
      item_code: 1,
      update_date:1,
      create_user:1,
      _id: 0
    }).or([{"item_name": reg}]).exec((err, doc) => {
      if (err) {
        res.status(400)
        res.json({
          msg: JSON.stringify(err)
        })
      } else {
        res.json({
          result: doc,
          msg: '查询成功'
        })
        logInfo("查询事项名", req.user.admin.name, 2,doc.item_code);
      }
    })
  }else {
    MaterialForm.find({create_user: req.user.admin.name}, {
      item_name: 1,
      item_code: 1,
      update_date:1,
      create_user:1,
      _id: 0
    }).or([{"item_name": reg}]).exec((err, doc) => {
      if (err) {
        res.status(400)
        res.json({
          msg: JSON.stringify(err)
        })
      } else {
        res.json({
          result: doc,
          msg: '查询成功'
        })
        logInfo("查询事项名", req.user.admin.name, 2,doc.item_code);
      }
    })
  }
}

export function removeAffairsByItemCode(req,res,next){

  let {item_code} = req.body;
  MaterialForm.remove({"item_code":item_code.toString()},(err,result)=>{
    if(err){
      res.status(400)
      res.json({
        msg:JSON.stringify(err)
      })
      logInfo("删除记录失败", req.user.admin.name, 2,item_code);
    }else
    {
      res.json({
        msg:'删除成功',
      })
      logInfo(`删除记录成功`,req.user.admin.name,2,item_code);
    }
  })
}
export function removeAffairsByItemCodes(req,res,next){

  let {ItemCode} = req.body;
  console.log(ItemCode)
  MaterialForm.deleteMany({"item_code":{$in:ItemCode}},(err,result)=>{
    if(err){
      res.status(404);
      res.json({
        msg:'删除失败'
      })
      logInfo("删除多项记录失败", req.user.admin.name, 3,ItemCode);
    }else{
      res.json({
        msg:'删除成功',
        result:result
      })
      logInfo(`删除了多项记录成功`,req.user.admin.name,3,ItemCode);
    }
  })
}
export function updateItem(req,res,next){

  let {item_code,item_name,item_content,basis,conditions,materials,legal_limit,promise_limit,phone_numbers_address,
    consult_QR_code,service_QR_code,addresses,phone_numbers,status} = req.body;
  MaterialForm.update({"item_code":item_code},{"item_name":item_name,
    "item_content":item_content,"basis":basis,"conditions":conditions,
    "materials":materials,"legal_limit":legal_limit,"promise_limit":promise_limit,
    "phone_numbers_address":phone_numbers_address,
    "consult_QR_code_path":consult_QR_code,"service_QR_code_path":service_QR_code,
    "addresses":addresses,"phone_numbers":phone_numbers,"update_date":Date.now(),
    "status":status},(err,result)=>{
    if(err){
      res.status(405);
      res.json({
        msg:err.message,
      })
      logInfo(`更新事项失败`,req.user.admin.name,2,item_code);
    }else{
      res.json({
        msg:'修改成功',
        result:result
      })
      logInfo(`更新事项成功`,req.user.admin.name,2,item_code);
    }
  })
}
//可能需要一个拿特定事项然后进行修改操作的接口
export function getOneAffairs(req,res){
  let {item_code} = req.query;
  MaterialForm.findOne({item_code:item_code},(err,result)=>{
    if(err){
      res.status(500)
      res.json({
        msg:JSON.stringify(err)
      })
    }else{
      res.json({
        result:result,
        msg:'返回特定事项'
      })
    }
  })
}
//输入表单的接口
export function setMaterialForm(req,res){
  let {item_name,item_code,item_content,basis,conditions,materials,legal_limit,promise_limit,phone_numbers,addresses,service_QR_code,consult_QR_code,phone_numbers_address}
    = req.body;
  console.log(conditions)
  console.log(phone_numbers_address)
  console.log(phone_numbers)
  console.log(addresses)
  let doc = {
    item_name,item_code,item_content,basis,conditions,materials,legal_limit,promise_limit,phone_numbers,addresses,phone_numbers_address,
    consult_QR_code_path:consult_QR_code,
    service_QR_code_path:service_QR_code,
    create_user:req.user.admin.name,
  }
  console.log(doc)
  MaterialForm.create(doc,(err,result)=>{
    if(err){
      logInfo("创建输入表单失败",req.user.admin.name,2,item_code)
      res.status(500);
      res.json({
        msg:JSON.stringify(err)
      })
    }else{
      logInfo("创建输入表单成功",req.user.admin.name,2,item_code);
      res.json({
        msg:'创建表单成功'
      })
    }
  })
}
