import * as BASE64 from "./constants";
import React from "react";
import axios from "axios";
import {Button } from 'antd';
import ExcelJS from 'exceljs'
// import  './App.css';

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
  backgroundImage: `url(${BASE64.BASE64_COL.img2})`,
  backgroundSize: "100% 100%",
  width: "70px",
  height: "300px",
  backgroundRepeat: "no-repeat",
  position: "relative",
  Display: "flex",
};
//p2.jpg
const img3Style = {
  background: `url(${BASE64.BASE64_COL.img3})`,
  backgroundSize: "100% 100%",
  width: "70px",
  backgroundRepeat: "no-repeat",
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
    // 要导出的数据
    let excelData=this.state.posts;
    let data=[];
    // 创建工作簿
    const workbook=new ExcelJS.Workbook();
    // 创建工作表
    const sheet=workbook.addWorksheet('Sheet1');
    sheet.pageSetup.horizontalCentered=true;
    sheet.pageSetup.verticalCentered=true;


    // 设置array类型的length
    let conditions_lenght=excelData.conditions.length;
    let conditions_end=5+conditions_lenght;  

    let materials_length=excelData.materials.length;
    let materials_end=conditions_end+materials_length;

    let phone_length=excelData.phone_numbers_address.length;
    let phone_end=materials_end+2+phone_length;

    let address_length=excelData.addresses.length;
    let address_end=address_length+1+phone_end;
    // 设置样式
    sheet.getColumn(1).font={
      size:14
    }
    sheet.getColumn(1).width=15;
    sheet.getColumn(2).width=30;
    sheet.getColumn(3).width=50;
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
    row1.height=78;
    row1.font={
      size:18
    }
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
      sheet.getRow(materials_end+2).height='100px';
      sheet.addImage(image1,{
        tl:{col:2,row:materials_end+1},
        ext:{width:100,height:100}
      })     
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
      sheet.getRow(phone_end+1).height='100px';
      // sheet.getRow(phone_end).height=50;
      sheet.addImage(image5,{
        tl:{col:2,row:phone_end},
        ext:{width:100,height:100}
      })     
    }
  
    sheet.mergeCells('B'+(phone_end+2),'B'+address_end)
    sheet.getCell('B'+(phone_end+2)).value="办事大厅地址";

    for(let i=phone_end+2,m=0;i<=address_end;i++,m++){
      sheet.getCell('C'+i).value='地址'+(m+1)+': '+excelData.addresses[m];
    }

    // 页头和页尾的照片
   const img_head= BASE64.BASE64_COL.img1;
   const img_foot=BASE64.BASE64_COL.img4;
   const image2=workbook.addImage({
    base64:img_head,
    extension:'jpeg'
  })
   const image3=workbook.addImage({
    base64:img_foot,
    extension:'jpeg'
  })
  // 设置样式
   sheet.addImage(image2,{
     tl:{col:0,row:0},
     ext:{width:100,height:100}
   });

   sheet.getRow(address_end+1).height=100;
   let range2='A'+(address_end+1)+':C'+(address_end+1)
   sheet.addImage(image3,range2,{
     ext:{width:100,height:100}
   })
    //导出  
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
    let cnarray = this.state.posts.conditions;
    let maarray = this.state.posts.materials;
    let phonearray = this.state.posts.phone_numbers;
    let phone_address_array = this.state.posts.phone_numbers_address; //新加电话地址
    let addarray = this.state.posts.addresses;
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
          <div style={img1Style}></div>
          <div
            style={{
              position: "relative",
              display: "block",
              textAlign: "center",
              width: "1210px",
              top: "-200px",
            }}
          >
            
            <h1
              style={{
                display: "inlineblock",
                fontSize: "48px",
                color: "#0374B7",
                position: "relative",
                top: "250px",
                left: "100px",
                letterSpacing: "20px",
                width: "1000px",
              }}
            >
              办事指南
            </h1>
            <Button 
             style={{
              position:"absolute",
              top:"150px",
              right:"150px"
             }}
            type="primary" onClick={this.exportExcel.bind(this)}>导出excel</Button>
            <h1
              style={{
                fontSize: "48px",
                color: "#0374B7",
                position: "relative",
                top: "-100px",
                left: "200px",
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
              <div style={img2Style} />
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
                  fontSize: "18px",
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
                  fontSize: "18px",

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
                  fontSize: "18px",
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
                  fontSize: "18px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                事项内容（待遇标准）
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
                {this.state.posts.item_content}
              </div>
              <div
                style={{
                  fontSize: "18px",
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
                  lineHeight: "65px",
                  fontSize: "18px",
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
              <div style={img3Style} />
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
                  lineHeight: "32px",
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
                  法定办结时限：{this.state.posts.legal_limit}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承诺办结时限：
                  {this.state.posts.legal_limit}
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
              <div style={img5Style} />
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
                  fontWeight: "900",
                  color: "#038DCB",
                  fontSize: "20px",
                  lineHeight: "40px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                网络咨询平台
              </div>
              <div
                style={{
                  fontWeight: "900",
                  color: "#038DCB",
                  fontSize: "20px",
                  lineHeight: "40px",
                  border: "#038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                {" "}
                咨询电话
              </div>

              <div
                style={{
                  border: " #038DCB solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  height: "115px",
                }}
              >
                <img
                  src={
                    this.state.posts.consult_QR_code_path
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
                  width: "660px",
                  height: "115px",
                }}
              >
                {phone_address_array &&
                  phone_address_array.map((item, index) => (
                    <div
                      style={{
                        fontSize: "20px",
                        textIndent: "2rem",
                        display: "inline-block",
                      }}
                    >
                      {index + 1 + "." + item + phonearray[index]}
                    </div>
                  ))}
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
              <div style={img6Style} />
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
                  fontWeight: "900",
                  color: "#038DCB",
                  fontSize: "20px",
                  lineHeight: "40px",
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
                  textIndent: "2rem",
                }}
              >
                业务办理二维码
              </div>
              <div
                style={{
                  fontWeight: "900",
                  color: "#038DCB",
                  fontSize: "20px",
                  lineHeight: "40px",
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  textIndent: "2rem",
                }}
              >
                办事大厅地址
              </div>
              <div
                style={{
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "370px",
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
                  border: "#AAAAAA solid 2px",
                  borderLeftWidth: "8px",
                  width: "660px",
                  height: "300px",
                  fontSize: "16px",
                  lineHeight: "32px",
                  textIndent: "2rem",
                }}
              >
                {addarray &&
                  addarray.map((item, index) => (
                    <li
                      style={{
                        fontSize: "20px",
                        listStyle: "none",
                      }}
                    >
                      {index + 1 + "." + item}
                    </li>
                  ))}
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
