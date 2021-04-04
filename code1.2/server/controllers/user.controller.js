import User from '../models/user'
import {logInfo} from "../util/logger";
import jwt from 'jsonwebtoken'

export function login(req, res) {
  if(req.session.user!=null){
    res.status(403)
    res.json({
      msg:'请退出当前用户再登录'
    })
  }else {
    let {username, password} = req.body;
    console.log(username)
    User.findOne({username}, (err, doc) => {
      if (err) {
        res.status(500);
        res.json({
          msg: JSON.stringify(err)
        })
      } else if (doc)//存在这个用户
      {
        if (doc.password === password) {
          const token = 'Bearer ' + jwt.sign(
            {
              _id: doc._id,
              admin: {
                name: doc.username,
                create_time: doc.create_time
              }
            },
            'secret12345', {
              expiresIn: 3600 * 24 * 3 //3天
            }
          )
          req.session.user=token;
          res.json({
            token: token,
            msg: '登录成功'
          })
          logInfo("登录", username, 1);
        } else {
          res.status(400);
          res.json({
            msg: '用户名错误或者密码错误',
          })
          logInfo("登录", username, 0);
        }
      } else {
        res.status(404);
        res.json({
          msg: '该用户未注册，请先注册！',
        });
      }
    });
  }
}


export function createUser(req, res,next) {

  if(req.user.admin.name!="root"){
    res.json({
      msg:'没有权限'
    })
    logInfo("创建用户没有权限",req.user.admin.name,0);
    return;
  }
  let {username,password} = req.body;
   User.findOne({username},(err,doc)=>{
     if(err){
       res.status(500)
       res.json({
         msg:JSON.stringify(err)
       })
     }
    else if(doc){
      res.status(404)
      res.json({
        msg:'用户名已存在'
      })
    }else{
      User.create({
        'username':username,
        'password':password,
      })
      res.json({
        msg:'用户创建成功',
      })
      logInfo("创建用户成功",req.user.admin.name,1);
    }
  });
}
export  function updatePassword(req,res,next){

  let {old_password,password} = req.body;
  User.findOne({username: req.user.admin.name},(err,result)=>{
    if(!result){
      res.status(404)
      res.json({
        msg:'用户不存在'
      })
    }else {
      if (result.password != old_password) {
        res.status(404)
        res.json({
          msg: '原密码错误'
        })
      } else {
        User.updateOne({username: req.user.admin.name}, {password: password}, (err, raw) => {
          if (err) {
            res.status(500)
            res.json({
              msg: err.message
            })
          } else {
            res.json({
              msg: '修改成功'
            })
            logInfo("修改密码成功", req.user.admin.name, 1);
          }
        })
      }
    }
  })

}
export function updatePasswordByRoot(req,res,next){
  if(req.user.admin.name!="root") {
    res.json({
      msg: '没有权限'
    })
    logInfo("重置密码没有权限", req.user.admin.name, 0);
    return;
  }
  let {username,password} =req.body;
  User.updateOne({username:username},{password:password},(err,result)=>{
    if(err){
      res.status(500);
      res.json({
        msg:JSON.stringify(err)
      })
    }else{
      res.json({
        msg:'修改成功'
      })
    }
  })
}
export function logout(req,res){
  req.session.user = null;
  res.json({
    msg:'登出成功'
  })
}
//返回root可以重置密码得列表
export function getUserByRoot(req,res){
  let {pageNum,pageSize} = req.query
  User.countDocuments({},(err,count)=>{
    if(err){
      res.status(400)
      res.json({
        msg:JSON.stringify(err)
      })
    }else{
      User.find({},{username:1,create_time:1,_id:0}).skip((pageNum - 1) * pageSize).limit(parseInt(pageSize)).exec((err, doc)=>{
        if(err){
          res.status(400)
          res.json({
            msg:JSON.stringify(err)
          })
        }else{
          res.json({
            result:doc,
            total:count,
            msg:'查询成功'
          })
        }
      })
    }
  })
}
