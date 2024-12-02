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
// const promiseMethod = function (resolve, reject) {
//   setTimeout(() => {
//     resolve('aaa')
//     console.log('执行完毕 :>> ');
//   }, 2000);
// }

// const signal = new AbortController()
// const promise = new CancelablePromise(promiseMethod, signal.signal)
// setTimeout(() => {
//   signal.abort()
//   console.log(promise);
// }, 1000)

/**
 * @description: 实现深拷贝，循环调用时使用唯一weakMap，初始化+每次调用参数传入
 * @return {*}
 */
function deepClone(target, weakMap = new WeakMap()) {
  // ! null与null绝对相等
  if (typeof target === 'object' && target !== null) {
    const res = Array.isArray(target) ? [] : {}
    if (weakMap.has(target)) return weakMap.get(target)
    //!直接返回target，违背深拷贝的目的
    // if (weakMap.has(target)) return target
    weakMap.set(target, res)
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        res[key] = deepClone(target[key], weakMap)
      }
    }
    return res
  } else { return target }
}

// 可取消的promise

class CancelPromise {
  abort
  _reject
  // abort
  constructor(executor) {
    const promise = new Promise((resolve, reject) => {
      this._reject = reject
      executor(resolve, reject)
    })
    const controller = new AbortController()
    controller.signal.addEventListener('abort', () => this._reject('mission cancel'))
    console.log(controller.abort);
    this.abort = controller.abort
    // promise.__proto__.abort = controller.abort
    return promise
  }
}

const k = new CancelPromise(() => setTimeout((resolve, reject) => {
}, 5000))
console.log('object', k);
// k.abort()

// 对对象进行过滤操作
function objFilter(obj) {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value > 80))
  } else return obj
}

// 如何判断是否async函数
// toString
async function async1() {
  await console.log('async');
}
// console.log(async1.toString().includes('async')) // 不准确
// console.log(Object.prototype.toString.call(async1)) //[object AsyncFunction]
// // 通过[Symbol.toStringTag] ES6引入[Symbol.toStringTag]用于对一个对象的默认字符串描述
// console.log(async1[Symbol.toStringTag]) // 'AsyncFunction'

// 类数组到数组
const arrLike = new Set()
// 1 .Array.from(arrLike)
// console.log(Array.prototype.slice.call(arrLike))
// [...Set]

/**
 * @description: 节流防抖
 * @return {*}
 */
function throttle(func, delay) {
  let timer
  return function (...args) {
    const ctx = this
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(ctx, args)
      }, delay);
    }
  }
}

function debounce(func, delay) {
  let timer
  return function () {
    const ctx = this
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      timer = null
      func.apply(ctx, Array.from(arguments))
    }, delay)
  }
}

// function xxx() {
//   console.log(1234);
// }

// const cd = debounce(xxx, 3000)
// cd()
// cd()
// cd()

/**
 * @description: 函数重载
 * @param {object} 方法需要挂载的位置 
 * @param {name} 方法名 
 * @param {fn} 需执行的方法
 * @return {*}
 */

function functionReloader(obj, name, obj) {
  const previousMethod = obj[name]
  obj[name] = function (...args) {
    // 参数相同，则直接执行当前传入方法
    if (args.length === fn.length) {
      return fn.apply(this, args)
    } else if (typeof previousMethod === 'function') {
      return previousMethod, apply(this, args)
    }
  }
}

Function.prototype.customCall2 = function (ctx, ...rest) {
  // 判断是否简单值
  ctx = ctx !== null && ctx !== undefined ? Object(ctx) : window
  // this指向ctx
  const key = Symbol()
  ctx[key] = this
  const res = ctx[key]
  delete ctx[key]
  return res
}
Function.prototype.customApply2 = function (ctx, args) {
  ctx = ctx === undefined || ctx === null ? window : Object(ctx)
  // 绑定this
  const key = Symbol()
  ctx[key] = this
  // 判断入参形式
  const res = ctx[key](args)
  delete ctx[key]
  return res
}
// 判断当前环境是否浏览器
function isBrowser() {
  return typeof window !== 'undefined'
}


/**
 * @description: vue2深度监听
 * @return {*}
 */
// 监听数组，思路-原型链添加一环，拦截array操作
function arrayObserver(target, key, value) {
  const arrayProto = Array.prototype
  const obj = new Object(arrayProto)
  const methodEnums = ['push', 'pop', 'shift', 'unshift', 'concat', 'splice', 'slice']
  methodEnums.forEach((method) => {
    obj[method] = function () {
      // updateView()
      arrayProto[method].call(this, ...arguments)
    }
  })
  Object.setPrototypeOf(target, obj)
}

/**
 * @description: vue3proxy监听
 * @return {*}
 */
function observerWithProxy(target) {
  //  判断类型
  if (typeof target !== 'object' || target === null) {
    return target
  }
  const defineProxy = {
    get(key) {
      // 仅处理自身属性
      const isOwnProperty = Reflect.ownKeys(target).includes(key)
      if (isOwnProperty) {
        const res = Reflect.get(target, key)
        return observerWithProxy(res)
      }
    },
    set(key, value) {
      // 相同值不监听
      if (value === target[key]) return true
      // 区分新建和修改
      if (Reflect.get(key)) {
        // 修改
      } else {
        // 新建
      }
      return Reflect.set(target, key, value)
    },
    deleteProperty(key) {
      const res = Proxy.deleteProperty(target, key)
      // dosth
      return res
    }
  }
  return new Proxy(target, defineProxy)
}