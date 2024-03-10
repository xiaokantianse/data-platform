checkToken();

renderName();

logout();

// 获取首页数据业务

// const {token} = JSON.parse(localStorage.getItem('userMsg'))

// axios({
//   url:'/dashboard',
//   method:'get',
//   headers:{
//     Authorization:token,
//   }
// }).then( res =>{
//   console.log(res);
// })

// 封装函数 获取数据

const getData = async () => {
  // const data = localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')):{}
  // const { token } = data
  // token 过期或被篡改 处理
  try {
    // await 不能处理错误
    const res = await axios({
       url: "/dashboard",
       method: "get",
      //  headers: {
      //    Authorization: token,
      //  }
     })
    //  console.log(res);
     renderOverview(res.data.data.overview)
   
  } catch (error) {
    // console.dir(error);
    // if(error.response.status === 401){
    //   showToast('登录失效 请重新登录')
    //   localStorage.removeItem('userMsg')
    //   setTimeout(()=>{
    //     location.href = './login.html'
    //   },1500)
    // }
  }
 
}

getData()

// 渲染概览数据 在获取数据里面调用

const renderOverview = (overview) =>{
  // console.log(overview);

  // 对象的[]方法
  // console.log(Object.keys(overview));
  Object.keys(overview).forEach(ele =>{
    document.querySelector(`.${ele}`).innerHTML = overview[ele]
  })

}