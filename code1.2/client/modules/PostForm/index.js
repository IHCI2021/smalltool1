import React, { Component } from 'react';
import 'antd/dist/antd.css';
import cookie from 'react-cookies'
import { Steps, Button, Form ,Descriptions,Dadge} from 'antd';
import Qs from "qs"
import Page0 from './Page0';
import Conditions from './Conditions';
import Materials from './Materials'
import Limit from './Limit'
import Phone_number from './Phone_number'
import PlatformAvatar from "./PlatformAvatar"
import Service_QR_code from "./Service_QR_code"
import Address from './Address'
import axios from 'axios';
import * as BASE64 from '../endpage/constants';

const topLine={
	position: 'relative',
	height: '60px',
	boxShadow: '0 1px 10px 0 #8c6939',
};
const title2={
  height:'20px',
  margin:'10px'
}
const logo={
  height: '70%',
    left: '1%',
    top: '15%',
    position: 'absolute',
};
const Title={
	position: 'absolute',
	display: 'block',
	top: '10px',
	left: '63px',
	fontSize: '30px',
  //font-family: "黑体";
  cursor: 'pointer',
	fontWeight: '900',
	textDecoration: 'blink',
	color: '#08639C',
};
const negavation = {
  display: 'flex',
  top: '18px',
  right: '20px',
  //font-family: "黑体";
  fontSize: '900',
  width: '800px',
  height: '50px',
  //text-align: right;
};
const modify = {
  top: '10px',
  //border:'none',
  position: 'absolute',
  display: 'flex',
  cursor: 'pointer',
  right: '100px',
  color: '#08639C',
  fontSize: '30px',
  zIndex: '999',
};
const loginTop = {
  top: '10px',
  position: 'absolute',
  display: 'flex',
  right: '20px',
  color: '#08639C',
  cursor: 'pointer',
  fontSize: '30px',
  zIndex: '999',
};
const rootUser = {
  top: '10px',
  position: 'absolute',
  display: 'flex',
  right: '260px',
  color: '#08639C',
  cursor: 'pointer',
  fontSize: '30px',
  zIndex: '999',
};
//步骤条
const container = {
  display: 'flex',
  position: 'relative',
  width: '60%',
  left: '20%',
  top: '25px',
};
const loginarea = {
  width: '100%',
  height: '100px',
};

//框
const logincontainer = {
  position: 'relative',
  left: '10%',
  width: '80%',
  top: '50px',
};

//步骤条
const { Step } = Steps;
const steps = [
  { title: '事项' },
  { title: '申办资格审核' },
  { title: '业务咨询' },
  { title: '业务办理' },
  {title:'最终页面'}
];


