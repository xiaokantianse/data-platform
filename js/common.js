axios.defaults.baseURL = "https://hmajax.itheima.net";

// 封装提示框函数

const showToast = (msg) => {
  const myToast = document.querySelector('.my-toast')
  const toastObj = new bootstrap.Toast(myToast)
  toastObj.show()
  document.querySelector('.toast-body').innerHTML = msg
};

// 抽取公共的数据
const data = localStorage.getItem('userMsg')?JSON.parse(localStorage.getItem('userMsg')) :{}

const checkToken = ()=>{
  // 必须判断是否有token 
  
  const {token} = data
  if(!token){
    showToast('请先登录')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500);
  }
}

// 回显用户名

const renderName = ()=>{

  const {username} = data
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

// 请求拦截器

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log(config);
  const {token} = data
  if(token){
    config.headers['Authorization'] = token 
   
  }
  return config;
  
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
})


//统一处理Token失效
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.dir(error)
  if(error.response.status === 401){
    showToast('登录失效 请重新登录')
      localStorage.removeItem('userMsg')
      setTimeout(()=>{
        location.href = './login.html'
      },1500)
  }
  return Promise.reject(error);
});
