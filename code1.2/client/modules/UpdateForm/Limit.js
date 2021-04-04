import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Form, Input, AutoComplete} from 'antd';

//表单样式
const layout2={
  labelCol: { span: 12 },
  wrapperCol: { span: 3 },
}


class Limit extends Component{
  constructor(){
    super();
    this.state = {
      legal_limit: [],
      promise_limit: [],
    };
    this.getCookie = this.getCookie.bind(this);
    //this.setCookie = this.setCookie.bind(this);
  }

   //装载入记录
   componentDidMount(){
    var item = this.getCookie('legal_limit');
    //console.log(item);
    if(item.length == 0 )
      this.setState({legal_limit: ["无历史输入记录"]})
    else
      this.setState({legal_limit: item});

    item = this.getCookie('promise_limit');
    if(item.length == 0 )
      this.setState({promise_limit: ["无历史输入记录"]})
    else
      this.setState({promise_limit: item});
  }
  //获取cookie记录
  getCookie(name){
    var cookie = document.cookie.split("; ");
    name = name + "=";
    for(var i=0; i<cookie.length; i++){
        if(cookie[i].indexOf(name) == 0){ cookie = cookie[i]; break;}
    }
    if(i == cookie.length)
      return [];

    cookie = cookie.split("--");
    var list = [];

    for(var i=1; i<cookie.length; i++){
        if(cookie[i] != "")
          list.push(cookie[i]);
    }
      return list;
  }


    //将值传回父组件state
    input_legal_limit(value){
        this.props.get_legal_limit(value);
      }
      input_promise_limit(value){
        this.props.get_promise_limit(value);
      }
      
    render(){
      const { getFieldDecorator } = this.props.form;
        return(
            <Form autoComplete="on">
    <center><h3>审核时限</h3></center>
    <Form.Item
    {...layout2}
      label="法定办结时限（最大为150个工作日）"
      rules={[{ required: true}]}>
      {getFieldDecorator('legal_limit',{ 
         initialValue:this.props.legal_limit,
         rules:[
           {required:true,
           message:'请输入法定办结时限'},
         ]
       })
       (<AutoComplete 
        dataSource={this.state.legal_limit}
        onChange={this.input_legal_limit.bind(this)}
        //onSelect={(value)=>{console.log(value)}}
        >
          <Input  type="string" />
        </AutoComplete>)  
     /*  (<Input type="string"  
          onChange={this.input_legal_limit.bind(this)}/>) 
      
         (<InputNumber min={1} max={150}
            onChange={this.input_legal_limit.bind(this)} />)*/
      }
    </Form.Item>,
    <Form.Item
    {...layout2}
      label="承诺办结时限（最大为150个工作日）"
      rules={[{ required: true}]}>
      {getFieldDecorator('promise_limit',{ 
         initialValue:this.props.promise_limit,
         rules:[
           {required:true,
           message:'请输入承诺办结时限'},
         ]
       })
       (<AutoComplete 
        dataSource={this.state.promise_limit}
        onChange={this.input_promise_limit.bind(this)}
        //onSelect={(value)=>{console.log(value)}}
        >
          <Input  type="string" />
        </AutoComplete>)  
        // (<Input type="string" 
        // onChange={this.input_promise_limit.bind(this)}/>) 
      }
    </Form.Item>,   
    </Form>
        )
    }



}
export default Limit;