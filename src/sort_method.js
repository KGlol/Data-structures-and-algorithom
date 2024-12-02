/**
 * @description: 几种简单排序算法算法的练习
 */

// 1. 冒泡(O(n*n))
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++)
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j] + arr[j + 1]
        arr[j + 1] = arr[j] - arr[j + 1]
        arr[j] = arr[j] - arr[j + 1]
      }
  }
  return arr
}

// 冒泡
function BubbleSort2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

// 重点：快排，每次去一个项将剩下的部分分为大小两边进行排序(O(logn))
function quickSort(arr) {
  function sort(a) {
    if (a.length <= 1) return a
    const mid = a[0], left = [], right = []
    for (let i = 1; i < a.length; i++) {
      if (a[i] < mid) left.push(a[i])
      else right.push(a[i])
    }
    return [...sort(left), mid, ...sort(right)]
  }
  return sort(arr)
}

// 快排
function quickSort1(arr) {
  function sortMethod(arrPart) {
    if (arrPart.length <= 1) return arrPart
    const middle = arrPart[0], left = [], right = []
    for (let i = 0; i < arrPart.length; i++) {
      (arrPart[i] >= middle) && right.push(arrPart[i]);
      (arrPart[i] < middle) && left.push(arrPart[i]);
    }
    return [...sortMethod(left), middle, ...sortMethod(right)]
  }
}

const a = [2, 3, 4, 5, 6, 1, 2, 3, 4]
console.log('quickSort(a) :>> ', quickSort(a));
// console.log('bubbleSort(a) :>> ', bubbleSort(a));

// 选择排序，每次循环找出最小的数放在最前面O(n*n)
// 选择排序
function selectSort(arr) {
  let minIndex
  for (let i = 0; i < arr.length; i++) {
    minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    if (i !== minIndex) {
      let temp
      temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
    }
  }
  return arr
}
// console.log(selectSort([7, 6, 5, 4, 3, 2, 2, 1, 2, 2, 2]));

// 插入排序（维护一个有序数组，依次从原数组插入）O(n*n)
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {

    // let j = i - 1, k = arr[i]
    // while (arr[j] > k && j >= 0) {
    //   arr[j + 1] = arr[j]
    //   j--
    // }
    // arr[j + 1] = k
  }
  return arr
}

console.log(insertSort([1, 4, 3]))

// 二分查找（非排序）（O(nlogn)）有序的
function binarySearch(num, arr) {
  const len = arr.length
  function search(start, end) {
    if (start > end) return
    const mid = Math.floor(start + end / 2)
    if (arr[mid] === num) {
      return mid
    }
    if (arr[mid] < num) {
      return search(mid + 1, end)
    } else { return search(start, mid - 1) }
  }
  return search(0, len - 1)
}
const k = [1, 2, 3, 4, 4, 4, 5, 4, 4, 6, 76]
console.log('binarySearch() :>> ', binarySearch(4, k));


function binarySearch(target, arr) {
  const len = arr.length
  function search(start, end) {
    if (start > end) return
    let mid = Math.floor((start + end) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] > num) {
      return search(mid + 1, end)
    }
    if (arr[mid] < num) {
      return search(start, mid - 1)
    }
  }
  return search(0, len - 1)
}
console.log(0 === -0);

// 找出数组最大值
function findMaxium(arr) {
  return arr.reduce((prev, curr) => Math.max(prev, curr))
}

// quchong
const aaaaa = [1, 2, 3, 4, 5, 1, 2, 3, 4].reduce((prev, curr, index) => {
  if (!prev.includes(curr)) prev.push(curr)
  return prev
}, [])

// 合并数组
const kkk = [1, 2, 3]
console.log(Array.prototype.push.apply(kkk, [4, 5, 6]))
console.log(kkk);

for (const key of 'string') {
  console.log(key);
}
