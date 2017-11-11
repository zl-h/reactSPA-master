// import React from 'react';
// import {Form, Icon, Input, Button, Checkbox, Row, Layout} from 'antd';
//
// const { Header, Footer, Sider, Content } = Layout;
// const FormItem = Form.Item;
//
// class NormalLoginForm extends React.Component {
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//         });
//     }
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <div>
//                 <Layout>
//                     <Footer></Footer>
//                     <Content>
//                         <Form onSubmit={this.handleSubmit} className="login-form">
//                             <FormItem>
//                                 <div  style={{align:"center"}}> <h2>系统登录</h2></div>
//                             </FormItem>
//                             <FormItem>
//                                 {getFieldDecorator('userName', {
//                                     rules: [{ required: true, message: 'Please input your username!' }],
//                                 })(
//                                     <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
//                                 )}
//                             </FormItem>
//                             <FormItem>
//                                 {getFieldDecorator('password', {
//                                     rules: [{ required: true, message: 'Please input your Password!' }],
//                                 })(
//                                     <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
//                                 )}
//                             </FormItem>
//                             <FormItem>
//                                 <Button type="primary" htmlType="submit" className="login-form-button">
//                                     Log in
//                                 </Button>
//                             </FormItem>
//                         </Form>
//                     </Content>
//                     <Footer></Footer>
//                 </Layout>
//             </div>
//         );
//     }
// }
//
// const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
// export default WrappedNormalLoginForm;
