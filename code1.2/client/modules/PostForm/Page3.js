import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, AutoComplete} from 'antd';


//表单样式
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};


class Page3 extends Component{
  constructor(){
    super();
    this.state = {
      phone_numbers: [],
      consult_platform: [],
    };
    this.getCookie = this.getCookie.bind(this);
  }

  //装载入记录
  componentDidMount(){
      console.log('成功');
    var item = this.getCookie('phone_numbers');
    if(item.length == 0 )
      this.setState({phone_numbers: ["无历史输入记录"]})
    else
      this.setState({phone_numbers: item});

    item = this.getCookie('consult_platform');
    if(item.length == 0 )
      this.setState({consult_platform: ["无历史输入记录"]})
    else
      this.setState({consult_platform: item});
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
  input_phone_numbers(e){
    this.props.get_phone_numbers(e);
  }
  input_consult_platform(e){
    this.props.get_consult_platform(e);
  }

   render(){
    const { getFieldDecorator } = this.props.form;
       return(
           <Form autoComplete="on">
            <Form.Item
                {...(layout)}
                label="咨询电话"
                rules={[{ required: true } ]}
              >
                {getFieldDecorator('phone_numbers',{ 
                  initialValue:this.props.phone_numbers,
                  rules:[
                    {required:true,
                    message:'请输入咨询电话,必填'},
                  ],
                })
                

              (<AutoComplete 
                dataSource={this.state.phone_numbers}
                onChange={this.input_phone_numbers.bind(this)}
                //onSelect={(value)=>{console.log(value)}}
                >
                  <Input.TextArea  type="string" allowclear="true"/>
                </AutoComplete>)       
              
              }
              </Form.Item>

              <Form.Item
                label="咨询平台"
                {...(layout)}
                rules={[{ required: true}]}
              >
                  {getFieldDecorator('consult_platform',{ 
                    initialValue:this.props.consult_platform,
                    rules:[
                      {required:true,
                      message:'请输入咨询平台，必填'},
                    ]
                  })
                
     
                (<AutoComplete 
                  dataSource={this.state.consult_platform}
                  onChange={this.input_consult_platform.bind(this)}
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
export default Page3;