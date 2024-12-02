/**
 * @description: 用类实现vue的批量更新功能，只执行最后一次render方法
 * @return {*}
 */
class Component {
  constructor() {
    this.data = new Proxy(this._data, {
      // get: (key) => { return this._data[key] },
      set: (target, key, val) => {
        // ! 关键一步，值正常更改，但是调用render是在同步代码之后，此时就能拿到最终的值
        this._data[key] = val
        if (!this.pending) {
          this.pending = true
          Promise.resolve().then(() => {
            this.render()
            this.pending = false
          })
        }
      }
    })
    // this.data = data
  };
  // 开关
  pending = false
  _data = {
    name: 2
  }
  render() {
    console.log(`render-${this._data.name}`);
  }
  // ! 直接使用setter拦截data会存在问题，更改data下的属性时不会触发setter
  // set data(val) {
  //   console.log(val);
  //   if (!this.pending) {
  //     if (val !== this._data.name) {
  //       this.pending = true
  //       this._data.name = val
  //       Promise.resolve().then(() => {
  //         this.render()
  //         this.pending = false
  //       })
  //     }
  //   }
  // }
}
const com = new Component()
// ! 直接使用setter拦截data会存在问题，更改data下的属性时不会触发setter
com.data.name = 2
com.data.name = 3
com.data.name = 4

setTimeout(() => {
  com.data.name = 10

});

setTimeout(() => {
  com.data.name = 20

});

// com.data = { name: 2 }
// com.data = { name: 3 }
// com.data = { name: 4 }

/**
 * @description: 面试题，动态代理，每次都返回一个代理，值相加传递，+操作时，调用原始值转化完成加运算
 * @return {*}
 */
// 生成proxy
function proxyCreator(num = 0) {
  const obj = { value: num }
  return new Proxy(obj, {
    get(target, key) {
      // 运算时获取原始值，Symbol.toPrimitive
      if (key === Symbol.toPrimitive) {
        // if (typeof key === 'symbol') {
        // ! 此处应返回函数，因为Symbol.toPrimitive会被执行
        return () => obj.value
      }
      // 数字累加
      return proxyCreator(+key + num)
    }
  })
}

// 动态代理封装
const add = proxyCreator()
const r1 = add[1][2][3] + 4//期望10
const r2 = add[10][20] + 30 //期望60
const r3 = add[100][200][300] + 400 //期望1000
console.log(r1);
console.log(r2);
console.log(r3);