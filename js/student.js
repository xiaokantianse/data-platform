// 公共逻辑设置
checkToken()
renderName()
logout()

 // 抽取函数 渲染页面

 const render = async() =>{
  const res = await axios.get('/students')
  const {data} = res
 document.querySelector('.list').innerHTML =  data.map(item =>{
    const {name,age,gender,hope_salary,salary,group,province,city,area} = item
    return `
    <tr>
      <td>${name}</td>
      <td>${age}</td>
      <td>${gender? '女':'男'}</td>
      <td>第${group}组</td>
      <td>${hope_salary}</td>
      <td>${salary}</td>
      <td>${province}${city}${area}</td>
      <td>
        <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
        <a href="javascript:;" class="text-danger"><i class="bi bi-trash"></i></a>
      </td>
    </tr>
    `
  }).join('')
 }
 render()

 // 初始化模态框
const modalDom = document.querySelector('#modal')
const myModal = new bootstrap.Modal(modalDom)
document.querySelector('#openModal').addEventListener('click', e=>{
  myModal.show()
})

// 省市区联动函数抽取

const selectLocation = async ()=>{
  const provinceDom = document.querySelector('[name=province]')
  const cityDom = document.querySelector('[name=city]')
  const areaDom = document.querySelector('[name=area]')
  
  // 默认渲染省份出来
  const {list} = await axios.get('/api/province')
  // console.log(list);
 provinceDom.innerHTML +=  list.map(ele => {
    return `<option value="${ele}">${ele}</option>`
  }).join('')
  
  // 根据省渲染市
  // 身份绑定change事件
  provinceDom.addEventListener('change', async e=>{
    // 要清空之前的内容
    cityDom.innerHTML = '<option value="">--城市--</option>'
   const {list} = await axios.get('/api/city',{params:{
      pname:e.target.value
    }})
    cityDom.innerHTML += list.map(item =>{
      return `<option value="${item}">${item}</option>`
    }).join('')
  })

  // 地区切换
  cityDom.addEventListener('change', async e=>{
    areaDom.innerHTML = '<option value="">--地区--</option>'
    const {list} = await axios.get('/api/area', {params:{
      pname:provinceDom.value,
      cname: e.target.value,
    }})

   areaDom.innerHTML +=  list.map(item =>{
      return `<option value="${item}">${item}</option>`
    }).join('')
  })


  



}
selectLocation()