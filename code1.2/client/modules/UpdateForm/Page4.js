import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, AutoComplete} from 'antd';


//表单样式
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};


class Page4 extends Component{
  constructor(){
    super();
    this.state = {
      network_PC: [],
      network_mobile: [],
      self_help:[]
    };
    this.getCookie = this.getCookie.bind(this);
  }

  //装载入记录
  componentDidMount(){
      console.log('成功');
    var item = this.getCookie('network_PC');
    if(item.length == 0 )
      this.setState({ network_PC: ["无历史输入记录"]})
    else
      this.setState({ network_PC: item});

    item = this.getCookie('network_mobile');
    if(item.length == 0 )
      this.setState({network_mobile: ["无历史输入记录"]})
    else
      this.setState({network_mobile: item});

    item = this.getCookie('self_help');
    if(item.length == 0 )
      this.setState({self_help: ["无历史输入记录"]})
    else
      this.setState({self_help: item});
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


  //将输入框的值传回父组件state
  input_network_PC(e){
    this.props.get_network_PC(e);
  }
  input_network_mobile(e){
    this.props.get_network_mobile(e);
  }
  input_self_help(e){
    this.props.get_self_help(e);
  }

   render(){
    const { getFieldDecorator } = this.props.form;
       return(
           <Form autoComplete="on">
            <Form.Item
                {...(layout)}
                label="网办PC端"
                rules={[{ required: false } ]}
              >
                {getFieldDecorator('network_PC',{ 
                  initialValue:this.props.network_PC,
                })
                

              (<AutoComplete 
                dataSource={this.state.network_PC}
                onChange={this.input_network_PC.bind(this)}
                //onSelect={(value)=>{console.log(value)}}
                >
                  <Input.TextArea  type="string" allowclear="true"/>
                </AutoComplete>)       
              
              }
              </Form.Item>

              <Form.Item
                label="网办移动端"
                {...(layout)}
                rules={[{ required: false}]}
              >
                  {getFieldDecorator('network_mobile',{ 
                    initialValue:this.props.network_mobile,
                  })
                
     
                (<AutoComplete 
                  dataSource={this.state.network_mobile}
                  onChange={this.input_network_mobile.bind(this)}
                  //onSelect={(value)=>{console.log(value)}}
                  >
                    <Input.TextArea
                    type="string" allowclear="true"
                    />
                  </AutoComplete>)       
                }
              </Form.Item>
              <Form.Item
                label="自助终端 "
                {...(layout)}
                rules={[{ required: false}]}
              >
                  {getFieldDecorator('self_help',{ 
                    initialValue:this.props.self_help,
                  })
                
     
                (<AutoComplete 
                  dataSource={this.state.self_help}
                  onChange={this.input_self_help.bind(this)}
                  //onSelect={(value)=>{console.log(value)}}
                  >
                    <Input.TextArea
                    type="string" allowclear="true"
                    />
                  </AutoComplete>)       
                }
              </Form.Item>
            </Form>
          );
       }
}
export default Page4;