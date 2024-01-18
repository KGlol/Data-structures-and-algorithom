/**
 * @description: 动态规划各种题型
 * @return {*}
 */
// 1. 最简单基础的斐波那契-动归O(n)
function fibonacci_dp(n) {
  const dp = []
  dp[0] = 1, dp[1] = 1
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n - 1]
}
// fibonacci - 常规解法（使用三个变量）O(n)
function fibonacci_regular(n) {
  let a = 1, b = 1, sum = 0
  if (n <= 2) return 1
  for (let i = 3; i <= n; i++) {
    sum = a + b
    a = b
    b = sum
  }
  return sum
}
console.log('fibonacci_regular :>> ', fibonacci_regular(5));
console.log('fibonacci_dp :>> ', fibonacci_dp(5));
// 2.1爬楼梯问题O(n)
function stairs_climbing(n) {
  // 爬到n阶一共有几种方法的数组
  const dp = []
  dp[0] = 1
  dp[1] = 2
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n - 1]
}

console.log('stairs_climbing :>> ', (stairs_climbing(4)));
/* 2.2最小花费爬楼梯问题
*  每一阶花费[5,10,15,20]
* 可以在第一层/第二层出发，到出发层不花费体力
*/
function stairs_minus_cost() {
  const cost = [5, 10, 15, 20, 25]
  const levels = cost.length
  // dp为跳到每层的花费
  const dp = []
  dp[0] = 0
  dp[1] = 0
  for (let i = 2; i < levels; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  return dp[levels - 1]
}
console.log('stairs_minus_cost :>> ', stairs_minus_cost());
// 3.1 不同路径问题O(mn)
function path_summary(m, n) {
  // dp表示到达某点的路径总和
  const dp = []
  if (m < 1 || n < 1) return 0
  if (m === 1 && n === 1) return 0
  for (let i = 0; i < m; i++) {
    //  二维数组每一项数组的初始化
    dp[i] = []
    // ! 确定初始值，到达第一行的所有位置都只有一种路径
    dp[i][0] = 1
    for (let j = 0; j < n; j++) {
      // ! 确定初始值，到达第一列的所有位置都只有一种路径
      dp[0][j] = 1
      /*
      *! 每一位置都是上/左位置的路线数量之和
      * 这里注意之前不需要加1，
      * 因为两个之前位置到达当前位置的路下都只有唯一一种，
      * 这里统计的是种类，不是步数
      */
      if (i >= 1 && j >= 1) dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  console.log('dp :>> ', dp);
  return dp[m - 1][n - 1]
}

console.log('path_summary :>> ', path_summary(4, 4));

/*
* 3.2 不同路径包含障碍物 O(mn)
* 重点-分开处理初始值有障碍和其他点有障碍的情况
*/
const barrierCoordinates = [[1, 1], [1, 0], [1, 2], [1, 3]]
function path_summary_with_barrier(m, n) {
  const dp = []
  if (m === 1 && n === 1) return 0
  if (m < 1 || n < 1) return 0
  // 起始有障碍物的情况，直接返回0
  const res = barrierCoordinates.some(each => {
    return (each[0] === 0 && each[1] === 0) || (each[0] === m - 1 && each[1] === n - 1)
  })
  if (res) return 0
  // 公式
  for (let i = 0; i < m; i++) {
    dp[i] = []
    // 第一行的有障碍的点路线数为0
    hasBarrier(i, 0) ? dp[i][0] = 0 : dp[i][0] = 1
    for (let j = 0; j < n; j++) {
      // 第一列有障碍后面的路线数就为0
      if (hasBarrier(i, j)) {
        i === 0 && (dp[i][j] = 0)
      } else {
        // 不重复赋值
        dp[0][j] !== 1 && (dp[0][j] = 1)
      }
      // 当前点不是障碍物则正常动规，是障碍点则路线数归零
      if (!isBarrier(i, j)) {
        if (i >= 1 && j >= 1) dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      } else {
        (dp[i][j] = 0)
      }
    }
  }
  function isBarrier(a, b) {
    return barrierCoordinates.some(each => {
      return each[0] === a && each[1] === b
    })
  }
  // 判断第一行 / 列是否有障碍物
  function hasBarrier(a, b) {
    if (a === 0) {
      return barrierCoordinates.some(each => {
        return each[0] === 0 && each[1] <= b
      })
    }
    if (b === 0) {
      return barrierCoordinates.some(each => {
        return each[0] <= a && each[1] === 0
      })
    }
    return false
  }
  console.log('dp :>> ', dp);
  try {
    return dp[m - 1][n - 1]
  } catch {
    return 0
  }
}
console.log('path_summary_with_barrier :>> ', path_summary_with_barrier(4, 4));


/**整数拆分，拆成几个数字之和，这几个数字相乘的结果最大
 * ! 不对
 * 
 */

// 整数拆分，相乘最大值
function int_split_time_max_result(n) {
  // dp[i]表示i拆分后的相乘最大值结果
  const dp = []
  //  初始化
  dp[0] = 0
  dp[1] = 0
  dp[2] = 1
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = Math.max(j * (i - j), j * dp[i - j])
    }
  }
  console.log('object :>> ', dp);
  return dp[n]
}

console.log('int_split_time_max_result :>> ', int_split_time_max_result(10));

/**
 * @description: 二叉搜索树的种类，二叉搜索树的特点是左右节点分别小于/大于父节点
 * @param {*} n
 * @return {*}
 * ! 因为要进行累加操作，所以数组的所有项都要初始化为0，否则会出现NaN
 * ! dp[0]存在，且dp[0]为1，代表全部/某一侧无节点的情况
 */
function binary_search_tree_types(n) {
  // dp表示搜索树种类
  // ! 因为要进行累加操作，所以数组的所有项都要初始化为0，否则会出现NaN
  const dp = (new Array(n + 1)).fill(0)
  // 注意0个节点的情况二叉搜索树是存在的，且是满二叉树，亦是平衡二叉树
  // 只初始化0即可dp[1] = dp[0]*dp[0]
  dp[0] = 1
  // 推导，i个节点时，j为中间节点的情况下的公式
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
    // dp[i] = i * dp[i - 1]
  }
  console.log('dp :>> ', dp);
  return dp[n]
}