class Form1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      // form:{
      item_name: "",
      item_code: "",
      item_content: "",
      basis: "",
      conditions: [
        {
          names: ''
        },
      ],
      materials: [
        {
          names: ''
        },
      ],
      legal_limit: "",
      promise_limit: "",
      phone_numbers: [
        {
          area: '020',
          pNumber: ''
        },
      ],
      phone_numbers_address: [
        {
          names: ''
        }
      ],
      addresses: [
        {
          names: ''
        },
      ],
      consult_QR_code: '',
      service_QR_code: ''
      // }
    };
    this.setSingleCookie = this.setSingleCookie.bind(this);
    this.setMoreCookie = this.setMoreCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }

  // 暂时用不到
  //#region 
  componentDidMount() {
    if (typeof window != "undefined" && localStorage.getItem("token") == "") {
      alert("请先登录")
      this.props.router.push('/login');
    }
  }

  //设置多条cookie记录
  setMoreCookie(name, value, exdays) {
    var list = this.getCookie(name);
    let value_length = value.length;
    if (value_length == 0)
      return;
    // console.log(value);
    // console.log(value_length);

    if (list.length != 0)
      for (var index = 0; index < value_length; index++) {
        if (list.indexOf(value[index]) == -1)
          list.push(value[index]);
      }
    else
      list = value;

    value_length = list.length;
    let change = 0;
    if (value_length > 10)
      change = value_length - 10;


    let cvalue = '--' + list[change];
    for (var index = change + 1; index < value_length; index++)
      cvalue = cvalue + '--' + list[index];

    //console.log(cvalue);
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
  }

  //设置单条cookie记录
  setSingleCookie(name, value, exdays) {
    var list = this.getCookie(name);

    if (list.indexOf(value) != -1)
      return;

    if (list.length == 10)
      list.shift();

    let cvalue = '';
    if (list.length != 0)
      cvalue = '--' + list[0];

    for (var index = 1; index < list.length; index++) {
      cvalue = cvalue + '--' + list[index];
    }

    cvalue = cvalue + '--' + value;
    //console.log(cvalue);
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
  }

  //获取cookie记录
  getCookie(name) {
    var cookie = document.cookie.split("; ");
    name = name + "=";
    for (var i = 0; i < cookie.length; i++) {
      if (cookie[i].indexOf(name) == 0) { cookie = cookie[i]; break; }
    }

    if (i == cookie.length)
      return [];

    cookie = cookie.split("--");
    var list = [];
    for (var i = 1; i < cookie.length; i++) {
      if (cookie[i] != "" || cookie[i] != undefined)
        list.push(cookie[i]);
    }
    return list;
  }

  //子组件赋值给this.state
  get_item_name(msg) {
    this.setState({ item_name: msg });
  }
  get_item_code(msg) {
    this.setState({ item_code: msg });
  }
  get_item_content(msg) {
    this.setState({ item_content: msg });
  }
  get_basis(msg) {
    this.setState({ basis: msg });
  }
  get_legal_limit(msg) {
    this.setState({ legal_limit: msg });
  }
  get_promise_limit(msg) {
    this.setState({ promise_limit: msg });
  }
  get_consult_QR_code(msg) {
    this.setState({ consult_QR_code: msg })
  }
  get_service_QR_code(msg) {
    this.setState({ service_QR_code: msg })
  }
  //动态数组赋值给this.state
  handle_conditions = (data) => {
    this.setState({ conditions: data })
  }
  handle_materials = (data) => {
    this.setState({ materials: data })
  }
  handle_phone_numbers = (data) => {
    this.setState({ phone_numbers: data })
  }
  handle_addresses = (data) => {
    this.setState({ addresses: data })
  }
  handle_phone_numbers_address = (data) => {
    this.setState({ phone_numbers_address: data })
  }

  //输入检查
  inputJudge(page) {
    if (page == 0) {
      if (!this.state.item_name.match('.*[\u4e00-\u9fa5]{1,}.*')) {
        alert('事项名称中必须含有汉字，请更正后再操作');
        return false;
      }
      else if (!this.state.item_code.match('^[A-Z0-9]{1,}$')) {
        alert('事项代码输入不规范，请更正后再操作');
        return false;
      }
      else if (!this.state.item_content.match('.*[\u4e00-\u9fa5]{1,}.*')) {
        alert('事项内容中必须含有汉字，请更正后再操作');
        return false;
      }
      else if (!this.state.basis.match('.*[\u4e00-\u9fa5]{1,}.*')) {
        alert('政策依据中必须含有汉字，请更正后再操作');
        return false;
      }
      else return 1;
    }

    if (page === 1) {
      if (this.state.legal_limit ===null) {
        alert('法定办结时限不能为空，请输入正确的法定办结时限');
        return false;
      }
      else if (this.state.promise_limit ===null) {
        alert('承诺办结时限不能为空，请输入正确的承诺办结时限');
        return false;
      }
      else for (var i = 0; i < this.state.conditions.length; i++) {
        if (this.state.conditions[i].names !== undefined && !this.state.conditions[i].names.match('.*[\u4e00-\u9fa5]{1,}.*')) {
          alert('申办所需资格条件中必须含有汉字，请删除多余的空输入框，更正后再操作');
          return false;
        }
      };
      for (var i = 0; i < this.state.materials.length; i++) {
        if (this.state.materials[i].names !== undefined && !this.state.materials[i].names.match('.*[\u4e00-\u9fa5]{1,}.*')) {
          alert('申办材料中必须含有汉字，请删除多余的空输入框，更正后再操作');
          return false;
        }
      };
      return 1;
    }

    if (page === 2) {
      for (var i = 0; i < this.state.phone_numbers_address.length; i++) {
        if (this.state.phone_numbers_address[i].names !== undefined && !this.state.phone_numbers_address[i].names.match('.*[\u4e00-\u9fa5]{1,}.*')) {
          alert('电话号码对应地址中必须含有汉字，请删除多余的空输入框，更正后再操作');
          return false;
        }
      }
      for (var i = 0; i < this.state.phone_numbers.length; i++) {
          if (!this.state.phone_numbers[i].pNumber.match('^([0-9]{8}|[0-9]{11})$')) {
            alert('电话号码必须为8位或11位，填写有误，请更正后再操作')
            return false
          }
      }
      return 1;
    }
    if(page===3){
      for (var i = 0; i < this.state.addresses.length; i++) {
        if (!this.state.addresses[i].names.match('.*[\u4e00-\u9fa5]{1,}.*')) {
          alert('办事大厅地址中必须含有汉字，请删除多余的空输入框，更正后再操作');
          return false;
        }
      };
      return 1;
    }
    if(page==4){
      return 1;
    }
  }
  //下一页
  next() {
    let a = this.inputJudge(this.state.current);
    if (a) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  }

  //上一页
  prev() {
    let a = this.inputJudge(this.state.current);
    if (a) {
      const current = this.state.current - 1;
      this.setState({ current });
    }
  }

  //页头按钮
  toindex() {
    //window.location.href = 'http://locallhost:8000/index'
    this.props.router.push('/index');
  }
  touserManage() {
    //window.location.href = 'http://locallhost:8000/manage/user_manage'
    this.props.router.push('/manage/user_manage');
  }
  toUpdatePassword() {
    //window.location.href = 'http://locallhost:8000/update_password'
    this.props.router.push('/update_password');
  }

  logout() {
    //let usertoken=cookie.load('token');
    let usertoken = ""
    if (typeof window != "undefined") {
      usertoken = localStorage.getItem("token")
    }
    let data = {}
    axios({
      method: 'get',
      url: "http://localhost:8000/api/user/logout",
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': usertoken
      },
    }).then(res => {
      if (res.status == 200) {
        alert(res.data.msg)
        localStorage.setItem('token', "");
        localStorage.setItem('username', "");
        //window.location.href = 'http://locallhost:8000/login'
        this.props.router.push('/login');
      }
    })
  }


  //表单提交
  formSubmit() {
    //动态数组转存
    var tmpCon = [], tmpMat = [], tmpPho = [], tmpAdd = [], tmpNum = [];
    var tmp_phone_numbers_address = [];
    for (var i = 0; i < this.state.conditions.length; i++) {
      if (this.state.conditions[i].names !== '') { tmpCon.push(this.state.conditions[i].names); }
    }

    for (var i = 0; i < this.state.materials.length; i++) {
      if (this.state.materials[i].names !== '') { tmpMat.push(this.state.materials[i].names); }
    }

    for (var i = 0; i < this.state.addresses.length; i++) {
      if (this.state.addresses[i].names !== '') { tmpAdd.push(this.state.addresses[i].names); }
    }
    for (var i = 0; i < this.state.phone_numbers_address.length; i++) {
      if (this.state.phone_numbers_address[i].names !== '') { tmp_phone_numbers_address.push(this.state.phone_numbers_address[i].names); }
    }
    //判断电话格式并存储到tmpPho
    for (var i = 0; i < this.state.phone_numbers.length; i++) {
      if (this.state.phone_numbers[i].pNumber !== '' && this.state.phone_numbers_address[i].names !== '') {
        if (!this.state.phone_numbers[i].pNumber.match('^([0-9]{8}|[0-9]{11})$')) {
          alert('电话号码或对应地址填写有误，请更正再提交')
          return false
        }
        tmpPho.push(this.state.phone_numbers[i].area + '-' + this.state.phone_numbers[i].pNumber);
        tmpNum.push(this.state.phone_numbers[i].pNumber);
      }
    }
    //console.log(tmpCon);
    //console.log(tmpMat);
    //console.log('phone_number'+tmpPho);

    //console.log(tmpAdd);


    //判断state是否规范
    if (!this.state.item_name.match('.*[\u4e00-\u9fa5]{1,}.*')) {
      alert('事项名称中必须含有汉字，请更正后再提交');
      return;
    };

    if (!this.state.item_code.match('^[A-Z0-9]{1,}$')) {
      alert('事项代码输入不规范，请更正后再提交');
      return;
    };

    if (!this.state.item_content.match('.*[\u4e00-\u9fa5]{1,}.*')) {
      alert('事项内容中必须含有汉字，请更正后再提交');
      return;
    };

    if (!this.state.basis.match('.*[\u4e00-\u9fa5]{1,}.*')) {
      alert('政策依据中必须含有汉字，请更正后再提交');
      return;
    };

    if (this.state.legal_limit == '') {
      alert('法定办结时限不能为空，请输入正确的法定办结时限');
      return;
    }
    else this.state.legal_limit.toString();

    if (this.state.promise_limit == '') {
      alert('承诺办结时限不能为空，请输入正确的承诺办结时限');
      return;
    }
    else this.state.promise_limit.toString();

    for (var i = 0; i < tmpCon.length; i++) {
      if (!tmpCon[i].match('.*[\u4e00-\u9fa5]{1,}.*')) {
        alert('申办所需资格条件中必须含有汉字，请更正后再提交');
        return;
      }
    };


    for (var i = 0; i < tmpMat.length; i++) {
      if (!tmpMat[i].match('.*[\u4e00-\u9fa5]{1,}.*')) {
        alert('申办材料中必须含有汉字，请更正后再提交');
        return;
      }
    };
    for (var i = 0; i < tmp_phone_numbers_address.length; i++) {
      if (!tmp_phone_numbers_address[i].match('.*[\u4e00-\u9fa5]{1,}.*')) {
        alert('电话号码对应地址中必须含有汉字，请更正后再提交');
        return;
      }
    };
    for (var i = 0; i < tmpAdd.length; i++) {
      if (!tmpAdd[i].match('.*[\u4e00-\u9fa5]{1,}.*')) {
        alert('办事大厅地址中必须含有汉字，请更正后再提交');
        return;
      }
    };

    let data = {
      item_name: this.state.item_name,
      item_code: this.state.item_code,
      item_content: this.state.item_content,
      basis: this.state.basis,
      conditions: tmpCon,
      materials: tmpMat,
      legal_limit: this.state.legal_limit,
      promise_limit: this.state.promise_limit,
      phone_numbers: tmpPho,
      addresses: tmpAdd,
      phone_numbers_address: tmp_phone_numbers_address,
      service_QR_code: this.state.service_QR_code,
      consult_QR_code: this.state.consult_QR_code
    }
    // console.log(data.phone_numbers)
    //console.log(data.addresses)
    // console.log(data.phone_numbers_address)
    // console.log(data.conditions)
    // console.log(data.materials)
    this.setSingleCookie('item_name', this.state.item_name, 1);
    this.setSingleCookie('item_code', this.state.item_code, 1);
    this.setSingleCookie('item_content', this.state.item_content, 1);
    this.setSingleCookie('legal_limit', this.state.legal_limit, 1);
    this.setSingleCookie('promise_limit', this.state.promise_limit, 1);
    this.setSingleCookie('basis', this.state.basis, 1);
    this.setMoreCookie('condition', tmpCon, 1);
    this.setMoreCookie('material', tmpMat, 1);
    this.setMoreCookie('phone_number', tmpNum, 1);
    this.setMoreCookie('address', tmpAdd, 1);
    this.setMoreCookie('phone_numbers_address', tmp_phone_numbers_address, 1);

    //let usertoken=cookie.load('token');
    let usertoken = ""
    if (typeof window != "undefined") {
      usertoken = localStorage.getItem("token")
    }
    axios({
      method: 'post',
      url: "http://localhost:8000/api/material/material",
      //url: "http://119.23.230.239:8000/api/material/material",
      data: data,
      /*transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],*/
      headers: {
        //'Content-Type': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': usertoken
      },
    }).then(res => {
      if (res.status == 200) {
        alert("提交成功")
        this.props.router.push('/index');
      }
    }
    )
      .catch(err => {
        if (err.response.status == 401) {
          alert(err.response.data.msg)
          localStorage.setItem('token', "");
          localStorage.setItem('username', "");
          //window.location.href = 'http://locallhost:8000/login'
          this.props.router.push('/login');
        }
        if (err.response.status == 403) {
          alert(err.response.data.msg)
          //window.location.href = 'http://locallhost:8000/create_material_form'
          this.props.router.push('/create_material_form');
        }
        if (err.response.status == 500)
          alert('表单重复或服务器出错')
        if (err.response.status == 400)
          alert('请求失败')
      })
  }

