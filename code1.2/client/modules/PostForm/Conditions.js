import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button,Form, Input, Icon, AutoComplete} from 'antd';

//表单样式
const formItemLayout = {
  labelCol: {
    span:5
  },
  wrapperCol: {
    span:16
  },
};

class Conditions extends Component{
  constructor(props){
    super(props);
    this.state = {condition: []};
    this.getCookie = this.getCookie.bind(this);
  }


  //装载入记录
  componentDidMount(){
    var item = this.getCookie('condition');
    //console.log(item);
    if(item.length == 0 )
      this.setState({condition: ["无历史输入记录"]})
    else
      this.setState({condition: item});
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

  //删除当前输入框
  deleteContent = index => {
    const { form } = this.props;
    const content = form.getFieldValue("content_conditions");
    if (content.length === 1) {
      return;
    }
    /*form.setFieldsValue({
      content: content.filter((key) => key !== index)
    });*/
    content.splice(index,1);
    form.setFieldsValue({
      content_conditions: content
    });
    let data = this.props.arr;
    data.splice(index, 1);
    this.setState({ arr: data });
   // console.log(content);
  };
  

  //增加新输入框
  add = () => {
    let data = this.props.arr;
    this.props.setArr(data.concat({names:''}))
    //console.log(this.props.arr);
  };

  //输入框的值赋值到父组件的state
  HandleInput = (index,e) =>{
    const a = this.props.arr;
    //console.log(e)
    a[index].names = e;
    this.props.setArr(a);
  }


      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div><center><h3>申办所需资格条件（至少填一项）</h3></center>
          {this.props.arr.map((item, index) => (
              <Form.Item
                {...(formItemLayout)}
                  key={index}
                  label={ '条件'}
              >
                    {getFieldDecorator(`content_conditions[${index}]`, {
                      initialValue: item.names,
                      rules: [{ required: true, 
                        whitespace: true,
                        message: "请输入条件或删除此文本框" },
                        { pattern:new RegExp('.*[\u4e00-\u9fa5]{1,}.*'),
                        message:'每项150个中英文字符以内，不含空格'
                        }]
                    })
                    // (<Input.TextArea 
                    //   maxLength="150" type="string"allowClear="true"
                    //   autosize={{ minRows: 1, maxRows: 5 }} style={{ width: '80%' }}
                    //  onChange= {this.HandleInput.bind(this,index)}/>)
                    (<AutoComplete 
                      dataSource={this.state.condition}
                      onChange={this.HandleInput.bind(this,index)}
                      //onSelect={(value)=>{console.log(value)}}
                      style={{ width: '80%' }}>
                        <Input.TextArea  type="string" allowclear="true" autosize={{ minRows: 1, maxRows: 5 }}/>
                      </AutoComplete>)
                     }
           {this.props.arr.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.deleteContent(index)}
              />
           ) : null}
              </Form.Item>
            ))}    
              <center><Button type="dashed" onClick={this.add} style={{ width: '20%' }}>
                <Icon type="plus" /> 添加条件
              </Button>

</center>
        
          </div>
        );
      }
    }

export default Conditions
