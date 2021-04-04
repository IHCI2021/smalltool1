import React, {Component} from 'react';
import { Divider, Input, Select, Table, Button } from 'antd';
import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies'
import * as BASE64 from '../endpage/constants';
const {Search} = Input;
const {Option} = Select;

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
  textShadow: '2px 2px 2px grey'
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
	display: 'flex',
  right: '100px',
  cursor: 'pointer',
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
};


class ListItem extends Component{
    constructor(props){
      super(props);
      this.state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        pageSize: 10,
        data: [],
        total: 0,
        currPage:1,  //当前页面值
        isSearch: false,
        token: typeof window!=="undefined"?localStorage.getItem("token"):""
      }

      this.setPageNum = this.setPageNum.bind(this);
      this.delSelectedItems = this.delSelectedItems.bind(this);
      this.searchItem = this.searchItem.bind(this);
      this.getStartItem = this.getStartItem.bind(this);
      this.getItems = this.getItems.bind(this);
      this.routerCreate = this.routerCreate.bind(this);
      this.routerUpdate = this.routerUpdate.bind(this);
      this.convertTime = this.convertTime.bind(this);
      // this.getItem = this.getItem.bind(this);
      // this.delItem = this.delItem.bind(this);
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

    //转换时间
    convertTime(UTCtime){
      let date = new Date(UTCtime);
      return date.toLocaleString();
    }

