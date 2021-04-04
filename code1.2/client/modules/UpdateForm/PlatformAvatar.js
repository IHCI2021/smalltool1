import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  //reader.addEventListener('load', () => callback(reader.result));
  // console.log(reader.result);
  reader.readAsDataURL(img);
}



export default class PlatformAvatar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      imageUrl:this.props.consult_QR_code
    };
  }

  beforeUpload = file => {
    //console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('上传的图片只能是 JPG 或 png 格式!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('上传图片大小不能超过 1MB!');
      return false;
    }
   reader.onload = () =>{
      //console.log(reader.result);
      this.setState({
          imageUrl: reader.result,
          loading: false,
        })
        this.props.get_consult_QR_code(this.state.imageUrl)
    }
  }


  handleChange = info => { 
    // if (info.file.status === 'uploading') {
    //   this.setState({ loading: true });
    //   return;
      
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl =>
    //     this.setState({
    //       imageUrl,
    //       loading: false,
    //     }),
    //   );
    // }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击上传图片</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="consult_QR_code"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="consult_QR_code" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}