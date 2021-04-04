import fs from "fs";

let options = {
  flags:'a',
  encoding: 'utf8'
}
let stderr = fs.createWriteStream("./log/log.log",options)
let logger = new console.Console(stderr)

export function logInfo(action,user,status,code=""){
  if(status==3){
    let codes = ""
    for(let i =0;i<code.length;i++){
      if(i==0){
        codes += "["+code[i]
      }else if(i==code.length-1){
        codes += code[i]+"]"
      }else{
        codes += " "+code[i]
      }
    }
    logger.info(`[${new Date().toLocaleString()}]  用户: ${user} 操作了: ${action} 事项代码列表为:${codes}`)
  }
  if(status==2){
    logger.info(`[${new Date().toLocaleString()}]  用户: ${user} 操作了: ${action}  事项代码为:${code}` )
  }
  if(status===1){
    logger.info(`[${new Date().toLocaleString()}]  用户: ${user} 操作了: ${action}`)
  }
  if(status===0){
    logger.warn(`[${new Date().toLocaleString()}]  用户: ${user} 操作了: ${action}`)
  }
}
