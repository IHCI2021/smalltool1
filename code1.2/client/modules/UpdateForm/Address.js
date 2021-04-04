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


class Address extends Component{
  constructor(props){
    super(props);

    this.state = {address: []};
    this.getCookie = this.getCookie.bind(this);
  }

  //装载入记录
  componentDidMount(){
    var item = this.getCookie('address');
    //console.log(item);
    if(item.length == 0 )
      this.setState({address: ['无历史输入记录']})
    else
      this.setState({address: item});

    //console.log(this.props.arr);
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
    const content = form.getFieldValue("content_addresses");
    if (content.length === 1) {
      return;
    }
    /*form.setFieldsValue({
      content: content.filter((key) => key !== index)
    });*/
    content.splice(index,1);
    form.setFieldsValue({
      content_addresses: content
    });
    let data = this.props.arr;
    data.splice(index, 1);
    this.setState({ arr: data });
    //console.log(content);
  };

  //增加新输入框
  add = () => {
    let data = this.props.arr;
    this.props.setArr(data.concat({names:''}))
  };

  //输入框的值赋值到父组件的state
  HandleInput = (index,e) =>{
    const a = this.props.arr;
    a[index].names = e;
    this.props.setArr(a);
  }


      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div><center><h3>办事大厅地址（至少填一项）</h3></center>
          {this.props.arr.map((item, index) => (
              <Form.Item
                {...(formItemLayout)}
                  key={index}
                  label={ '地址'}
              >
                    {getFieldDecorator(`content_addresses[${index}]`, {
                      initialValue: item.names,
                      rules: [{ required: true, 
                        whitespace: true,
                        message: "请输入地址或删除此文本框" },
                        { pattern:new RegExp('.*[\u4e00-\u9fa5]{1,}.*'),
                        message:'每项150个中文字符以内，不含空格',
                        }]
                    })
                    // (<Input.TextArea 
                    //   maxLength="150" type="string"allowClear="true"
                    //   autosize={{ minRows: 1, maxRows: 5 }} style={{ width: '80%' }}
                    //  onChange= {this.HandleInput.bind(this,index)}/>)
                    (<AutoComplete 
                      dataSource={this.state.address}
                      onChange={this.HandleInput.bind(this,index)}
                      //onSelect={(value)=>{console.log(value)}}
                      style={{ width: '80%' }}>
                        <Input.TextArea maxLength="150" type="string"allowclear="true" autosize={{ minRows: 1, maxRows: 5 }}/>
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
                <Icon type="plus" /> 添加地址
              </Button>

</center>
        
          </div>
        );
      }
    }

export default Address