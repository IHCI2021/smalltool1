import * as BASE64 from "./constants";
import React from "react";
import axios from "axios";
import {Button} from 'antd';
import ExcelJS from 'exceljs'

// import  './App.css';

const textStyle={
  color:'#038DCB',
  textAlign:"center",
  fontSize:"35px",
  width: "60px", 
  position: "relative",
  top:"50%",
  transform: "translateY(-50%)"
}
//bgl.png和logo.jpg
const img1Style = {
  background: `url(${BASE64.BASE64_COL.img1}) left 100px top no-repeat,url(${BASE64.BASE64_COL.img5}) right top no-repeat`,
  backgroundSize: "100px 100px",
  height: "200px ",
  width: "100% ",
  position: "relative",
  Display: "flex",
};
//p1.jpg

const img2Style = {
  textAlign:"center",
  width: "70px",
  border:"solid 5px grey", 
  position: "relative",
  Display: "flex",
};

//p2.jpg
const img3Style = {
  textAlign:"center",
  width: "70px",
  border:"solid 5px grey", 
  position: "relative",
  Display: "flex",
};
//bottom.jpg
const img4Style = {
  width: "1210px",
  height: "300px",
  background: `url(${BASE64.BASE64_COL.img4})  bottom no-repeat`,
};
//p3.jpg
const img5Style = {
  background: `url(${BASE64.BASE64_COL.img6})`,
  backgroundSize: "100% 100%",
  width: "70px",
  backgroundRepeat: "no-repeat",
  position: "relative",
  Display: "flex",
};
//p4.jpg
const img6Style = {
  background: `url(${BASE64.BASE64_COL.img7})`,
  backgroundSize: "100% 100%",
  width: "70px",
  backgroundRepeat: "no-repeat",
  position: "relative",
  Display: "flex",
};

class RecordTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [{}],
    };
  }
  componentWillMount() {
    let data = {
      item_code: this.props.routeParams.item_code,
    };
    let usertoken = "";
    if (typeof window != "undefined") {
      usertoken = localStorage.getItem("token");
    }
    axios({
      method: "get",
      url: "http://localhost:8000/api/material/getItemByCode",
      params: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: usertoken,
        // 'Authorization':""
      },
    }).then((res) => {
      let tposts = res.data.result;
      this.setState({ posts: tposts });
    });
  }

  exportExcel=()=>{    
    // 创建表
    //#region 
    // 要导出的数据
    let excelData=this.state.posts;
    // 创建工作簿
    const workbook=new ExcelJS.Workbook();
    // 创建工作表
    const sheet=workbook.addWorksheet('Sheet1');
    //#endregion
    // 页面设置
    //#region 
    sheet.pageSetup={fitToPage: true, fitToHeight: 5, fitToWidth: 7}
    sheet.pageSetup.paperSize=9;
    sheet.pageSetup.showGridLines=true;
    sheet.pageSetup.margins={
      left:0.1,right:0.1,
      top:0.1,bottom:0.3,
      footer:0.1
    }
    sheet.headerFooter.oddFooter="第 &P 页,共 &N 页"
    //#endregion
    
    // 给sheet每一列设置样式
    //#region 
    sheet.getColumn(1).font={
      size:14
    }
    sheet.getColumn(1).width=17;
    sheet.getColumn(2).width=28;
    sheet.getColumn(3).width=60;
    sheet.getColumn(1).alignment={vertical: 'middle', horizontal: 'center',wrapText: true}
    sheet.getColumn(2).alignment={vertical: 'middle', horizontal: 'center',wrapText: true}
    sheet.getColumn(3).alignment={vertical: 'middle', horizontal: 'center',wrapText: true}
    sheet.getColumn(2).font={
      size:14
    }
    sheet.getColumn(3).font={
      size:14
    }
    const row1=sheet.getRow(1);
    row1.height=85;
    row1.font={
      size:18
    }
    //#endregion
    
    // 计算该页面需要多少height
    function countNumber(length){
      let a=Math.ceil(length/22);
      let b=a*20;
      if(b>409){
        return 409;
      }else{
        return b;
      }
    }

    
    //用于分页的函数和变量
    //#region 

    // 什么时候分页，并且添加一个空白的表格
    const pageLength=720;
    // 当前页面的长度
    let totalLength=0;
    // 除去当前格的前面的当前页面的长度
    let totalLengthLast=0;
    // 第几页
    let Page=1;
    // 加过的次数
    let AddTime=0;
    // 上次B列merge到这里
    let merge_end=0;
    // 上次A列merge到这里
    let merge_end_A=0;
    // 是否是图片
    let flag=false;

     let img_foot=BASE64.BASE64_COL.img4;
     let image3=workbook.addImage({
      base64:img_foot,
      extension:'jpeg'
    })   
     let img_bottom=BASE64.BASE64_COL.p10;
     let image10=workbook.addImage({
      base64:img_bottom,
      extension:'jpeg'
    })   
    
    function newPage(){
      // 没到一页
      if(totalLength<pageLength) {
        return;
      }
      // 刚好一页
      else if(totalLength==pageLength){
        totalLength=0;
        totalLengthLast=0;
        console.log(Page,i);
        sheet.addImage(image10,{
          tl:{col:0,row:Page},
          // br:{col:3,row:i},
          ext:{width:770,height:960},
          editAs: 'undefined'
        });
        Page=i;
        return;
      }
      // 是图片
      else if(flag==true){
        totalLength=100;
        let b=pageLength-totalLengthLast;
        totalLengthLast=0;
        sheet.getRow(i).height=b;
        sheet.getRow(i+1).height=100;
        sheet.getCell('A'+(i+1)).value=sheet.getCell('A'+i).value;
        sheet.getCell('B'+(i+1)).value=sheet.getCell('B'+i).value;
        merge_end_A=i+1;
        sheet.getCell('A'+i).value='';
        sheet.getCell('B'+i).value='';
        sheet.addImage(image10,{
          tl:{col:0,row:Page},
          // br:{col:3,row:i},
          ext:{width:770,height:960},
          editAs: 'undefined'
        });
        i++;
        Page=i;
        flag=false;
        AddTime++;
        return ;
      }
      // 超过一页
      else{
        //b是该页余下的部分
        let b=pageLength-totalLengthLast;
        //22/20，如果是文字的解法
        let length=Math.floor(b*1.1);
        let first=sheet.getCell('C'+i).value.substring(0,length);
        let end=sheet.getCell('C'+i).value.substring(length);
        // 处理C列
        // 前一页的内容表格
        sheet.getCell('C'+i).value=first;
        sheet.getRow(i).height=b;
        image10=workbook.addImage({
          base64:img_bottom,
          extension:'jpeg'
        }) 
        sheet.addImage(image10,{
          tl:{col:0,row:Page},
          // br:{col:3,row:i},
          ext:{width:770,height:960},
          editAs: 'undefined'
        });
        // 第二页
        sheet.getCell('C'+(i+1)).value=end;
        // 处理B列
        sheet.mergeCells('B'+merge_end,'B'+i);
        merge_end=i+1;
        // 处理A列
        sheet.mergeCells('A'+merge_end_A,'A'+i);
        merge_end_A=i+1;
        sheet.getRow(i+1).height=countNumber(sheet.getCell('C'+(i+1)).value.length);
        totalLength=sheet.getRow(i+1).height;
        Page=i;
        AddTime++;
        totalLengthLast=0;
        i++;
        return;
      }
    }

    //#endregion
    
    // 页头 & 不变的事项part
    const img_head= BASE64.BASE64_COL.img1;
    const image2=workbook.addImage({
      base64:img_head,
      extension:'jpeg'
    })
     sheet.addImage(image2,{
       tl:{col:0.1,row:0.3},
       ext:{width:100,height:100},
       editAs: 'oneCell'
     });
    const img_bgl= BASE64.BASE64_COL.bgl1;
    const image_bgl=workbook.addImage({
      base64:img_bgl,
      extension:'jpeg'
    })
    //  sheet.addImage(image_bgl,{
    //    tl:{col:1,row:0.3},
    //    ext:{width:100,height:100},
    //    editAs: 'oneCell'
    //  });
    sheet.addImage(image_bgl,'B1:C1')
    //#region 
    sheet.pageSetup.printTitlesRow = '1:1';
    // 设置标题 办事指南
    sheet.mergeCells('B1:C1');
    sheet.getCell('B1').value=excelData.item_name+'办事指南';
    // ------事项part--------
    sheet.mergeCells('A2:A5');
    sheet.getCell('A3').value='事项';
  
    // 表格内容
    sheet.getCell('B2').value="事项名称";
    sheet.getCell('C2').value=excelData.item_name;
    sheet.getRow(2).height=countNumber(excelData.item_name.length);
    totalLength=sheet.getRow(2).height;

    sheet.getCell('B3').value="事项编码";
    sheet.getCell('C3').value=excelData.item_code;
    sheet.getRow(3).height=countNumber(excelData.item_code.length);
    totalLengthLast=totalLength;
    totalLength+=sheet.getRow(3).height;
    

    sheet.getCell('B4').value="事项内容（文件名、文件）";
    sheet.getCell('C4').value=excelData.item_content;
    sheet.getRow(4).height=countNumber(excelData.item_content.length)>40?countNumber(excelData.item_content.length):40;
    totalLengthLast=totalLength;
    totalLength+=sheet.getRow(4).height;
    merge_end=4;

    sheet.getCell('B5').value="政策依据（文件名、文号）";
    sheet.getCell('C5').value=excelData.basis;
    sheet.getRow(5).height=countNumber(excelData.basis.length);
    totalLengthLast=totalLength;
    totalLength+=sheet.getRow(5).height;
    let i=5;
    newPage();
    merge_end_A=i+1;
    //#endregion

    // -------申办资格审核------------
    //申办所需资格条件
    //#region 
    // 先配置再merge
    
    sheet.getCell('A'+(i+1)).value="申办资格审核";
    sheet.getCell('B'+(i+1)).value="申办所需资格条件"

    let conditions_lenght=excelData.conditions.length;
    // i是下一次要使用的  
    i++;
    merge_end=i;
    for(let m=0;m<conditions_lenght;i++,m++){
      sheet.getCell('C'+i).value='条件'+(m+1)+': '+excelData.conditions[m];
      sheet.getRow(i).height=countNumber(excelData.conditions[m].length);
      totalLengthLast=totalLength;
      totalLength+=sheet.getRow(i).height;
      newPage();
    }
    sheet.mergeCells('B'+merge_end,'B'+(i-1));
    sheet.getCell('B'+merge_end).value="申办所需资格条件";
    merge_end=i;
    //#endregion

    // 申办材料
    //#region 
    let materials_length=excelData.materials.length;
  
    sheet.getCell('B'+i).value="申办材料";
    for(let m=0;m<materials_length;i++,m++){
      sheet.getCell('C'+i).value='材料'+(m+1)+': '+excelData.materials[m];
      sheet.getRow(i).height=countNumber(excelData.materials[m].length);
      totalLengthLast=totalLength;
      totalLength+=sheet.getRow(i).height;
      newPage();
    }

    sheet.mergeCells('B'+merge_end,'B'+(i-1));
    merge_end=i;

    sheet.getCell('B'+i).value="审核时限";
    sheet.getCell('C'+i).value=excelData.legal_limit;
    sheet.getRow(i).height=countNumber(sheet.getCell('C'+i).value.length);
    totalLengthLast=totalLength;
    totalLength+=sheet.getRow(i).height;
    newPage();
    i++;
    sheet.mergeCells('A'+merge_end_A,'A'+(i-1));
    sheet.getCell('A'+merge_end_A).value="申办资格审核";
    merge_end_A=i;
    merge_end=i;
  //   // #endregion


    // --------业务咨询part--------

    //#region 
    sheet.getCell('A'+i).value="业务咨询"
    sheet.getCell('B'+i).value="咨询电话";
    sheet.getCell('C'+i).value=excelData.phone_numbers;
    sheet.getRow(i).height=countNumber(sheet.getCell('C'+i).value.length);
    totalLengthLast=totalLength;
    totalLength+=sheet.getRow(i).height;
    newPage();
    i++;
    sheet.getCell('B'+i).value='咨询平台';
    sheet.getCell('C'+i).value=excelData.consult_platform;
    sheet.getRow(i).height=countNumber(sheet.getCell('C'+i).value.length);
    totalLengthLast=totalLength;
    totalLength+=sheet.getRow(i).height;
    newPage();
    sheet.mergeCells('B'+merge_end,'B'+(i-1));
    sheet.mergeCells('A'+merge_end_A,'A'+i);
    sheet.getCell('A'+merge_end_A).value="业务咨询";
    i++;
    merge_end_A=i;
    merge_end=i;
  //#endregion

  // ----------业务办理part---------
  //#region 
    sheet.getCell('A'+i).value="业务办理"
    sheet.getCell('B'+i).value="二维码";
    const img_service=excelData.service_QR_code_path;

    if(img_service.length<100){
      sheet.getCell('C'+i).value='暂无'
      sheet.getRow(i).height=20;
      totalLengthLast=totalLength;
      totalLength+=sheet.getRow(i).height;
      newPage();
    }else{
      const image5=workbook.addImage({
        base64:img_service,
        extension:'jpeg'
      })
      sheet.getRow(i).height=100;
      totalLengthLast=totalLength;
      totalLength+=100;
      flag=true;
      newPage();  
      sheet.addImage(image5,{
        tl:{col:2.9,row:i-0.5},
        ext:{width:100,height:100},
        editAs: 'oneCell'
      })     
    }
    i++;
    merge_end=i;
    sheet.getCell('B'+i).value="网办PC端";

      sheet.getCell('C'+i).value=excelData.network_PC;
      sheet.getRow(i).height=countNumber(excelData.network_PC.length);
      totalLengthLast=totalLength;
      totalLength+=sheet.getRow(i).height;
      newPage();
      i++;
    sheet.getCell('B'+i).value="网办移动端";

      sheet.getCell('C'+i).value=excelData.network_mobile;
      sheet.getRow(i).height=countNumber(excelData.network_mobile.length);
      totalLengthLast=totalLength;
      totalLength+=sheet.getRow(i).height;
      newPage();
      i++;
    sheet.getCell('B'+i).value="自助终端";

      sheet.getCell('C'+i).value=excelData.self_help;
      sheet.getRow(i).height=countNumber(excelData.self_help.length);
      totalLengthLast=totalLength;
      totalLength+=sheet.getRow(i).height;
      console.log(totalLength,totalLengthLast);
      newPage();
      i++;
    sheet.mergeCells('A'+merge_end_A,'A'+(i-1));
    //#endregion
    // 最后一页
    if(totalLength<pageLength){
      console.log(pageLength,totalLength);
      let b=pageLength-totalLength;
      if(b>409.5){
        sheet.getRow(i).height=409.5;
        sheet.getRow(i+1).height=b-409.5;
        i++;
      }else{
        sheet.getRow(i).height=b;
      }
      image10=workbook.addImage({
        base64:img_bottom,
        extension:'jpeg'
      })   
      sheet.addImage(image10,{
        tl:{col:0,row:Page},
        // br:{col:3,row:i},
        ext:{width:770,height:960},
        editAs: 'undefined'
      });
    }



    function openDownloadDialog(url, saveName) {
      if (typeof url == 'object' && url instanceof Blob) {
          url = URL.createObjectURL(url); // 创建blob地址
      }
      let aLink = document.createElement('a');
      aLink.href = url;
      aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      let event;
      if (window.MouseEvent) event = new MouseEvent('click');
      else {
          event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      aLink.dispatchEvent(event);
  }

  let area='A1:C'+i;
  sheet.pageSetup.printArea=area;
  let fileName=excelData.item_name+"办事指南";
  //导出 
  let buffer=workbook.xlsx.writeBuffer(); 
  buffer.then(res=>{
    let blob=new Blob([res],{type: "application/octet-stream"});
    openDownloadDialog(blob, fileName + '.xlsx');
  })
    
    // workbook.xlsx.writeBuffer().then((buf)=>{
    //     let blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
    //     const downloadElement = document.createElement('a');
    //     let href = window.URL.createObjectURL(blob)
		//     downloadElement.href = href
		//     downloadElement.download = excelData.item_name+"办事指南"+".xlsx"; // 文件名字
    //     document.body.appendChild(downloadElement)
		//     downloadElement.click()
		//     document.body.removeChild(downloadElement) // 下载完成移除元素
		//     window.URL.revokeObjectURL(href) // 释放掉blob对象
    // })    
  }
  render() {
    let cnarray = this.state.posts.conditions;
    let maarray = this.state.posts.materials;

    const qrcode1 =
      "data:image/jpeg;base64," + this.state.posts.consult_QR_code_path;
    const qrcode2 =
      "data:image/jpeg;base64," + this.state.posts.service_QR_code_path;
    const qrcode1Style = {
      maxWidth: "100%",
      maxHeight: "100%",
      display: "block",
      margin: "auto",
      background: `url(${qrcode1}) left  top no-repeat`,
    };
    const qrcode2Style = {
      maxWidth: "100%",
      maxHeight: "100%",
      display: "block",
      margin: "auto",
      background: `url(${qrcode2}) left  top no-repeat`,
    };
    return (
      <div id={'billDetails'}>
        
        <div
          style={{
            minWidth: "1210px",
            width: "1210px",
            margin: "0 auto",
          }}
        >
          {/* 广州人设 */}
          <div style={img1Style}></div>
          {/* 旁边的装饰 */}
          <div
            style={{
              position: "relative",
              display: "block",
              textAlign: "center",
              width: "1210px",
              top: "-200px",
            }}
          >
            {/* 办事指南 */}
            <h1
              style={{
                display: "inlineblock",
                fontSize: "48px",
                color: "#0374B7",
                position: "relative",
                top: "250px",
                left: "400px",
                letterSpacing: "20px",
                width: "400px",
              }}
            >
              办事指南
            </h1>
            {/* 导出excel的按钮 */}
            <Button 
             style={{
              fontSize: "18px",
              position:"absolute",
              width:'120px',
              height:'50px',
              top:"265px",
              left:"750px"
             }}
            type="primary" onClick={this.exportExcel.bind(this)}>导出excel</Button>
            {/* item_name */}
            <h1
              style={{
                fontSize: "48px",
                color: "#0374B7",
                position: "relative",
                top: "70px",
                left: "100px",
                letterSpacing: "20px",
                width: "1000px",
                height: "100px",
              }}
            >
              {this.state.posts.item_name}
            </h1>
          </div>
          
          <div
            style={{
              display: "-webkit-flex" /* Safari */,
              Display: "flex",
              minWidth: "1210px",
              width: "1210px",
              margin: "0 auto",
              position: "relative",
              top: "-10px",
              marginTop: "-30px",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "-webkit-flex" /* Safari */,
                Display: "flex",
                flex: "11",
              }}
            >
              {/* 事项 */}
              <div style={img2Style}>
                <div style={textStyle}>
                事项
                </div>
              </div>
            </div>
            <div
              style={{
                display: "-webkit-flex",
                Display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignContent: "space-around",
                width: "1076.9px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  lineHeight: "50px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                事项名称
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "20px",

                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.item_name}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  lineHeight: "50px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                事项编码
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "18px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.item_code}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                  lineHeight:"50px"
                }}
              >
                事项内容（待遇标准）
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "20px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.item_content}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  lineHeight: "65px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                政策依据（文件名，文号）
              </div>
              <div
                style={{
                  lineHeight: "35px",
                  fontSize: "20px",
                  width: "660px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",

                  textIndent: "2rem",
                }}
              >
                {this.state.posts.basis}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "-webkit-flex" /* Safari */,
              Display: "flex",
              minWidth: "1210px",
              width: "1210px",
              margin: "0 auto",
              position: "relative",

              top: "-10px",

              marginTop: "30px",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "-webkit-flex" /* Safari */,
                Display: "flex",
                flex: "11",
              }}
            >
              <div style={img3Style}>
                <div style={textStyle}>
                  申办资格审核
                </div>
                </div>
            </div>
            <div
              style={{
                display: "-webkit-flex",
                Display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignContent: "space-around",
                width: "1076.9px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  position: "relative",
                  Display: "flex",
                  fontSize: "20px",
                  minHeight:'100px',
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                申办所需资格条件
              </div>
              <div
                style={{
                  position: "relative",
                  Display: "flex",
                  fontSize: "20px",
                  lineHeight: "25px",
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {cnarray &&
                  cnarray.map((item, index) => (
                    <li
                      style={{
                        listStyle: "none",
                      }}
                    >
                      {index + 1 + "." + item}
                    </li>
                  ))}
              </div>
              <div
                style={{
                  position: "relative",
                  Display: "flex",
                  fontSize: "20px",
                  minHeight:"100px",
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  top: "6px",
                  textIndent: "2rem",
                }}
              >
                申办材料
              </div>
              <div
                style={{
                  position: "relative",
                  Display: "flex",
                  fontSize: "20px",
                  lineHeight: "32px",
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  top: "6px",
                  textIndent: "2rem",
                }}
              >
                {maarray &&
                  maarray.map((item, index) => (
                    <li
                      style={{
                        listStyle: "none",
                      }}
                    >
                      {index + 1 + "." + item}
                    </li>
                  ))}
              </div>
              <div
                style={{
                  position: "relative",
                  Display: "flex",
                  fontSize: "18px",
                  lineHeight: "60px",
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  top: "12px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                审核时限
              </div>

              <div
                style={{
                  position: "relative",
                  Display: "flex",
                  fontSize: "20px",
                  lineHeight: "60px",
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  top: "12px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                <div
                  style={{
                    display: "inline",
                  }}
                >
                  {" "}
                  审核时限：{this.state.posts.legal_limit}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "-webkit-flex" /* Safari */,
              Display: "flex",
              minWidth: "1210px",
              width: "1210px",
              margin: "0 auto",
              position: "relative",

              top: "60px",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "-webkit-flex" /* Safari */,
                Display: "flex",
                flex: "11",
              }}
            >
              <div style={img2Style}>
                <div style={textStyle}>咨询</div>
              </div>
            </div>
            <div
              style={{
                display: "-webkit-flex" /* Safari */,
                Display: "flex",
                justifyContent: "space-around",
                alignContent: "space-around",
                width: "1076.9px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  lineHeight: "50px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                咨询电话
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "18px",

                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.phone_numbers}
              </div>
              
              <div
                style={{
                  fontSize: "18px",
                  lineHeight: "50px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                咨询平台
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "18px",

                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.consult_platform}
              </div>
              

              
            </div>
          </div>

          <div
            style={{
              display: "-webkit-flex" /* Safari */,
              Display: "flex",
              minWidth: "1210px",
              width: "1210px",
              margin: "0 auto",
              position: "relative",

              top: "70px",
              marginTop: "30px",
              marginBottom: "180px",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "-webkit-flex" /* Safari */,
                Display: "flex",
                flex: "11",
              }}
            >
              <div style={img2Style} >
                <div style={textStyle}>业务办理</div>
              </div>
            </div>
            <div
              style={{
                display: "-webkit-flex" /* Safari */,
                Display: "flex",
                justifyContent: "space-around",
                alignContent: "space-around",
                width: "1076.9px",
                flexWrap: "wrap",
              }}
            >
                <div
                style={{
                  fontSize: "18px",
                  lineHeight: "50px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                二维码
              </div>
              <div
                style={{
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  height: "300px",
                }}
              >
                <img
                  src={
                    this.state.posts.service_QR_code_path
                  }
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "18px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                网办PC端
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "18px",

                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.network_PC}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                网办移动端
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "18px",

                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.network_mobile}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                自助终端
              </div>
              <div
                style={{
                  lineHeight: "50px",
                  fontSize: "18px",

                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {this.state.posts.self_help}
              </div>
              
            </div>
          </div>

          <p></p>
        </div>

        <div
          style={{
            minWidth: "1210px",
            margin: "0 auto",
            marginTop: "-180px",
            width: "1210px",
            zIndex: "0",
            left: "100px",
            bottom: "0px",
          }}
        >
          <div style={img4Style} />
        </div>
      </div>
    );
  }
}

export default RecordTest;
