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

const a = [2, 3, 4, 5, 6, 1, 2, 3, 4]
console.log('quickSort(a) :>> ', quickSort(a));
// console.log('bubbleSort(a) :>> ', bubbleSort(a));

// 选择排序，每次循环找出最小的数放在最前面O(n*n)
function selectSort(arr) {
  const len = arr.length
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i]
    for (let j = len - 1; j >= i; j--) {
      min = Math.min(arr[j], min)
    }
    arr[i] = min
  }
  return arr
}

console.log(selectSort(a))

// 插入排序（维护一个有序数组，依次从原数组插入）
function insertSort(arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <= res.length; j++) {

    }
  }

}

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