console.log('binary_search_tree_types :>> ', binary_search_tree_types(3));


/**
 * 01背包问题
 * 暴力解法：回溯法
 *  */


function ajax(url, method = 'get', data) {
  method = method.toUpperCase()
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successCallback(xhr.responseText)
      }
    }
  }
  xhr.onerror = function (e) {
    throw new Error(e)
  }
  xhr.send()
}

// 节流throttle
function throttle() {
  let timer = 0
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = 0
    }, delay)
  }
}

// 防抖
function debounce() {
  let timer = 0
  return function (fn, delay) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      // 箭头函数放在计时器里面调用时指向全局
      fn.apply(this, arguments)
      timer = 0
    }, delay)
  }
}

function lsc(text1, text2) {
  // dp代表最长子序列长度
  const m = text1.length, n = text2.length, dp = []
  for (let i = 0; i < m; i++) {
    // 初始化
    dp[i] = []
    dp[i][0] = 0
    for (let j = 0; j < n; j++) {
      // 初始化
      dp[0][j] = 0
      if (text1[i] !== text2[j]) {
        // 两者不相等，当前最长子序列长度字符串各少一个时的最长的最大值
        if (i > 0 && j > 0) dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      } else {
        // 最后一位相等，则dp为两字符串去掉最后一位的dp长度+1
        if (i > 0 && j > 0) dp[i][j] = dp[i - 1][j - 1] + 1
      }
    }
  }
  return dp[m - 1][n - 1]
}

