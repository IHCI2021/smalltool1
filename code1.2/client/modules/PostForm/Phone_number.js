import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button,Form, Input,Select, Icon, AutoComplete} from 'antd';
const {Option} = Select;
//表单样式
const formItemLayout = {
  labelCol: {
    span:5
  },
  wrapperCol: {
    span:16
  },
};

class Phone_number extends Component{
  constructor(props){
    super(props);
    this.state = {
      phone_number : [
      ],
      phone_number_address:[
      ]
    };

    this.getCookie = this.getCookie.bind(this);
  }

  //装载入记录
  componentDidMount(){
    var item = this.getCookie('phone_number');
    //console.log(item);
    if(item.length == 0 )
      this.setState({phone_number: ['无历史输入记录']})
    else
      this.setState({phone_number: item});

    var item2 = this.getCookie('phone_numbers_address')
      if(item2.length == 0 )
      this.setState({phone_number_address: ['无历史输入记录']})
    else
      this.setState({phone_number_address: item2});
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
    const content = form.getFieldValue("content_phone_numbers");
    const content2=form.getFieldValue("content_phone_number_address")
    if (content.length === 1||content2.length===1) {
      return;
    }
   
    content.splice(index,1);
    form.setFieldsValue({
      content_phone_numbers: content
    });
    let data = this.props.arr;
    data.splice(index, 1);
    this.setState({ arr: data });
    //console.log(content);


    content2.splice(index,1);
    form.setFieldsValue({
      content_phone_number_address: content2
    });
    let data2 = this.props.arr2;
    data2.splice(index, 1);
    this.setState({ arr2: data2 });
  };
//输入框的值赋值到父组件的state
  HandleInputPhone = (index,e) =>{
    const a = this.props.arr;
    a[index].pNumber = e;
    this.props.setArr(a);
  }
  HandleInputAddress = (index,e) =>{
    const a = this.props.arr2;
    a[index].names = e;
    this.props.setArr2(a);
  }
  HandleSelect = (index,value) =>{
    const a = this.props.arr;
    a[index].area = value;
    this.props.setArr(a);
  }

  //增加新输入框
  add = () => {
    let data = this.props.arr;
    this.props.setArr(data.concat({area:'020',pNumber:''}))

    let data2 = this.props.arr2;
    this.props.setArr2(data2.concat({names:''}))
  };
      render() {
        const { getFieldDecorator } = this.props.form;

        return (
          <div><center><h3>咨询电话（至少填一项）</h3></center>
          
          {this.props.arr.map((item, index) => (
              <Form.Item
                {...(formItemLayout)}
                  key={index}
                  label={'地址-电话'}
              >
                {getFieldDecorator(`content_phone_number_address[${index}]`, {
                    initialValue: this.props.arr2[index].names,
                      rules: [{ required: true, 
                        message: "请输入地址" },
                        { pattern:new RegExp('.*[\u4e00-\u9fa5]{1,}.*'),
                        message:'每项20个中英文字符以内，不含空格',
                        }]
                    })(<AutoComplete
                      dataSource={this.state.phone_number_address}
                      onChange={this.HandleInputAddress.bind(this,index)}
                      style={{ width: '40%' }}>
                        <Input 
                        type="string"/>
                    </AutoComplete>)
                    } ：{
                      getFieldDecorator(`content_phone_numbers[${index}].area`, {
                        initialValue: item.area||'020',
                      })
                      (
                        //区号
                        <Select 
                        onChange= {this.HandleSelect.bind(this,index)}
                        style={{ width: '20%' }}>
                          <Option value="020">020</Option>      
                          <Option value="0755">0755</Option>      
                          <Option value="0769">0769</Option>
                          <Option value="0757">0757</Option>      
                          <Option value="0760">0760</Option>
                          <Option value="0660">0660</Option>
                          <Option value="0662">0662</Option>
                          <Option value="0663">0663</Option>
                          <Option value="0668">0668</Option>
                          <Option value="0750">0750</Option>
                          <Option value="0751">0751</Option>
                          <Option value="0752">0752</Option>
                          <Option value="0753">0753</Option>
                          <Option value="0754">0754</Option>
                          <Option value="0756">0756</Option>
                          <Option value="0758">0758</Option>
                          <Option value="0759">0759</Option>
                          <Option value="0762">0762</Option>
                          <Option value="0763">0763</Option>
                          <Option value="0766">0766</Option>
                          <Option value="0768">0768</Option>
                        </Select>,
                      )
                    } - {getFieldDecorator(`content_phone_numbers[${index}].pNumber`, 
                    {
                      initialValue: item.pNumber,
                      rules: [{ required: true, 
                        message: "请输入电话或删除此文本框" },
                        { pattern:new RegExp('^([0-9]{8}|[0-9]{11})$'),
                        message:'请输入8位或11位正确的电话号码',
                        }]
                    })
                    (<AutoComplete 
                      dataSource={this.state.phone_number}
                      onChange={this.HandleInputPhone.bind(this,index)}
                      //onSelect={(value)=>{console.log(value)}}
                      style={{ width: '30%' }}>
                        <Input maxLength="11" type="string" />
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
                <Icon type="plus" /> 添加电话
              </Button>

</center>
          </div>
        );
      }
    }
    export default Phone_number