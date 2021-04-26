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

class RecordCheck extends React.Component {
  constructor(){
    super();
    this.state={
      post:[],
    };
  }

    render(){
      console.log(this.props.post.service_QR_code)
      let cnarray = this.props.post.conditions;
    let maarray = this.props.post.materials;
    let phonearray = this.props.post.phone_numbers;
    let phone_address_array = this.props.post.phone_numbers_address; //新加电话地址
    let addarray = this.props.post.addresses;
    const qrcode1 =
      "data:image/jpeg;base64," + this.props.post.consult_QR_code;
    const qrcode2 =
      "data:image/jpeg;base64," + this.props.post.service_QR_code;
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
      return(
        <div>
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
          ></div>
          {/* 办事指南 */}
          <h1
              style={{
                display: "inlineblock",
                fontSize: "30px",
                color: "#0374B7",
                position: "relative",
                top: "-130px",
                left: "550px",
                letterSpacing: "20px",
                width: "400px",
              }}
            >
              办事指南
            </h1>
            {/* item_name */}
            <h1
              style={{
                fontSize: "30px",
                color: "#0374B7",
                position: "relative",
                top: "-220px",
                left: "550px",
                letterSpacing: "20px",
                width: "1000px",
                height: "100px",
              }}
            >
              {this.props.post.item_name}
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
              top: "-180px",
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
                {this.props.post.item_name}
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
                {this.props.post.item_code}
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
                {this.props.post.item_content}
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
                {this.props.post.basis}
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

              top: "-180px",

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
                      {index + 1 + "." + item.names}
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
                      {index + 1 + "." + item.names}
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
                  法定办结时限：{this.props.post.legal_limit}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承诺办结时限：
                  {this.props.post.legal_limit}
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

              top: "-140px",
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
                <div style={textStyle}>业务咨询</div>
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
                  height: "300px",
                }}
              >
                <img
                  src={
                    this.props.post.consult_QR_code
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
                  height: "300px",
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
                      {index + 1 + ". 地址:" + item.names + ' 电话:'+phonearray[index].area+'-'+phonearray[index].pNumber}
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
              top: "-150px",
              marginTop: "30px",
              marginBottom: "-100px",
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
                    this.props.post.service_QR_code
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
                      {index + 1 + "." + item.names}
                    </li>
                  ))}
              </div>
            </div>
          </div>

        </div>
         
        
      );
    }
} 


export default RecordCheck;
