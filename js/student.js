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