    //获取对应页数和条数的数据
    getItems(value){
      if(this.state.isSearch)return;

      this.setState({currPage: value.current});
      this.setState({total: value.total})

      let that = this;
      axios.get('http://localhost:8000/api/material/getList', {
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
                  key: array[i].item_code,
                  ItemName: array[i].item_name,
                  ItemFile: "事项文件",
                  CreateTime: that.convertTime(array[i].update_date),
                  CreateName: array[i].create_user
                });
        }
        that.setState({data: list});
      })
      .catch(function (err) {
        // console.log(error);
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

    //设置当前页面条数
    setPageNum(pageSize){
      this.setState({pageSize});

      if(this.state.isSearch)return;
      let that = this;
      axios.get('http://localhost:8000/api/material/getList', {
        headers: {
          'Authorization': that.state.token,
        },
        params: {
          pageNum: this.state.currPage,
          pageSize: pageSize
        }
      })
      .then(function (response) {
        that.setState({total: response.data.total});
        let array = response.data.result;
        let list = [];
        for(let i=0; i<array.length; i++){
          list.push({
                  key: array[i].item_code,
                  ItemName: array[i].item_name,
                  ItemFile: "事项文件",
                  CreateTime: that.convertTime(array[i].update_date),
                  CreateName: array[i].create_user
                });
        }
        that.setState({data: list});
      })
      .catch(function (err) {
        // console.log(error);
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

    //删除选中的事项s
    delSelectedItems(){
        this.setState({ loading: true });
        let that = this;
        for(let i=0; i<this.state.selectedRowKeys.length; i++){
          let itemCode = this.state.selectedRowKeys[i];
          axios({
            method:"post",
            url:"http://localhost:8000/api/material/removeMany",
            data:qs.stringify({'ItemCode': itemCode}),
            headers:{
                "Authorization":that.state.token,
                'Content-Type':'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
              // console.log(response)
          }).catch(function (err) {
              // console.log(error);
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

        axios.get('http://localhost:8000/api/material/getList', {
          headers: {
            'Authorization': that.state.token,
          },
          params: {
            pageNum: this.state.currPage,
            pageSize: this.state.pageSize
          }
        })
        .then(function (response) {
          that.setState({total: response.data.total});
          let array = response.data.result;
          let list = [];
          for(let i=0; i<array.length; i++){
            list.push({
                    key: array[i].item_code,
                    ItemName: array[i].item_name,
                    ItemFile: "事项文件",
                    CreateTime: that.convertTime(array[i].update_date),
                    CreateName: array[i].create_user
                  });
          }
          that.setState({data: list});
        })
        .catch(function (err) {
          // console.log(error);
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

          // ajax request after empty completing
          setTimeout(() => {
            this.setState({
              selectedRowKeys: [],
              loading: false,
            });
          }, 1000);
    };

    //获取初始的事项数据
    getStartItem(){
      let that = this;
      axios.get('http://localhost:8000/api/material/getList', {
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
                  key: array[i].item_code,
                  ItemName: array[i].item_name,
                  ItemFile: "事项文件",
                  CreateTime: that.convertTime(array[i].update_date),
                  CreateName: array[i].create_user
                });
        }
        that.setState({data: list});
      })
      .catch(function (err) {
        // console.log(error);
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

    //根据搜索事项名查找
    searchItem(itemName){

      if(itemName == null){
        this.getStartItem();
        this.setState({isSearch: true});
        return;
      }
      let that = this;
      axios.get('http://localhost:8000/api/material/findItem', {
        headers: {
          'Authorization': that.state.token,
        },
        params: {
          itemName: itemName
        }
      })
      .then(function (response) {
        let array = response.data.result;
        that.setState({total: array.length});
        let list = [];
        for(let i=0; i<array.length; i++){
          list.push({
                  key: array[i].item_code,
                  ItemName: array[i].item_name,
                  ItemFile: "事项文件",
                  CreateTime: that.convertTime(array[i].update_date),
                  CreateName: array[i].create_user
                });
        }
        that.setState({data: list});
      })
      .catch(function (err) {
        // console.log(error);
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

      this.setState({isSearch: true});
    }

    // getItem = async() => {
    //   let data;
    //   await axios.get('http://locallhost:8000/api/material/getItemByCode', {
    //       headers: {
    //         'Authorization': that.state.token
    //                 },
    //       params: {
    //         item_code: 'test361',
    //         }
    //     })
    //     .then(function (response) {
    //       data = response.data.result;
    //     })
    //     .catch(function (error) {});
    //     console.log(data);
    //     return data;
    // }

    onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    routerCreate(){
      this.props.router.push('/create_material_form');
    }

    routerUpdate(key){
      this.props.router.push('/update_material_form/'+key);
    }
    componentDidMount(){
      if(typeof window != "undefined"&&localStorage.getItem("token")==""){
        alert("请先登录")
        this.props.router.push('/login');
      }
    }
    componentWillMount(){
      this.getStartItem();
    }

    render(){
      const columns = [
        {
          title: '事项名称',
          dataIndex: 'ItemName',
        },
        {
          title: '事项文件',
          dataIndex: 'ItemFile',
        },
        {
          title: '事项创建时间',
          dataIndex: 'CreateTime',
        },
        {
          title: '事项创建者',
          dataIndex: 'CreateName',
        },
        {
          title: '操作',
          dataIndex: 'Actions',
          render: (text, record)=>(
            <span>
            <Button type="primary" onClick={()=>{this.props.router.push('/update_material_form/'+record.key);}}>修改</Button>
            <Button type="danger" style={{marginLeft: 8}} onClick={()=>{
              let array = [];
              for(let i=0; i<this.state.selectedRowKeys.length; i++){
                if(this.state.selectedRowKeys[i] === record.key)continue;
                array.push(this.state.selectedRowKeys[i]);
              }
              this.setState({selectedRowKeys: array});

              let that = this;
                axios({
                method:"post",
                url:"http://localhost:8000/api/material/removeOne",
                data:qs.stringify({'item_code': record.key}),
                headers:{
                    "Authorization":that.state.token,
                    'Content-Type':'application/x-www-form-urlencoded'
                }
                }).then(function (response) {
                    // console.log(response)
                }).catch(function (err) {
                    // console.log(error);
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

                axios.get('http://localhost:8000/api/material/getList', {
                  headers: {
                    'Authorization': that.state.token
                  },
                  params: {
                    pageNum: this.state.currPage,
                    pageSize: this.state.pageSize
                  }
                })
                .then(function (response) {
                  that.setState({total: response.data.total});
                  let array = response.data.result;
                  let list = [];
                  for(let i=0; i<array.length; i++){
                    list.push({
                            key: array[i].item_code,
                            ItemName: array[i].item_name,
                            ItemFile: "事项文件",
                            CreateTime: that.convertTime(array[i].update_date),
                            CreateName: array[i].create_user
                          });
                  }
                  that.setState({data: list});
                })
                .catch(function (err) {
                  // console.log(error);
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

              }}>删除</Button>
              <Button type="primary" style={{marginLeft: 8}} onClick={()=>{this.props.router.push('/get_material_form/'+record.key);}}>导出</Button>
              </span>
            ),
          },
        ];

        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
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
            <div style={{width:1400, height:1600, margin:"auto"}}>
                <Divider
                orientation="left"
                style={{paddingTop:15, paddingBottom:15, fontSize:20}}
                >事项列表</Divider>
                <Search placeholder="请输入要搜索的事项名称"
                size="large"
                onSearch={this.searchItem}
                style={{paddingBottom:15}}
                enterButton />
                <div>
                    <div style={{ marginBottom: 16 }}>
                    <span>* 当前每页显示事项数:  </span>
                    <Select defaultValue="10" style={{ width: 120 }} onChange={this.setPageNum}>
                    <Option value="5">5</Option>
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                    </Select>

                    <Button type="primary" onClick={this.delSelectedItems} disabled={!hasSelected} loading={loading} style={{marginLeft: 60}}>
                        批量删除
                    </Button>
                    <Button type="primary" style={{marginLeft: 20}} onClick={this.routerCreate}>
                      创建新事项
                    </Button>
                    </div>
                    <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={{pageSize: this.state.pageSize, total: this.state.total }}
                    onChange={this.getItems}
                    />
                </div>
            </div></div>
        );


    }
}

export default ListItem;
