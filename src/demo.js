
const setFn = () => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            reject('哈哈')
        }, 1000);
    })
}

async function asyncFn() {
    // 这里await setFn()被reject了，那么就会把reject的值作为整个asyncFn函数的返回Promise的reject的值
  const a = await setFn()
  console.log(a);
  }
  asyncFn().then((res) => {
    console.log('res',res); 
  }).catch((e)=>{
      console.log('e',e); // e 哈哈
  })