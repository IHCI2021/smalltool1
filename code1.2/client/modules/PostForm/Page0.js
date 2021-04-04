import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, AutoComplete} from 'antd';


//表单样式
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};


class Page0 extends Component{
  constructor(){
    super();
    this.state = {
      item_name: [],
      item_code: [],
      item_content: [],
      basis: []
    };
    this.getCookie = this.getCookie.bind(this);
    //this.setCookie = this.setCookie.bind(this);
  }

  //装载入记录
  componentDidMount(){
    var item = this.getCookie('item_name');
    //console.log(item);
    if(item.length == 0 )
      this.setState({item_name: ["无历史输入记录"]})
    else
      this.setState({item_name: item});

    item = this.getCookie('item_code');
    if(item.length == 0 )
      this.setState({item_code: ["无历史输入记录"]})
    else
      this.setState({item_code: item});

    item = this.getCookie('item_content');
    if(item.length == 0 )
      this.setState({item_content: ["无历史输入记录"]})
    else
      this.setState({item_content: item});

    item = this.getCookie('basis');
    if(item.length == 0 )
      this.setState({basis: ["无历史输入记录"]})
    else
      this.setState({basis: item});
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

  //设置cookie记录
  // setCookie(name, value, exdays){
  //   value = '--' + value;
  //   var d = new Date();
  //   d.setTime(d.getTime() + (exdays*24*60*60*1000));
  //   var expires = "expires="+d.toGMTString();
  //   document.cookie = name + "=" + value + ";" + expires + ";path=/";
  // }

  //将输入框的值传回父组件state
  input_item_name(e){
    //console.log(e);
    this.props.get_item_name(e);
  }
  input_item_code(e){
    //console.log(e)
    //this.setCookie('item_code', e, 1);
    this.props.get_item_code(e);
  }
  input_item_content(e){
    //console.log(e)
    this.props.get_item_content(e);
  }
  input_basis(e){
    //console.log(e)
    this.props.get_basis(e);
  }



   render(){
    const { getFieldDecorator } = this.props.form;
    //console.log(this.state.item_code);
       return(
           <Form autoComplete="on">
            <Form.Item
                {...(layout)}
                label="事项名称"
                rules={[{ required: true } ]}
              >
                {getFieldDecorator('item_name',{ 
                  initialValue:this.props.item_name,
                  rules:[
                    {required:true,
                    message:'请输入事项名称,必填'},
                    { pattern:new RegExp
                      ('.*[\u4e00-\u9fa5]{1,}.*'),
                    message:'50个中英文字符以内，不含空格'}
                    //{ pattern:'[\u4e00-\u9fa5]',message:'50个中文字符以内，请勿输入空格，符号只能含有中英文的 ()-_《》',}
                  ],
                })
                
              // (<Input.TextArea
              
              // onChange={this.input_item_name.bind(this)}
              //   maxLength="50" type="string"allowClear="true"/>)
              (<AutoComplete 
                dataSource={this.state.item_name}
                onChange={this.input_item_name.bind(this)}
                //onSelect={(value)=>{console.log(value)}}
                >
                  <Input.TextArea  type="string" allowclear="true"/>
                </AutoComplete>)       
              
              }
              </Form.Item>

              <Form.Item
                label="事项代码"
                {...(layout)}
                rules={[{ required: true}]}
              >
                  {getFieldDecorator('item_code',{ 
                    initialValue:this.props.item_code,
                    rules:[
                      {required:true,
                      message:'请输入事项代码，必填'},
                      { pattern:new RegExp('^[A-Z0-9]{1,}$'),
                      message:'只能输入数字或大写字母',
                      }
                    ]
                  })
                
                // (<Input
                //  onChange={this.input_item_code.bind(this)}
                //  type="string" maxLength="31"allowClear="true"
                //  />)        
                (<AutoComplete 
                  dataSource={this.state.item_code}
                  onChange={this.input_item_code.bind(this)}
                  //onSelect={(value)=>{console.log(value)}}
                  >
                    <Input
                    type="string" allowclear="true"
                    />
                  </AutoComplete>)       
                }
              </Form.Item>
   
              <Form.Item
                label="事项内容（待遇标准）"
                {...(layout)}
                rules={[{ required: true}]}
              >
                {getFieldDecorator('item_content',{
                  initialValue:this.props.item_content,
                    rules:[
                      {required:true,
                      message:'请输入事项内容，必填'},
                      { pattern:new RegExp ('.*[\u4e00-\u9fa5]{1,}.*'),
                      message:'150个中英文字符以内，不含空格'
                      }
                    ]
                  })
                // (<Input.TextArea 
                // onChange={this.input_item_content.bind(this)}
                // maxLength="150" type="string"allowClear="true"autosize={{ minRows: 2, maxRows: 4 }}/>)
                (<AutoComplete 
                  dataSource={this.state.item_content}
                  onChange={this.input_item_content.bind(this)}
                  //onSelect={(value)=>{console.log(value)}}
                  >
                    <Input.TextArea  type="string" allowclear="true"autosize={{ minRows: 2, maxRows: 4 }}/>
                  </AutoComplete>)
                  }
                  </Form.Item>

                  <Form.Item
                    label="政策依据（文件名、文号)"
                    {...(layout)}
                    rules={[{ required: true }]}
                  >
                    {getFieldDecorator('basis',{
                      initialValue:this.props.basis,
                        rules:[
                          {required:true,
                          message:'请输入政策依据，必填'},
                          { pattern:new RegExp ('.*[\u4e00-\u9fa5]{1,}.*'),
                          message:'100个中英文字符以内，不含空格'
                          }
                        ]
                      })
                    // (<Input.TextArea 
                    //   onChange={this.input_basis.bind(this)}
                    //   maxLength="100" type="string"allowClear="true"autosize={{ minRows: 2, maxRows: 4 }} />)
                    (<AutoComplete 
                      dataSource={this.state.basis}
                      onChange={this.input_basis.bind(this)}
                      //onSelect={(value)=>{console.log(value)}}
                      >
                        <Input.TextArea type="string" allowclear="true"autosize={{ minRows: 2, maxRows: 4 }}/>
                      </AutoComplete>)
                    
                      }
                  </Form.Item>
  
            </Form>
          );
       }
}
export default Page0;