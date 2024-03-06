axios.defaults.baseURL = "https://hmajax.itheima.net";

// 封装提示框函数

const showToast = (msg) => {
  const myToast = document.querySelector('.my-toast')
  const toastObj = new bootstrap.Toast(myToast)
  toastObj.show()
  document.querySelector('.toast-body').innerHTML = msg
};


