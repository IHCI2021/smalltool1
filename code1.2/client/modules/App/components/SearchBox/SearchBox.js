import { Form, Icon, Input, Button } from 'antd';
import React from 'react';
import { Redirect } from 'react-router';
import callApi from '../../../../util/apiCaller';
import { browserHistory } from 'react-router'
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  class searchBox extends React.Component {
    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // callApi(`citizen/citizen/getSearchResult/${values.content}`).then(
          //   res=>{
          //     console.log(res);
          //   }
          // )
          //browserHistory.push(`citizen/getSearchResult/${values.content}`);
          window.location.href=`http://localhost:8000/citizen/getSearchResult/${values.content}`;
        }
      });


    };

    render() {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

      // Only show error after a field is touched.
      const contentError = isFieldTouched('content') && getFieldError('content');

      return (
        <Form action="#" layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item validateStatus={contentError ? 'error' : ''} help={contentError || ''}>
            {getFieldDecorator('content', {
              rules: [{ required: true, max:30 ,message: '请输入有效信息' }],
            })(
              <Input
                placeholder="请输入需要办理的业务相关信息"
              />,
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon="search" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              搜索
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

const WrappedSearchBox = Form.create({ name: 'SearchBox' })(searchBox);

export default WrappedSearchBox;

