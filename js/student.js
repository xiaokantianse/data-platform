// 公共逻辑设置
checkToken()
renderName()
logout()

 // 抽取函数 渲染页面

 const render = async() =>{
  const res = await axios.get('/students')
  const {data} = res
 document.querySelector('.list').innerHTML =  data.map(item =>{
    const {name,age,gender,hope_salary,salary,group,province,city,area,id} = item
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
        <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen" data-id=${id}></i></a>
        <a href="javascript:;" class="text-danger"><i class="bi bi-trash" data-id=${id}></i></a>
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
  document.querySelector('.modal-title').innerHTML = '添加学员'
})

// 省市区联动函数抽取
const provinceDom = document.querySelector('[name=province]')
const cityDom = document.querySelector('[name=city]')
const areaDom = document.querySelector('[name=area]')

const selectLocation = async ()=>{
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

// 新增学生业务逻辑 && 编辑学生业务
document.querySelector('#submit').addEventListener('click', e=>{
  const txt = document.querySelector('.modal-title').innerHTML
  // 增加学生
  if(txt.includes('添加')){
    addStudent()
  }

  if(txt.includes('编辑')){
    // console.log('编辑');
    editSubmit()
  }
  

})
const formDom = document.querySelector('#form')

const addStudent = async e=>{
  const data = serialize(formDom, {hash:true, empty:true})
  data.age = +data.age
  data.gender = +data.gender
  data.salary = +data.salary
  data.hope_salary = +data.hope_salary
  data.group = +data.group

  try{
    const {message} = await axios.post('/students',data)
    showToast(message)
    myModal.hide()
    formDom.reset()
    render()
  }
catch(err){
  myModal.hide()
  showToast('输入有误，重新填写')
  formDom.reset()
}
}

// 删除学生业务逻辑

// 事件委托
document.querySelector('.list').addEventListener('click', e=>{
  const {target:{classList,dataset}}=e
  //  如果是删除
 if(classList.contains('bi-trash')){
  const id = dataset.id
  delStudent(id)
 }
 // 如果是编辑
 if(classList.contains('bi-pen')){
  const id = dataset.id
  myModal.show()
  // 修改模态框的title
  document.querySelector('.modal-title').innerHTML = '编辑学员'
  editStudent(id)
  document.querySelector('.modal-title').dataset.id = id
 }
})

const delStudent = async(id)=>{
  console.log(id);
  try{
   await axios.delete(`/students/${id}`)
    showToast('删除成功')
    render()
  }catch(err){
    showToast('删除失败，请检查网络')
  }
}

// 编辑学生函数 获取详情和回显数据
const editStudent = async (id)=>{
//  console.log(id);
const res = await axios.get(`/students/${id}`)
// console.log(res);
// 先渲染一些简单数据
const arrKeys = ['age','name','salary','hope_salary','group']
arrKeys.forEach(item =>{
  document.querySelector(`[name=${item}]`).value = res.data[item]
})
const genders =  document.querySelectorAll('[name=gender]')
// console.log(genders);
genders[res.data.gender].checked = true
const {province,city,area} = res.data
provinceDom.value = province
const {list:cList} = await axios.get('/api/city',{
  params:{
    pname:province
  }
})
cityDom.innerHTML +=  cList.map( item=>{
  return `<option value=${item}>${item}</option>`
})
cityDom.value = city

const {list:aList} = await axios.get('/api/area', {
  params:{
    pname:province,
    cname:city,
  }
})
// console.log(aList);
areaDom.innerHTML += aList.map(item => {
  return `<option value=${item}>${item}</option>`
})
areaDom.value = area
}

// 封装函数 编辑以后提交

const editSubmit = async ()=>{
 const id =  document.querySelector('.modal-title').dataset.id
 // 获取编辑数据
 const data = serialize(formDom, {hash:true, empty:true})
 data.age = +data.age
 data.group = +data.group
 data.salary = +data.salary
 data.hope_salary = +data.hope_salary
 data.gender = +data.gender

 try {
 const res = await axios.put(`/students/${id}`,data)
 myModal.hide()
 showToast(res.message)
 formDom.reset()
 render()
 document.querySelector('.modal-title').dataset.id = ''
 } catch (error) {
  myModal.hide()
  showToast('操作失败')
 }

}