//#endregion
  render() {
    const { form } = this.props;
    return (
      <div>

        {/*页头*/}
        <div style={topLine}>
        <img src={BASE64.BASE64_COL.img1} style={logo}></img>
          <div style={Title}
            onClick={() => this.toindex()}>事项管理</div>
          <div style={negavation}>
            <div style={modify}
              onClick={() => this.toUpdatePassword()}>修改密码</div>
            <div style={loginTop}
              onClick={() => this.logout()}>退出</div>
            {typeof window !== "undefined" ? (localStorage.getItem("username") == 'root' ? (
              <div onClick={() => this.touserManage()}
                style={rootUser}>用户管理</div>) : null) : null
            }
          </div>
        </div>
        <div style={title2}><center><h1>创建新事项</h1></center></div>

        <div style={container}>
          <div style={loginarea}>

            {/*步骤条渲染 */}
            <Steps current={this.state.current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
        </div>
        {/*页面渲染 */}
        <div style={logincontainer}>
          <div className="steps-content" >
            {/*第1页*/}
            {this.state.current === 0 && (
              <Page0 form={form}
                item_name={this.state.item_name}
                item_code={this.state.item_code}
                item_content={this.state.item_content}
                basis={this.state.basis}
                get_item_name={this.get_item_name.bind(this)}
                get_item_code={this.get_item_code.bind(this)}
                get_item_content={this.get_item_content.bind(this)}
                get_basis={this.get_basis.bind(this)}
              ></Page0>
            )}

            {/*第2页*/}
            {this.state.current === 1 && (
              <div>

                <Conditions form={form} arr={this.state.conditions}
                  setArr={this.handle_conditions.bind(this)}></Conditions>
                <br />

                <Materials form={form} arr={this.state.materials}
                  setArr={this.handle_materials.bind(this)}></Materials><br />

                <Limit form={form}
                  legal_limit={this.state.legal_limit}
                  promise_limit={this.state.promise_limit}
                  get_legal_limit={this.get_legal_limit.bind(this)}
                  get_promise_limit={this.get_promise_limit.bind(this)}></Limit>
              </div>
            )}

            {/*第3页*/}
            {this.state.current === 2 && (

              <div><center><h3>网络咨询平台（可选填）</h3></center>
                <div
                  style={{
                    display: 'block',
                    width: '100px',
                    margin: '0 auto'
                  }}> <PlatformAvatar
                    consult_QR_code={this.state.consult_QR_code}
                    get_consult_QR_code={this.get_consult_QR_code.bind(this)}
                  ></PlatformAvatar></div><br />

                <Phone_number form={form}
                  arr={this.state.phone_numbers}
                  arr2={this.state.phone_numbers_address}
                  setArr={this.handle_phone_numbers.bind(this)}
                  setArr2={this.handle_phone_numbers_address.bind(this)}
                ></Phone_number>
              </div>
            )}

            {/*第4页*/}
            {this.state.current === 3 && (
              <div><center><h3>业务办理二维码（可选填）</h3></center>
                <div style={{
                  display: 'block',
                  width: '100px',
                  margin: '0 auto'
                }}> <Service_QR_code
                  service_QR_code={this.state.service_QR_code}
                  get_service_QR_code={this.get_service_QR_code.bind(this)}
                ></Service_QR_code></div><br />

                <Address form={form} arr={this.state.addresses}
                  setArr={this.handle_addresses.bind(this)}></Address>
              </div>
            )}

            {/*第5页*/}
            {this.state.current === 4 && (
              <div><center><h3>最终生成页面（请检查是否有错误）</h3></center>
                <div style={{
                  display: 'block',
                  width: '100px',
                  margin: '0 auto'
                }}> 
                <Descriptions title="最终生成页面" bordered>
                  <Descriptions.Items label="事项名称">
                  {this.item_name}
                  </Descriptions.Items>
                </Descriptions>
                <Service_QR_code
                  service_QR_code={this.state.service_QR_code}
                  get_service_QR_code={this.get_service_QR_code.bind(this)}
                ></Service_QR_code></div><br />

                <Address form={form} arr={this.state.addresses}
                  setArr={this.handle_addresses.bind(this)}></Address>
              </div>
            )}
            <br />
          </div>

          {/*下一步按钮 */}
          <div className="steps-action">
            <center>
              {this.state.current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  保存并继续设置
                </Button>
              )}

              {/*提交按钮 */}
              {this.state.current === steps.length - 1 && (
                <Button type="primary"
                  onClick={() => this.formSubmit()}
                //onClick={()=>{window.location.href="http://locallhost:8000:8100/test/post_material_form"}}
                >
                  提交
                </Button>

              )}

              {/*上一步按钮 */}
              {this.state.current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                  返回上一步
                </Button>
              )}
            </center></div>
            <br></br></div></div>
    );
  }
}
export default Form.create()(Form1);







