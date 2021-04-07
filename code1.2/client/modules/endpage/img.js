import * as BASE64 from "./constants";
import React from "react";
import axios from "axios";
import { Button, Divider } from "antd";
import ExcelJS from 'exceljs'
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
      usertoken = localStorage.getItem("token")
    }
    axios({
      method: "get",
      url: "http://localhost:8000/api/material/getItemByCode",
      params: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: usertoken,
      },
    }).then((res) => {
      let tposts = res.data.result;
      this.setState({ posts: tposts });
    });
  }
  exportDefaultExcel=()=>{
      const list=this.state.posts;
      const data=[];
      let i=0;
      let b;
      for(let a in list){
          console.log(a);
          b=a;
          switch(a){
            case "conditions":
              b='申办所需资格条件';
              break;
            case "materials":
              b="申办材料";
              break;
            case "basis":
              b="政策依据（文件名，文号）";
              break;
            case "addresses":
              b="办事大厅地址";
              break;
            case "item_name":
              b="事项名称";
              break;
            case 'item_code':
              b="事项代码";
              break;
            case 'item_content':
              b="事项内容(待遇标准)"
              break;
          }
          data.push({
            key:i,
            item_name:b,
            item_con:list[a]
          })
      }
      const header=[
        {k:'item_name',v:'名称'},
        {k:'item_con',v:'内容'}
      ]
      exportExcel(header,data);
      
  }
  exportExcel=()=>{
    

    // 要导出的数据
    let excelData=this.state.posts;
    let data=[];
    // 创建工作簿
    const workbook=new ExcelJS.Workbook();
    // 创建工作表
    // const sheet=workbook.addWorksheet('Sheet1');
    const sheet=workbook.addWorksheet('Sheet1',{properties:{defaultColWidth:16,defaultRowHeight:53}});
    sheet.pageSetup.horizontalCentered=true;
    sheet.pageSetup.verticalCentered=true;
    // 设置合并单元格
    sheet.mergeCells('B1:C1');
    sheet.getCell('B1').value=excelData.item_name+'办事指南';
    sheet.mergeCells('A2:A5');
    sheet.getCell('A3').value='事项';
    sheet.mergeCells('A6:A8');
    sheet.getCell('A7').value="申办资格审核";
    sheet.mergeCells('A9:A10');
    sheet.getCell('A10').value="业务咨询"
    sheet.mergeCells('A11:A12');
    sheet.getCell('A12').value="业务办理"


    // 表格内容
    sheet.getCell('B2').value="事项名称";
    sheet.getCell('C2').value=excelData.item_name;

    sheet.getCell('B3').value="事项编码";
    sheet.getCell('C3').value=excelData.item_code;

    sheet.getCell('B4').value="事项内容（文件名，文件）";
    sheet.getCell('C4').value=excelData.item_content;

    sheet.getCell('B5').value="政策依据（文件名、文号）";
    sheet.getCell('C5').value=excelData.basis;

    sheet.getCell('B6').value="申办所需资格条件";
    sheet.getCell('C6').value=excelData.conditions;

    sheet.getCell('B7').value="申办材料";
    sheet.getCell('C7').value=excelData.materials;

    sheet.getCell('B8').value="审核时限";
    sheet.getCell('C8').value="法定办结时限:"+excelData.legal_limit+"  "+"承诺办结时限:"+excelData.promise_limit;
    
    sheet.getCell('B9').value="网络咨询平台";
    const img1=excelData.consult_QR_code_path;
    const image1=workbook.addImage({
    base64:img1,
    extension:'jpeg'
    })
    sheet.addImage(image1,'C9:C9')

    sheet.getCell('B10').value="咨询电话";
    sheet.getCell('C10').value=excelData.phone_numbers_address+"  "+excelData.phone_numbers;

    sheet.getCell('B11').value="业务办理二维码";
    const img_service=excelData.service_QR_code_path;
    const image5=workbook.addImage({
    base64:img_service,
    extension:'jpeg'
    })
    sheet.addImage(image5,'C11:C11')

    sheet.getCell('B12').value="办事大厅地址";
    sheet.getCell('C12').value=excelData.addresses;
    // 创建表头
    /*
    header：显示的内容
    key：设置一个唯一的key作为属性名，添加行数据时与之对应
    width：设置单元格的宽
    */
  //  sheet.columns=[
  //      {header:'事项名称',key:'item_name'},
  //      {header:'事项编码',key:'item_code'},
  //      {header:'图片',key:'consult_QR_code_path'}
  //  ];
   const img_head= BASE64.BASE64_COL.img1;
   const img_foot=BASE64.BASE64_COL.img5;
   const image2=workbook.addImage({
    base64:img_head,
    extension:'jpeg'
  })
   const image3=workbook.addImage({
    base64:img_foot,
    extension:'jpeg'
  })
   sheet.addImage(image2,'A1:A1')
   sheet.addImage(image3,'A13:C15')
   // sheet.addImage(image1,'A3:C5')
   //添加行数据
    // sheet.addRow({item_name:excelData.item_name,item_code:excelData.item_code,consult_QR_code_path:image1});
    //下载excel
    workbook.xlsx.writeBuffer().then((buf)=>{
        


        let blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        const downloadElement = document.createElement('a');
        
        let href = window.URL.createObjectURL(blob)
		    downloadElement.href = href
		    downloadElement.download = excelData.item_name+"办事指南.xlsx"; // 文件名字
        document.body.appendChild(downloadElement)
		    downloadElement.click()
		    document.body.removeChild(downloadElement) // 下载完成移除元素
		    window.URL.revokeObjectURL(href) // 释放掉blob对象
    })    




  }
  render() {
    return (
      <div>
          <Button type="primary" onClick={this.exportExcel.bind(this)}>导出excel</Button>
      </div>
    );
  }
}

export default RecordTest;