// 锯齿数组，返回最小次数
function zigzagMiniumTimeCounter(nums) {
  let oddCounter = 0, evenCounter = 0
  for (let i = 0; i < nums.length; i++) {
    console.log('i :>> ', i);
    // m为谷底数需要减的最小数字/次数
    if (i % 2 !== 0) {
      const m = nums[i] - Math.min(nums[i - 1] || Infinity, nums[i + 1] || Infinity) + 1
      oddCounter += m >= 0 ? m : 0
    } else {
      const n = nums[i] - Math.min(nums[i - 1] || Infinity, nums[i + 1] || Infinity) + 1
      evenCounter += n >= 0 ? n : 0
    }
  }
  return Math.min(oddCounter, evenCounter)
}

console.log(zigzagMiniumTimeCounter([9, 6, 1, 6, 2]));

// 有序数组，两数之和
function twoSummary(arr) {
  let leftIndex = 0, rightIndex = arr.length - 1
  while (leftIndex < rightIndex) {
    const sum = arr[leftIndex] + arr[rightIndex]
    if (sum === 9) return [leftIndex, rightIndex]
    else {
      sum < 9 && leftIndex++
      sum > 9 && rightIndex--
    }
  }
  return null
}

// console.log('twoSummary :>> ', twoSummary([1, 2, 3, 4, 5, 6, 7, 8]));

// 相向数组三数之和为零，数组无序，复杂度O(n*n)
function threeSummary(arr) {
  if (n < 3) return res
  // 排序的复杂度是O(nlogn)
  arr = arr.sort()
  // 同两数之和的思路，双指针，固定一个的值，找两值
  // 结果数组
  const res = [], n = arr.length
  /**
   * 1. 数组要有序
   * 2. 基本逻辑下标，i<j<k
   * 3. n-2是因为要留出另外两数的空间
   */
  for (let i = 0; i < n - 2; i++) {
    const x = arr[i]
    let j = i + 1, k = n - 1
    // 固定i的对应值，找将三数和转化为两数和
    // ! 双指针的复杂度是O(n)
    while (j < k) {
      const sum = x + arr[j] + arr[k]
      if (sum < 0) {
        // 不必考虑前后数字相同的情况，自然会被循环过滤掉
        j++
      } else if (sum > 0) {
        // 不必考虑前后数字相同的情况，自然会被循环过滤掉
        k--
      } else {
        // 等于零时，需要分类讨论
        res.push([i, j, k])
        j++
        k--
        // 循环判断，是因为连续重复的情况可能不止两次
        while (j < k && arr[j] === arr[j - 1]) {
          j++
        }
        while (k > j && arr[k] === arr[k + 1]) {
          k--
        }
      }
    }
  }
}
// 相向指针，水桶最大容积问题 O(n)
function bucketMax(height) {
  /**
   * 公式：(j-i) * (Math.min(height[j], height[i]))
   * i<j
   * 双指针的关键是分析情况，找出求得最终结果的公式/方法，也就是移动两边指针的条件
   * 这题的关键是要分析出，只要短的那条不动，无论另外一条怎么动都不会大于当前容积，所以移动指针的条件就是移动较短的那条的下标
   *  */
  const n = height.length
  if (n < 2) return 0
  height = height.sort()
  let j = n - 1, ans = 0
  while (i < j) {
    const volume = (j - i) * Math.min(height[j], height[i])
    ans = Math.max(ans, volume)
    if (height[i] < height[j]) i++
    else j--
  }
}

/**
 * 同向双指针
 */

/**
 * @description fetch添加取消和超时功能
 * @param {*} timeout 
 * @returns function
 */
