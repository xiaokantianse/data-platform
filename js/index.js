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
    const {overview,year,salaryData,groupData,provinceData} = res.data
     renderOverview(overview)
     renderYear(year)
     renderSalary(salaryData)
     renderGroupData(groupData)
     renderGenderData(salaryData)
     renderProvince(provinceData)

   
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

// 薪资分布渲染
const renderSalary = (salaryData)=>{
  // console.log(salaryData);
  const  myChart = echarts.init(document.querySelector('#salary'))
  const option = {
    tooltip: {
      trigger: 'item'
    },
    title:{
      text:'班级薪资分布',
      top:10,
      left:10,
      textStyle:{
        fontSize:18,
      }
    },
    legend: {
      bottom:0,
      left: 'center'
    },
    series: [
      {
        name: '班级薪资分布',
        type: 'pie',
        radius: ['60%', '80%'],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 20,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          // position: 'center'
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        data: salaryData.map(ele =>{
          return {
            value:ele.g_count+ele.b_count,
            name:ele.label,
          }
        })
      }
    ]
  }
  myChart.setOption(option)
}


//渲染分组数据
const renderGroupData = (groupData)=>{
  // console.log(groupData);
  const  myChart = echarts.init(document.querySelector('#lines'))
  const option = {
    grid:{
      left: 70,
      top: 30,
      right: 30,
      bottom: 50,
    },
    tooltip:{},
    xAxis: {
      type: 'category',
      axisLine:{
        lineStyle:{
          type:'dashed',
          color:'#ccc'
        }
      },
      axisLabel:{
        color:'#999'
      },
      data: groupData[1].map(ele =>ele.name)
    },
    yAxis: {
      type: 'value',
      splitLine:{
        lineStyle:{
          type:'dashed'
        }
      }
    },
    series: [
      {
        data: groupData[1].map(ele => ele.hope_salary),
        type: 'bar',
        itemStyle:{
          color:{
            type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: '#34D39A' // 0% 处的颜色
          }, {
              offset: 1, color: 'rgba(52,211,154,0.2)' // 100% 处的颜色
          }],
          global: false
          }
        }
      },
      {
        data: groupData[1].map(ele => ele.salary),
        type: 'bar',
        itemStyle:{
          color:{
            type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: '#499FEE' // 0% 处的颜色
          }, {
              offset: 1, color: 'rgba(73,159,238,0.2)' // 100% 处的颜色
          }],
          global: false
          }
        }
      }
    ],
    
  }

  myChart.setOption(option)

  // 数据切换 要写在rendergroupdata里面 要不然无法获得option
  // 事件委托  排他思想
  document.querySelector('#btns').addEventListener('click', e=>{
    if(e.target.tagName === 'BUTTON'){
      // console.log(1);

      document.querySelector('.btn-blue').classList.remove('btn-blue')
      e.target.classList.add('btn-blue')
      const groupNum = e.target.innerHTML
      // console.log(groupNum);
      option.xAxis.data = groupData[groupNum].map(ele => ele.name)
      
      option.series[0].data = groupData[groupNum].map(ele => ele.hope_salary)
      option.series[1].data = groupData[groupNum].map(ele => ele.salary)
      


      myChart.setOption(option)


    }
  })
}

// 男女薪资分布
const renderGenderData = (salaryData) =>{
  // console.log(salaryData);
  const myChart = echarts.init(document.querySelector('#gender'))


  const option = {
    title:[
      {
        text:'男女薪资分布',
        top:10,
        left:5,
        textStyle:{
          fontSize:16
        }
      },
      {
        text:'男生',
        top:'45%',
        left:'45%',
        textStyle:{
          fontSize:12
        }
      }, {
        text:'女生',
        top:'85%',
        left:'45%',
        textStyle:{
          fontSize:12
        }
      },
    ],
    tooltip:{},
    series: [
      {
        name: '男生',
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['50%', '30%'],
        // itemStyle: {
        //   borderRadius: 8
        // },
        data: salaryData.map(ele => (
         { value:ele.b_count,
          name:ele.label,
        }
        ))
      }, 
      {
        name: '女生',
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['50%', '70%'],
        // roseType: 'area',
        // itemStyle: {
        //   borderRadius: 8
        // },
        data: salaryData.map(ele => ({ value:ele.g_count,name:ele.label})),
       },

    ]
    
  }

  myChart.setOption(option)

}

// 地图分布
function renderProvince(provinceData){
  // console.log(provinceData);
  const dom = document.querySelector('#map')
  const myEchart = echarts.init(dom)
  const dataList = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 0 },
    { name: '天津', value: 0 },
    { name: '上海', value: 0 },
    { name: '重庆', value: 0 },
    { name: '河北', value: 0 },
    { name: '河南', value: 0 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 0 },
    { name: '黑龙江', value: 0 },
    { name: '湖南', value: 0 },
    { name: '安徽', value: 0 },
    { name: '山东', value: 0 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 0 },
    { name: '浙江', value: 0 },
    { name: '江西', value: 0 },
    { name: '湖北', value: 0 },
    { name: '广西', value: 0 },
    { name: '甘肃', value: 0 },
    { name: '山西', value: 0 },
    { name: '内蒙古', value: 0 },
    { name: '陕西', value: 0 },
    { name: '吉林', value: 0 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 0 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 0 },
    { name: '宁夏', value: 0 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 },
  ]

  // 处理 数据
  dataList.forEach(item => {
    // console.log(item.name);
    // find includes方法要复习
    const res = provinceData.find(ele =>{
      return ele.name.includes(item.name)
    })
    // console.log(res);
    if(res){
      // console.log(res);
      item.value =  res.value
    }
  })
  const option = {
    title: {
      text: '籍贯分布',
      top: 10,
      left: 10,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 位学员',
      borderColor: 'transparent',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff',
      },
    },
    visualMap: {
      min: 0,
      max: 6,
      left: 'left',
      bottom: '20',
      text: ['6', '0'],
      inRange: {
        color: ['#ffffff', '#0075F0'],
      },
      show: true,
      left: 40,
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.0,
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: '#e0ffff',
        },
        emphasis: {
          areaColor: '#34D39A',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    series: [
      {
        name: '籍贯分布',
        type: 'map',
        geoIndex: 0,
        data: dataList,
      },
    ],
  }
  myEchart.setOption(option)
}