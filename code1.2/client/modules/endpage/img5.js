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
      
    // const list=this.state.posts;
    // const data=[];
    // let i=0;
    // let add_length=list.addresses.length;
    // let con_length=list.conditions.length;
    // let mat_length=list.materials.length;
    // data.push({
    //   key:i,
    //   item_name:list.item_name,
    //   item_code:list.item_code,
    //   item_content:list.item_content,
    //   basis:list.basis,
    //   conditions:list.conditions[0],
    //   materials:list.materials[0],
    //   legal_limit:list.legal_limit,
    //   promise_limit:list.promise_limit,
    //   addresses:list.addresses[0]
    // })
    // const header=[
    //   {k:'item_name',v:'事项名称'},
    //   {k:'item_code',v:'事项编码'},
    //   {k:'item_content',v:'事项内容'},
    //   {k:'item_basis',v:'政策依据'},
    //   {k:'conditions',v:'申办所需资格条件'},
    //   {k:'legal_limit',v:'法定办结时限'},
    //   {k:'promise_limit',v:'承诺办结时限'},
      
    //   {k:'addresses',v:'办事大厅地址'}]
    // exportExcel(header,data);
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.exportDefaultExcel.bind(this)}>导出excel</Button>
      </div>
    );
  }
}

export default RecordTest;
