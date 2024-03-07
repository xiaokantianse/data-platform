axios.defaults.baseURL = "https://hmajax.itheima.net";

// 封装提示框函数

const showToast = (msg) => {
  const myToast = document.querySelector('.my-toast')
  const toastObj = new bootstrap.Toast(myToast)
  toastObj.show()
  document.querySelector('.toast-body').innerHTML = msg
};

const checkToken = ()=>{
  const {token} = JSON.parse(localStorage.getItem('userMsg'))
  if(!token){
    showToast('请先登录')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500);
  }
}

// 回显用户名

const renderName = ()=>{
  const data = localStorage.getItem('userMsg')?localStorage.getItem('userMsg'):{}
  const {username} = JSON.parse(data)
  // 判断有没有用户名
  if(username){
    document.querySelector('.username').innerHTML = username
  }
  
}

// 退出登录 （记得调用)

const logout = ()=>{
  document.querySelector('#logout').addEventListener('click', e=>{
    localStorage.removeItem('userMsg')
    showToast('退出登录了')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500);
  })
}
