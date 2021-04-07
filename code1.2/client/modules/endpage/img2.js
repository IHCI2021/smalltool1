import * as BASE64 from "./constants";
import React from "react";
import axios from "axios";
import { Button, Divider } from "antd";
import {exportExcel} from 'xlsx-oc';
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
        // 'Authorization':""
      },
    }).then((res) => {
      let tposts = res.data.result;
      this.setState({ posts: tposts });
      // console.log(tposts);
    });
  }
  exportDefaultExcel=()=>{
    const list=this.state.posts;
    const data=[];
    let i=0;
    let add_length=list.addresses.length;
    let con_length=list.conditions.length;
    let mat_length=list.materials.length;
    data.push({
      key:i,
      item_name:list.item_name,
      item_code:list.item_code,
      item_content:list.item_content,
      basis:list.basis,
      conditions:list.conditions[0],
      materials:list.materials[0],
      legal_limit:list.legal_limit,
      promise_limit:list.promise_limit,
      addresses:list.addresses[0]
    })
    const header=[
      {k:'item_name',v:'事项名称'},
      {k:'item_code',v:'事项编码'},
      {k:'item_content',v:'事项内容'},
      {k:'item_basis',v:'政策依据'},
      {k:'conditions',v:'申办所需资格条件'},
      {k:'legal_limit',v:'法定办结时限'},
      {k:'promise_limit',v:'承诺办结时限'},
      
      {k:'addresses',v:'办事大厅地址'}]
    exportExcel(header,data);
  }
  render() {
    let cnarray = this.state.posts.conditions;
    let maarray = this.state.posts.materials;
    let phonearray = this.state.posts.phone_numbers;
    let phone_address_array = this.state.posts.phone_numbers_address; //新加电话地址
    let addarray = this.state.posts.addresses;
    const qrcode1 =
      "data:image/jpeg;base64," + this.state.posts.consult_QR_code;
    const qrcode2 =
      "data:image/jpeg;base64," + this.state.posts.service_QR_code;
    return (
      // <div id={"billDetails"}>
      //   <Button type="primary" onClick={()=>{this.print.bind(this)}}>打印</Button>
      // </div>
      <div>
        <Button type="primary" onClick={this.exportDefaultExcel.bind(this)}>导出excel</Button>
      </div>

      // <div id={"billDetails"}>
      //   <div>
      //     <div>
      //       <Button
      //         type="primary"
      //         style={{ position: "relative", top: "100px", right: "100px" }}
      //         onClick={() => {
      //           this.print.bind(this);
      //         }}
      //       >
      //         打印
      //       </Button>
      //       <h1>办事指南</h1>
      //       <h1
      //       >
      //         {this.state.posts.item_name}
      //       </h1>
      //     </div>
      //     <div>
      //       <div
      //       >
      //         <div>
      //           事项名称
      //         </div>
      //         <div>
      //           {this.state.posts.item_name}
      //         </div>
      //         <div>
      //           事项编码
      //         </div>
      //         <div
      //         >
      //           {this.state.posts.item_code}
      //         </div>
      //         <div
      //         >
      //           事项内容（待遇标准）
      //         </div>
      //         <div
      //         >
      //           {this.state.posts.item_content}
      //         </div>
      //         <div
      //         >
      //           政策依据（文件名，文号）
      //         </div>
      //         <div
      //         >
      //           {this.state.posts.basis}
      //         </div>
      //       </div>
      //     </div>
      //     <div
      //     >
      //       <div
      //       >
      //         <div
      //         >
      //           申办所需资格条件
      //         </div>
      //         <div
      //         >
      //           {cnarray &&
      //             cnarray.map((item, index) => (
      //               <li
      //                 style={{
      //                   listStyle: "none",
      //                 }}
      //               >
      //                 {index + 1 + "." + item}
      //               </li>
      //             ))}
      //         </div>
      //         <div
      //         >
      //           申办材料
      //         </div>
      //         <div
      //         >
      //           {maarray &&
      //             maarray.map((item, index) => (
      //               <li
      //                 style={{
      //                   listStyle: "none",
      //                 }}
      //               >
      //                 {index + 1 + "." + item}
      //               </li>
      //             ))}
      //         </div>
      //         <div
      //         >
      //           审核时限
      //         </div>

      //         <div

      //         >
      //           <div
      //           >
      //             {" "}
      //             法定办结时限：{this.state.posts.legal_limit}
      //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承诺办结时限：
      //             {this.state.posts.legal_limit}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //     <div

      //     >
      //       <div>
      //         <div>
      //           网络咨询平台
      //         </div>
      //         <div

      //         >
      //           {" "}
      //           咨询电话
      //         </div>

      //         <div

      //         >
      //           <img
      //             src={
      //               "data:image/jpeg;base64," + this.state.posts.consult_QR_code
      //             }
      //           />
      //         </div>

      //         <div>
      //           {phone_address_array &&
      //             phone_address_array.map((item, index) => (
      //               <div
      //                 style={{
      //                   fontSize: "20px",
      //                   textIndent: "2rem",
      //                   display: "inline-block",
      //                 }}
      //               >
      //                 {index + 1 + "." + item + phonearray[index]}
      //               </div>
      //             ))}
      //         </div>
      //       </div>
      //     </div>

      //     <div>
      //       <div>
      //         <div>
      //           业务办理二维码
      //         </div>
      //         <div>
      //           办事大厅地址
      //         </div>
      //         <div>
      //           <img
      //             src={
      //               "data:image/jpeg;base64," + this.state.posts.service_QR_code
      //             }
      //           />
      //         </div>
      //         <div>
      //           {addarray &&
      //             addarray.map((item, index) => (
      //               <li
      //                 style={{
      //                   fontSize: "20px",
      //                   listStyle: "none",
      //                 }}
      //               >
      //                 {index + 1 + "." + item}
      //               </li>
      //             ))}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default RecordTest;
