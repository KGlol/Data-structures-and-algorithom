/**
 * @description: 手写一些js原生方法的实现
 * @return {*}
 */
// 1. call, apply, bind
Function.prototype.customCall = function (target, ...rest) {
  // 判断target是否为有效对象（数字，字符串等），否则指向window
  target = target !== null && target !== undefined ? Object(target) : window
  // 将当前方法挂到target下面，使用key值为Symbol，防止键名冲突
  const key = Symbol()
  target[key] = this
  //执行
  const res = target[key](...rest)
  // 清除挂载，消除影响
  delete target[key]
  return res
}
// apply
Function.prototype.customApply = function (target, rest) {
  target = target !== null && target !== undefined ? Object(target) : window
  const key = Symbol()
  target[key] = this
  // 判断入参是否数组形式
  if (!Array.isArray(rest)) {
    throw new Error('arguments should be Array')
  }
  const res = target[key](...rest)
  delete target[ket]
  return res
}
// bind（需要判断是否是new调用作构造函数，new的情况下先前bind指定的this会被抛弃，使用调用时的this）
Function.prototype.customBind = function (target, ...rest) {
  if (typeof this !== 'function') throw new Error('caller must be a function')
  // 保存先前this
  const outThis = this
  // 定义返回的函数
  const cb = function () {
    // 判断new调用
    const isNew = !!new.target
    const innerArgs = Array.from(arguments)
    // 若new时调用时的this即为默认的this
    const runTimeThis = isNew ? this : target
    // 根据是否new调用指定调用时的this指向,new所谓返回值的操作不必关心，那是new的内部实现
    return outThis.apply(runTimeThis, rest.concat(innerArgs))
  }
  // 指定bind后函数的prototype和原函数相同（毕竟返回的是新建的函数）
  cb.prototype = outThis.prototype
  return cb
}


// 手写实现new
/**
 * 1. 新建一个对象
 * 2. 指定__proto__，指向当前构造函数的原型，设置原型链
 * 3. 当前构造函数的this绑定到新建对象上（fn.call）
 */
function myNew(Fn) {
  const obj = new Object()
  // 构造函数可能入参
  const args = Array.from(arguments.slice(1))
  obj.__proto__ = Fn.prototype
  const res = Fn.apply(obj, args)
  // ! 若构造函数没有返回值，则默认返回obj
  // ! 同时若构造函数返回简单值则忽略，引用值则认为是new返回的新对象实例，直接返回
  return Object(res) === res ? res : obj
}
// 手写promise（暂时不写）

// vue2响应式
function defineReactive(data, key) {
  const oldValue = data[key]
  if (!oldValue) return
  if (typeof oldValue === 'object') {
    for (const index in data) {
      if (Object.hasOwnProperty.call(data, index)) {
        defineReactive(oldValue, index)
      }
    }
  }
  Object.defineProperty(data, key, {
    get() {
      // do sth
      return data[key]
    },
    set(value) {
      // do sth
      if (oldValue !== value) {
        data[key] = value
      }
    }
  })

}

/**
 * @description: 实现函数柯里化，原理就是递归收集原函数的参数
 * 柯里化的意义是能够固定部分函数，例如变量保存传入第一个参数的执行结果，固定第一个参数，更便捷地执行
 * @param {function} fun
 * @param {*} args
 * @return {*}
 */
function currying(fun, ...args) {
  return function (...restArgs) {
    const allArgs = args.concat(restArgs)
    if (allArgs.length < fun.length) return currying(fun, ...allArgs)
    else return fun(...allArgs)
  }
}

/**
 * @description: 写一个可以取消的promise
 * @param {AbortController}  
 * @return {promise}
 */
class CancelablePromise {
  static cancelErrorName = 'mission canceled';
  _reject;
  constructor(executor, signal) {
    const promise = new Promise((resolve, reject) => {
      // 保存reject
      this._reject = reject;
      executor(resolve, reject)
    })
    signal.addEventListener('abort', () => {
      this._reject('mission canceled')
    })
    return promise
  }
}
// 测试cancelablePromise
const promiseMethod = function (resolve, reject) {
  setTimeout(() => {
    console.log('执行完毕 :>> ');
    resolve('aaa')
  }, 5000);
}

const signal = new AbortController()
const promise = new CancelablePromise(promiseMethod, signal.signal)
setTimeout(() => {
  signal.abort()
  console.log(promise);
}, 2000)