function createFetchWithAbort(timeout = 5000) {
  return function fetchRequest(url, options = {}) {
    const promise = new Promise((resolve, reject) => {
      const signalController = new AbortController()
      fetch(url, { ...options, signal: signalController.signal }).then(res => {
        resolve(res)
      }).catch(e => new Error(e))
      // 取消方法挂载到请求函数上，
      promise.cancel = signalController.abort
      // ! 最好的办法是将abort封装到promise的链式调用中
      // 超时逻辑
      timeout(() => {
        reject(new Error('request timeout'))
        signalController.abort()
      }, timeout)
    })
    return promise
  }
}

/**
 * 可取消的promise实现
 */

class CancelablePromise {
  static cancelErrorName = 'mission canceled'
  constructor(executor, signal) {
    let _reject
    const cancelablePromise = new Promise((resolve, reject) => {
      _reject = reject
      executor(resolve, reject)
    })

    // 监听取消事件,添加监听的对象是abortController.signal
    signal.addEventListener('abort', () => {
      // 不必再做promise的状态判断，不论promise状态是否变化，都直接进行取消
      // DOMException用于Web api调用的错误params1代表message，params2代表name，cancelErrorName的设计可以在外部用于判断是否取消的promise
      _reject(new DOMException('promise canceled by user', cancelErrorName))
    })
    // 构造函数返回当前改造的promise,
    // ! 默认情况下constructor会返回当前实例
    return cancelablePromise
  }
}

// 手写promise
class CustomPromise {
  constructor(executor) {


  }
  static all() { }
  static race() { }
  then() { }
  catch() { }
}


/**
 * js实现函数重载，简单的函数向上缓存逻辑（闭包）
 * 重点是保存逐级缓存之前的判断函数，一直指向第一次调用时传入的方法
 * 需要在同一个对象上添加方法，否则无法构成链条
 * 例子方法只是演示不同传参数量，不同逻辑的简单情况
 *  */
function functionReloadMaker(obj, name, fn) {
  // 缓存上次的判断函数
  const previousMethod = obj[name]
  // 逐级缓存逻辑
  obj[name] = function (...args) {
    // 参数量相同，则直接调用当前传入方法
    if (args.length === fn.length) {
      return fn.apply(this, args)
    } else if (typeof previousMethod === 'function') {
      return previousMethod.apply(this, args)
    }
  }
}
const server = {}
console.log('that :>> ', this);
functionReloadMaker(server, 'name', () => {
  console.log('object0 :>> ', this);
})
functionReloadMaker(server, 'name', (name) => {
  console.log('object1 :>> ', this, name);
})
functionReloadMaker(server, 'name', (name, lastName) => {
  console.log('object2 :>> ', this, name, lastName);
})
server.name('k')
server.name()
server.name('a', 'b')


// 满足和小于target的长度最小值数组，也就是滑动窗口算法O(n)

function minSubArrayLen(array, target) {
  let n = array.length, left = 0, ans = n + 1, sum = 0
  for (let right = 0; right < n; right++) {
    sum += array[right]
    while (sum >= target) {
      ans = Math.min(ans, right - left + 1)
      // 滑窗向右移动
      sum -= array[left++]
    }
  }
  return ans <= n ? ans : 0
}
/**
 * 相当于每次遍历固定右端点，
 * 再通过while的判断条件移动左端点，
 * 即可在每次遍历算出包含固定右端点的，所有符合条件子数组
 * * 此时每次固定右端点的子数组个数是 r-l+1 （关键）
 * 累加之后得到结果
 * 即可计算出所有符合条件的子序列
 *  */
function timeSubArrCount(nums, k) {
  // 单独讨论k小于等于1的情况
  if (k <= 1) return 0
  let ans = 0, left = 0, timeRes = 1, n = nums.length
  for (let right = 0; right < n; ++right) {
    timeRes *= nums[right]
    // 每次循环时乘积大于等于k时移动left
    while (timeRes >= k) {
      // left右移动
      timeRes = timeRes / nums[left++]
    }
    ans += right - left + 1
  }
  return ans
}

