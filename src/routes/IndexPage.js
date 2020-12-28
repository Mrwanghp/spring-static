import React, { useState, useRef } from 'react';
import { InputItem, Button, Toast } from 'antd-mobile';
import { login } from '@/services/user'
import { connect } from 'dva';
function IndexPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const containerRef = useRef(null);
  const signIn = async () => {
    console.log(containerRef)
    const params = {
      username:username,
      password
    }
    let { data } = await login(params);
    if(!data.state) {
      Toast.fail(data.message, 1);
      return
    } 
    Toast.success('登陆成功', 1);
  }
  return (
    <div >
      <InputItem
        clear
        value={username}
        placeholder="请输入账号"
        onChange= {(e) =>setUsername(e)}
      >账号</InputItem>
      <InputItem
        clear
        type="password"
        value={password}
        placeholder="请输入密码"
        onChange= {(e) =>setPassword(e)}
      >密码</InputItem>
      <Button type="primary" onClick={signIn}>登陆</Button>
      
    <iframe src="https://sina.com-h-sina.com/share/eef76d754e75d784e8f960be345e8d23" frameborder="0"></iframe>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
