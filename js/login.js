// 收集数据并且验证

document.querySelector('#btn-login').addEventListener('click', async e=>{
  const loginForm = document.querySelector('.login-form')
  const data = serialize(loginForm, {hash:true, empty:true})

  if(!data.username || !data.password){
    return showToast('用户名和密码不能为空')
  }
  if(data.username.length <8 || data.username.length>30 ){
    return showToast('用户名格式不对')
  }
  if(data.password.length < 6 || data.password.length>30){
    return showToast('密码格式不对')
  }


  // 发送请求 判断响应结果

  try {
    const res =  await axios.post('./login', data)
    console.log(res);
    const obj = {}
    obj.username = res.data.data.username
    localStorage.setItem('userMsg', JSON.stringify(obj))
    showToast(res.data.message)

    setTimeout( ()=>{
      location.href = './index.html'
    },1500)
  } catch (error) {
    console.dir(error)
    return showToast(error.response.data.message)
  }



})

