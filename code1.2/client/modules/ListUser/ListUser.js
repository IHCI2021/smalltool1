import React, {Component} from 'react';
import { Divider, Table, Button } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies'
import * as BASE64 from '../endpage/constants';

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
  right:'200px',
  backgroundColor:'#0A6CD6',
  color: 'rgba(255, 255, 255, 0.996078431372549)'
};
const WhiteButtons={
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
  left:'200px',
  backgroundcolor: 'rgba(255, 255, 255, 1)',
  color: 'rgba(66, 147, 244, 0.996078431372549)'
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
const Box1={
  display: 'flex',
position: 'absolute',
top: '50px',
left: '210px',
width: '448px',
height: '48px',
border: '2px solid #008DCB',
borderRadius: '15px',
};
const Box2={
  display: 'flex',
position: 'absolute',
top: '115px',
left: '210px',
width: '448px',
height: '48px',
border: '2px solid #008DCB',
borderRadius: '15px',
};
const Box3={
  display: 'flex',
position: 'absolute',
top: '178px',
left: '210px',
width: '448px',
height: '48px',
border: '2px solid #008DCB',
borderRadius: '15px',
};

const area1 ={
  display: 'flex',
position: 'absolute',
top: '58px',
left: '220px',
width: '420px',
height: '30px',
fontSize: '18px',
outline: 'none',
borderColor: 'transparent',
backgroundColor: 'transparent',
};
const area2 ={
display: 'flex',
position: 'absolute',
  top: '123px',
left: '220px',
width: '420px',
height: '30px',
fontSize: '18px',
outline: 'none',
borderColor: 'transparent',
backgroundColor: 'transparent',
};
const area3 ={
display: 'flex',
position: 'absolute',
  top: '185px',
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
const firstName={
  display: 'flex',
position: 'absolute',
top: '55px',
fontSize: '22px',
right: '575px',
color: '#008DCB',
fontWeight: '900',
//font-family: "等线";
};
const secondName={
  display: 'flex',
position: 'absolute',
top: '120px',
fontSize: '22px',
right: '585px',
color: '#008DCB',
fontWeight: '900',
//font-family: "等线";
};
const thirdName={
  display: 'flex',
position: 'absolute',
top: '185px',
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
const topLine={
	position: 'relative',
	height: '60px',
	boxShadow: '0 1px 10px 0 #8c6939',
};
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
const negavation={
display: 'flex',
top: '18px',
right: '20px',
//font-family: "黑体";
fontSize: '900',
width: '800px',
height: '50px',
//text-align: right;
};
const modify={
top:'10px',
border:'none',
position: 'absolute',
cursor: 'pointer',
display: 'flex',
right: '100px',
color: '#08639C',
fontSize: '30px',
zIndex: '999',
};
const loginTop={
top:'10px',
position: 'absolute',
display: 'flex',
right: '20px',
color: '#08639C',
cursor: 'pointer',
fontSize: '30px',
zIndex: '999',
};
const rootUser={
top:'10px',
position: 'absolute',
display: 'flex',
right: '260px',
color: '#08639C',
cursor: 'pointer',
fontSize: '30px',
zIndex: '999',
textShadow: '2px 2px 2px grey'
};

class ListUser extends Component{
    constructor(props){
      super(props);
      this.state = {
        data: [],
        currPage:1,
        pageSize:10,
        total:0,
        token: typeof window!=="undefined"?localStorage.getItem("token"):"",
      }
      this.getStartData = this.getStartData.bind(this);
      this.getData = this.getData.bind(this);
      this.convertTime = this.convertTime.bind(this);

    }
    //页头按钮
toindex(){
  //window.location.href = 'http://locallhost:8000/index'
  this.props.router.push('/index');
}
  touserManage(){
    //window.location.href = 'http://locallhost:8000/manage/user_manage'
    this.props.router.push('/manage/user_manage');
  }
  toUpdatePassword(){
    //window.location.href = 'http://locallhost:8000/update_password'
    this.props.router.push('/update_password');
  }
  logout(){
	  //let usertoken=cookie.load('token');
    let usertoken = ""
    if (typeof window != "undefined") {
      usertoken = localStorage.getItem("token")
    }
    let data = {}
	  axios({
		method:'get',
		url:"http://localhost:8000/api/user/logout",
		data:data,
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		  'Authorization': usertoken
		},
	  }).then(res=>{
		if(res.status==200){
			alert(res.data.msg)
      localStorage.setItem('token', "");
      localStorage.setItem('username', "");
      //window.location.href = 'http://locallhost:8000/login'
      this.props.router.push('/login');
		}
	  })
  }
  componentDidMount(){
    if(typeof window != "undefined"&&localStorage.getItem("token")==""){
      alert("请先登录")
      this.props.router.push('/login');
    }
  }
    componentWillMount(){
        this.getStartData();
    }

    //转换时间
    convertTime(UTCtime){
      let date = new Date(UTCtime);
      return date.toLocaleString();
    }

    getStartData(){
        let that = this;
        axios.get('http://localhost:8000/api/user/get_user_list', {
          headers: {
            'Authorization': that.state.token,
          },
          params: {
            pageNum: 1,
            pageSize: 10
          }
        })
        .then(function (response) {
          that.setState({total: response.data.total});
          let array = response.data.result;
          let list = [];
          for(let i=0; i<array.length; i++){
            list.push({
                        key:array[i].username,
                        UserName: array[i].username,
                        CreateTime: that.convertTime(array[i].create_time),
                  });
          }
          that.setState({data: list});
        })
        .catch(function (err) {
          if(err.response.status==401){
            alert(err.response.data.msg)
          }
          if(err.response.status==403){
            alert(err.response.data.msg)
          }
          if(err.response.status==500)
            alert("表单重复或服务器错误")
          if(err.response.status==400)
            alert('请求失败')
        })
    }

    getData(value){
        this.setState({currPage: value.current});
        this.setState({total: value.total})

        let that = this;
        axios.get('http://localhost:8000/api/user/get_user_list', {
            headers: {
            'Authorization': that.state.token,
            },
            params: {
            pageNum: value.current,
            pageSize: value.pageSize
            }
        })
        .then(function (response) {
            that.setState({total: response.data.total});
            let array = response.data.result;
            let list = [];
            for(let i=0; i<array.length; i++){
                list.push({
                            key:array[i].username,
                            UserName: array[i].username,
                            CreateTime: that.convertTime(array[i].create_time),
                    });
            }
            that.setState({data: list});
            })
            .catch(function (err) {
              if(err.response.status==401){
                alert(err.response.data.msg)
              }
              if(err.response.status==403){
                alert(err.response.data.msg)
              }
              if(err.response.status==500)
                alert("表单重复或服务器错误")
              if(err.response.status==400)
                alert('请求失败')
            })
    }

    render(){
      const columns = [
        {
          title: '用户名称',
          dataIndex: 'UserName',
        },
        {
          title: '用户创建时间',
          dataIndex: 'CreateTime',
        },
        {
          title: '操作',
          dataIndex: 'Actions',
          render: (text, record)=>(
            <span>
            <Button type="primary" onClick={()=>{
                this.props.router.push('/manage/user_password_reset/'+record.key)
              }}>重置密码</Button>
              </span>
            ),
          },
        ];
        return(
          <div>
            <div style={topLine}>
            <img src={BASE64.BASE64_COL.img1} style={logo}></img>
			<div style={Title}
			onClick={() => this.toindex()}>事项管理</div>
			<div style={negavation}>

					<div style={modify}
					onClick={() => this.toUpdatePassword()}>修改密码</div>

				<div style={loginTop}
				onClick={() => this.logout()}
				>退出</div>

        {typeof window!=="undefined"?(localStorage.getItem("username")=='root'?(
          <div  onClick={() => this.touserManage()}
                style={rootUser}>用户管理</div> ):null): null
        }
			</div>
		</div>
            <div style={{width:1000, height:1600, margin:"auto"}}>
                <Divider
                orientation="left"
                style={{paddingTop:15, paddingBottom:15, fontSize:20}}
                >用户列表</Divider>
                <Button type="primary" onClick={()=>{
                this.props.router.push('/manage/user_create');
                }}>创建新用户</Button>
                <div>
                    <Table
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={{pageSize: this.state.pageSize, total: this.state.total }}
                    onChange={this.getData}
                    />
                </div>
            </div></div>
        );


    }
}

export default ListUser;
