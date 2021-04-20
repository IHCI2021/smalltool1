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
  exportExcel=()=>{
    // 要导出的数据
    let excelData=this.state.posts;
    let data=[];
    // 创建工作簿
    const workbook=new ExcelJS.Workbook();
    // 创建工作表
    const sheet=workbook.addWorksheet('Sheet1',{properties:{defaultColWidth:16,defaultRowHeight:53}});
    sheet.pageSetup.horizontalCentered=true;
    sheet.pageSetup.verticalCentered=true;

    // 设置标题 办事指南
    sheet.mergeCells('B1:C1');
    sheet.getCell('B1').value=excelData.item_name+'办事指南';

    // ------事项part--------
    sheet.mergeCells('A2:A5');
    sheet.getCell('A3').value='事项';
  
    // 表格内容
    sheet.getCell('B2').value="事项名称";
    sheet.getCell('C2').value=excelData.item_name;

    sheet.getCell('B3').value="事项编码";
    sheet.getCell('C3').value=excelData.item_code;

    sheet.getCell('B4').value="事项内容（文件名、文件）";
    sheet.getCell('C4').value=excelData.item_content;

    sheet.getCell('B5').value="政策依据（文件名、文号）";
    sheet.getCell('C5').value=excelData.basis;

    // -------申办资格审核------------6-materials_end+1
    let conditions_lenght=excelData.conditions.length;
    let conditions_end=5+conditions_lenght;  

    let materials_length=excelData.materials.length;
    let materials_end=conditions_end+materials_length;

    let phone_length=excelData.phone_numbers_address.length;
    let phone_end=materials_end+2+phone_length;

    let address_length=excelData.addresses.length;
    let address_end=address_length+1+phone_end;


    sheet.mergeCells('A6','A'+(materials_end+1));
    sheet.getCell('A7').value="申办资格审核";
    

    sheet.mergeCells('B6','B'+conditions_end);
    sheet.getCell('B6').value="申办所需资格条件";
    for(let i=6,m=0;i<=conditions_end;i++,m++){
      sheet.getCell('C'+i).value='条件'+(m+1)+': '+excelData.conditions[m];
    }
    // 申办材料也是array类型

    sheet.mergeCells('B'+(conditions_end+1),'B'+materials_end);
    sheet.getCell('B'+(conditions_end+1)).value="申办材料";
    for(let i=conditions_end+1,m=0;i<=materials_end;i++,m++){
      sheet.getCell('C'+i).value='材料'+(m+1)+': '+excelData.materials[m];
    }
    

    sheet.getCell('B'+(materials_end+1)).value="审核时限";
    sheet.getCell('C'+(materials_end+1)).value="法定办结时限:"+excelData.legal_limit+"  "+"承诺办结时限:"+excelData.promise_limit;
    
    // --------业务咨询part--------materials_end+2,
    sheet.mergeCells('A'+(materials_end+2),'A'+phone_end);
    sheet.getCell('A'+phone_end).value="业务咨询"
    
    
    // 申办所需资格条件是array类型
    sheet.getCell('B'+(materials_end+2)).value="网络咨询平台";
    const img1=excelData.consult_QR_code_path;
    if(img1==''){
      sheet.getCell('C'+(materials_end+2)).value='暂无'
    }else{
      const image1=workbook.addImage({
        base64:img1,
        extension:'jpeg'
      })
      let range='C'+(materials_end+2)+':C'+(materials_end+2)
      sheet.addImage(image1,range)
    }
    sheet.mergeCells('B'+(materials_end+3),'B'+phone_end)
    
    sheet.getCell('B'+(materials_end+3)).value="咨询电话";
    for(let i=materials_end+3,m=0;i<=phone_end;i++,m++){
      sheet.getCell('C'+i).value='地址'+(m+1)+': '+excelData.phone_numbers_address[m]+"  电话" +(m+1)+': '+excelData.phone_numbers[m];
    }
    
    // ----------业务办理part---------
    
    sheet.mergeCells('A'+(phone_end+1),'A'+address_end);
    sheet.getCell('A'+(phone_end+1)).value="业务办理"
    sheet.getCell('B'+(phone_end+1)).value="业务办理二维码";
    const img_service=excelData.service_QR_code_path;

    if(img_service==''){
      sheet.getCell('C'+(phone_end+1)).value='暂无';
    }else{
      const image5=workbook.addImage({
        base64:img_service,
        extension:'jpeg'
      })
      let range1='C'+(phone_end+1)+':C'+(phone_end+1)
      sheet.addImage(image5,range1)
    }
  
    sheet.mergeCells('B'+(phone_end+2),'B'+address_end)
    sheet.getCell('B'+(phone_end+2)).value="办事大厅地址";

    for(let i=phone_end+2,m=0;i<=address_end;i++,m++){
      sheet.getCell('C'+i).value='地址'+(m+1)+': '+excelData.addresses[m];
    }

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
   let range2='A'+(address_end+1)+':C'+(address_end+1)
   sheet.addImage(image3,range2)
   
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
