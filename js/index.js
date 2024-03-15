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
  
    // await 不能处理错误
    const res = await axios({
       url: "/dashboard",
       method: "get",
      //  headers: {
      //    Authorization: token,
      //  }
     })
    //  console.log(res);
    const {overview,year} = res.data
     renderOverview(overview)
     renderYear(year)

   
  // } catch (error) {
  //   // console.dir(error);
  //   // if(error.response.status === 401){
  //   //   showToast('登录失效 请重新登录')
  //   //   localStorage.removeItem('userMsg')
  //   //   setTimeout(()=>{
  //   //     location.href = './login.html'
  //   //   },1500)
  //   // }
  // }
 
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

// 渲染薪资走势数据

const renderYear = (year)=>{
  // console.log(year);
  const  myChart = echarts.init(document.querySelector('#line'))

const option = {
  title:{
    text:'2022年全学科薪资走势',
    left:5,
    top:10,
  },
  grid:{
    top:'20%',
  },

  xAxis: {
    type: 'category',
    axisLine:{
      // show:false,
      lineStyle:{
        type:'dashed',
        color:'#ccc'
      }
    },
    data: year.map(ele => ele.month)

  },
  yAxis: {
    type: 'value',
    splitLine:{
      lineStyle:{
        type:'dashed',
      }
    }
  },
  series: [
    {
      data: year.map(ele => ele.salary),
      type: 'line',
      smooth: true,
      symbolSize: 10,
      lineStyle:{
        width:10,
        color:{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
              offset: 0, color: '#479dee' // 0% 处的颜色
          }, {
              offset: 1, color: '#5c75f0' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
      },
      areaStyle:{
        color:{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: '#b2d7f7' // 0% 处的颜色
          }, {
              offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
        }
    }
  ],
  tooltip:{
    show:true,
    trigger:'axis',
  }
}

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);
}

// 初始化echart实例