// 手机号中间四位加星号
function phoneNumberReplacer(num) {
  num = new String(num)
  const a = num.replace(/^(\d{3})\d{4}(\d{4})$/, `$1${'*'.repeat(4)}$2`)
  return a.valueOf()
}
let a = phoneNumberReplacer(12345678901)
console.log(a)

// 最长子串-双指针
function longestSubString(str) {
  let ans = 0, left = 0, n = str.length, subStr = ''
  for (let right = 0; right < n; right++) {
    const curLetter = str[right]
    // subStr += curLetter
    if (subStr.includes(curLetter)) {
      const index = subStr.indexOf(curLetter)
      subStr = subStr.slice(index + 1) + str[right]
    } else {
      subStr += curLetter
    }
    ans = Math.max(ans, subStr.length)
  }
  return ans
}
// 是用字典记录
function lengthOfLongestSubstring(str) {
  let start = 0, n = str.length, map = new Map(), ans = 0
  for (let i = 0; i < n; i++) {

    if (map.has(str[i])) {
      console.log('start :>> ', start);
      console.log('map.get(str[i]) :>> ', map.get(str[i]));
      // 因为已保存的重复的位置可能小于当前start的位置
      start = math.max(start, map.get(str[i]) + 1)
    }
    map.set(str[i], i)
    ans = Math.max(ans, i - start + 1)
  }
  return ans
}
console.log(lengthOfLongestSubstring('abba'))

// 二分查找，有序数组的目标值区间
/**
* 思路写一个找到第一个目标值的方法即可，左边可以轻松找到，右边可以通过找target+1的位置来迂回解决，当需要判断找到的位置是否等于target+1，因为可能只是大于
 */
function twoPartSearch(nums, target) {
  function lower_bound(nums, target) {
    let left = 0, right = nums.length - 1
    let middle = Math.floor(right / 2)
    // 当left大于right时，所有范围已经对比过
    while (left <= right) {
      if (nums[middle] < target) left = middle + 1
      else right = middle - 1
      middle = Math.floor((left + right) / 2)
    }
    return left
  }
  const left = lower_bound(nums, target), right = lower_bound(nums, target + 1) - 1
  if (nums[left] === undefined) return [-1, -1]
  if (nums[right] !== target) return [-1, -1]
  return [left, right]
}

// console.log(twoPartSearch([2, 2, 2, 2, 2, 2, 2], 2))

// 判断是否async函数
function isAsync(func) {
  return func[Symbol.toStringTag] === 'AsyncFunction'
  // or
  console.log(Object.prototype.toString.call(func));
  return Object.prototype.toString.call(func) === '[object AsyncFunction]'
}
console.log('isAsync :>> ', isAsync(ccc));
console.log('isAsync :>> ', isAsync(vvv));
console.log('isAsync :>> ', isAsync(kkk));

function getMiniumNum(arr) {
  let left = 0, right = arr.length - 1, ans = -1
  let mid
  while (left + 1 < right) {
    mid = Math.floor((left + right) / 2)
    if (arr[mid] < arr[arr.length - 1]) {
      right = mid
    } else left = mid
  }
  return right
}
console.log(getMiniumNum([3, 4, 0, 1, 2]))
// 反转链表
function reverseList(head) {
  let prev, curr = head, next
  while (curr) {
    // 赋值
    next = curr.next
    curr.next = prev
    // 移动
    prev = curr
    curr = next
  }
  return prev
}


console.log('reverseList :>> ', reverseList(list));

const list = { value: 1, next: { value: 2, next: { value: 3, next: { value: 4, next: { value: 5 } } } } }
/**
 * 反转部分链表，比较好的办法是开头添加一个哨兵节点，用于
 * 1. 直接指向head，记录head
 * 2. 简化链表结构
 * 操作结束后，curr为范围外下一个节点
 * 
 * */
