import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import Qs from "qs"
import * as BASE64 from '../endpage/constants';
import { Form,Button} from 'antd';

const logo = {
	height: '60%',
    width: '6',
    left: '27%',
    top: '31%',
    position:' relative',
  };
const mainArea = {
    display: 'flex',
	position: 'relative',
	height: '400px',
	width: '760px',
	left: '50%',
	top:'50%',
	marginLeft: '-380px',
   marginTop:'-100px',
    background: 'inherit',
	backgroundColor: 'rgba(255, 255, 255, 1)',
	border: 'none',
	borderRadius: '10px',
	MozBoxShadow: '0px 0px 10px rgba(0, 0, 0, 0.247058823529412)',
	WebkitBoxShadow: '0px 0px 10px rgba(0, 0, 0, 0.247058823529412)',
	boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.247058823529412)',
  };
  const LoginArea={
height:'600px',
position: 'relative',
  };
  const Buttons={
    display: 'block',
	position: 'absolute',
	top: '20px',
	width: '150px',
	height: '60px',
	lineHeight: '60px',
	textAlign: 'center',
	fontSize: '18px',
	fontWeight: 'bold',
	//font-family: "等线";

	background: 'inherit',
	//background-color: rgba(255, 255, 255, 1);
	border: 'none',
	borderRadius: '10px',
	MozBoxShadow: '0px 0px 10px rgba(0, 0, 0, 0.247058823529412)',
	WebkitBoxShadow: '0px 0px 10px rgba(0, 0, 0, 0.247058823529412)',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.247058823529412)',
    textDecoration: 'blink',
    left:'320px',
    backgroundColor:'#0A6CD6',
    color: 'rgba(255, 255, 255, 0.996078431372549)'
  };
  const loginTest={
    display: 'block',
	position: 'absolute',
	top: '27px',
	width: '730px',
	textAlign: 'center',
	//left: '255px',
	fontSize: '32px',
	fontWeight: 'bolder',
	//font-family: "等线";
	color: '#006e9d',
};
const keyinArea={
    display: 'flex',
	position: 'absolute',
	bottom: '130px',
	width: '770px',
	height: '230px',


};
const userBox={
    display: 'flex',
	position: 'absolute',
	top: '130px',
	left: '210px',
	width: '448px',
	height: '48px',
	border: '2px solid #008DCB',
	borderRadius: '15px',
};
const passBox={
    display: 'flex',
	position: 'absolute',
	top: '65px',
	left: '210px',
	width: '448px',
	height: '48px',
	border: '2px solid #008DCB',
	borderRadius: '15px',
};
const userArea={
    display: 'flex',
	position: 'absolute',
	top: '74px',
	left: '220px',
	width: '420px',
	height: '30px',
	fontSize: '18px',
	outline: 'none',
	borderColor: 'transparent',
	backgroundColor: 'transparent',
};
const pwdArea={
    display: 'flex',
	position: 'absolute',
	top: '140px',
	left: '220px',
	width: '420px',
	height: '30px',
	fontSize: '18px',
	outline: 'none',
	borderColor: 'transparent',
	backgroundColor: 'transparent',
};
const Tips={
    display: 'flex',
	position: 'absolute',
	bottom: '15px',
	left: '260px',
	color: '#b5b5b5',
};
const btnArea={
    display: 'flex',
	position: 'absolute',
	bottom: '0px',
	//background-color: #006699;
	height: '130px',
	width: '770px',
	textAlign: 'center',
};
const a={
    textDecoration: 'blink',
    left:'320px',
    backgroundColor:'#0A6CD6',
    color: 'rgba(255, 255, 255, 0.996078431372549)',
};
const userName={
    display: 'flex',
	position: 'absolute',
	top: '78px',
	fontSize: '22px',
	right: '585px',
	color: '#008DCB',
	fontWeight: '900',
	//font-family: "等线";
};
const passName={
    display: 'flex',
	position: 'absolute',
	top: '143px',
	fontSize: '22px',
	right: '585px',
	color: '#008DCB',
	fontWeight: '900',
	//font-family: "等线";
};
const nameArea={
    display: 'block',
	position: 'absolute',
	top: '0px',
	left: '20px',
	height: '78.5px',
	width: '730px',
	borderBottom: '1.5px solid #006e9d',

};

const inFifteenMinutes=new Date(new Date().getTime()+24*3600*1000);
class Login extends React.Component {
	constructor(props) {
		super(props);
	this.state={
		username:'',
		password:'',
	};
}


getusername(e){
	this.setState({ username: e.target.value});
  }


keyUp=(e)=>{
	if (e.keyCode === 13) {
		this.formSubmit()
	}
}
  getpassword(e){
	this.setState({ password: e.target.value});
  }

	formSubmit(){
		if(this.state.username==''||this.state.password==''){
			alert('请输入用户名和密码')
			return
		}
		let data = {
			username :this.state.username,
			password: this.state.password
		}
		axios({
		 method:'post',
		 url:"http://localhost:8000/api/user/login",
		 data:data,
		 transformRequest: [function (data) {
		   // 对 data 进行任意转换处理
		   return Qs.stringify(data)
		 }],
		 headers: {
		   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		 },
		 }).then(res=>{
		   if(res.status==200){
		   alert(res.data.msg)
			/*cookie.save("username",this.state.username,{
			maxAge:24*60*60})
			cookie.save("token",res.data.token,{
			maxAge:24*60*60})*/
         localStorage.setItem("username",this.state.username)
         localStorage.setItem("token",res.data.token)
		   //window.location.href = 'http://locallhost:8000/index'
		   this.props.router.push('/index');
		   }
		 }
		 )
		 .catch(err=>{
			 if(err.response.status==403)
			 alert(err.response.data.msg)
				if(err.response.status==400)
						alert(err.response.data.msg)
				if(err.response.status==500)
					   alert("服务器出错")
				if(err.response.status==404)
						 alert(err.response.data.msg)
				})
}
	  render() {
		return (
		  <Form onSubmit={this.handleSubmit} className="login-form">
			  <div style={LoginArea}>

			<div style={mainArea}>

				<div style={nameArea}>
				<img src={BASE64.BASE64_COL.img1} style={logo}></img>
					<div style={loginTest}>事项管理小工具</div>
				</div>

				<div style={keyinArea}>
					<div style={userName}>用户名:</div>

				    <div style={passName} >密码:</div>

					<div style={userBox}></div>
					<div  style={passBox} ></div>

					<input
					value={this.state.username}
					onChange={this.getusername.bind(this)}
					style={userArea} type="text" placeholder="请输入用户名" v-model="usr"></input>
					<input
					value={this.state.password}
					onChange={this.getpassword.bind(this)}
					style={pwdArea} type="password" placeholder="请输入密码" v-model="pwd"></input>

					<div style={Tips}>* 若要找回密码,请联系找审批管理处的相关人员</div>
				</div>

				<div style={btnArea}>


					<button type="primary" onKeyUp={this.keyUp}
					onClick={() => this.formSubmit()}
					 style={Buttons}>登录</button>
				</div>
			</div>
		</div>

		  </Form>
		);
	  }
	}
export default Form.create()(Login);
