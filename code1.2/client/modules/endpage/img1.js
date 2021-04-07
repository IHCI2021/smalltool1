import * as BASE64 from "./constants";
import React from "react";
import axios from "axios";
import {Button } from 'antd';

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
