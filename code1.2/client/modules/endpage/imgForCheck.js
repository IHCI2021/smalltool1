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
      console.log(this.props.post.conditions[0])
      return(
        <div>
          <div>{this.props.post.item_code}</div>
          <div>{this.props.post.conditions[0].names}</div>
           {/* <div>{this.state.condition}</div> */}
           {/* <div>{this.state.item_code}</div>
           <div>{this.state.item_content}</div>
           <div>{this.state.basis}</div>
          //  <div>{this.state.conditions}</div> */}
        </div>
        
      );
    }
} 


export default RecordCheck;