function reverseList(head, left, right) {
  let dummyNode = { next: head }, p0 = { next: head }, curr, prev, next
  // 获取左前一项
  for (let i = 0; i < left - 1; i++) {
    p0 = p0.next
  }
  prev = p0
  curr = p0.next
  for (let i = 0; i <= right - left + 1; i++) {
    // prev = curr
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  // 左一指向原右后一
  p0.next.next = curr
  // 左前一指向右一
  p0.next = prev
  // 直接返回头部节点
  return dummyNode.next
}

console.log('reverseList :>> ', JSON.stringify(reverseList(list, 1, 3)));

// 链表的中间节点
/**
 * 解法快慢指针
 * 奇数个节点时，fast下一个节点指向空，则此时slow指向中间节点
 * 偶数个节点时。fast本身指向空，则测试仪fast指向后面的中间节点
 */
function middlePointOnList() {
  let fast = head, slow = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}
/**
 * 判断链表中是否有环
 * 解法 - 快慢指针
 * 快指针会追上慢指针
 */

function list(head) {
  let slow = fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) { return true }
  }
  return false
}
const cccccc = { next: { next: { cccccc } } }
const head = { value: 1, next: { cccccc } }

console.log(list(head));

/**
 * 删除倒数第n个节点
 * 思路-链表无法获取上一个节点，所以双指针指针一和指针二间隔n个节点，这样右边指针走到最右边时，左指针正好指向该节点
 * 删除的思路：
 * 1、上一个节点直接指向下一个节点（头部需要添加dummyNode）
 * 2、当前节点变为下一个节点，不必改上一个节点的指向(仅在删除节点不是末尾节点的时候可用)
 */

// 不方便仿佛返回开头节点
function deleteOneNode2(head, n) {
  let count = 1, leftPointer = head, rightPointer = head, dummyNode = head
  for (let i = 0; i < n; i++) {
    rightPointer = rightPointer.next
  }
  while (rightPointer.next) {
    rightPointer = rightPointer.next
    leftPointer = rightPointer.next
  }
  leftPointer.next = leftPointer.next.next
  return dummyNode.next
}
function deleteOneNode(head, n) {
  let count = 1, leftPointer = head, rightPointer = head, dummyNode = { next: head }
  while (rightPointer.next) {
    // 不存在是指向最后一个节点
    if (count >= n) leftPointer = leftPointer.next
    rightPointer = rightPointer.next
    count++
  }
  if (leftPointer.next) {
    // 是否末尾节点
    leftPointer.val = leftPointer.next.val
    leftPointer.next = leftPointer.next.next
    // 是末尾节点，需要删除上一个节点的指向
  } else leftPointer = null
  return dummyNode
}
// 删除倒数第n个数
function deleteNthNode(head, n) {
  const dummyNode = { next: head }
  let left = head, right = head
  for (let i = 0; i < n; i++) {
    right = right.next
  }
  while (right.next) {
    left = left.next
    right = right.next
  }
  left.next = left.next.next
  return dummyNode.next
}

// 删除倒数第n个数哈希值记录
function deleteNthNodeWithHash(head, n) {
  const hashMap = new Map(), dummy = { next: head }
  let node = head, count = 0
  while (node) {
    hashMap.set(++count, node)
    node = node.next
  }
  hashMap.get(count - n - 1).next = hashMap.get(count - n + 1)
  return dummy.next
}

// 排序链表删除重复元素
function removeDuplicateNode(head) {

  const hashMap = new Map(), dummy = { next: head }
  let node = head
  while (node) {
    const targetNode = hashMap.get(node.value).value
    if (targetNode && node.value === targetNode.value) targetNode.next = node.next
    else hashMap.set(node.value, node)
    node = node.next
  }
  return dummy.next
}

// 写一个创造死循环的函数
function deadLoopCreator(duration) {
  const timeStamp = Date.now()
  while (Date.now() - timeStamp < duration) { }
}
deadLoopCreator(3000)
console.log('1111 :>> ', 1111);