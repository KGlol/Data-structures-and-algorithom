/**
 * @description: 数组两数之和
 * @param {number} target
 * @param {array} arr
 * @return {*array}
 */
function targetSumPosition(target, arr) {
  const resPosition = []
  for (let i = 0; i < arr.length; i++) {
    let j = i + 1;
    while (j < arr.length) {
      if (arr[j] + arr[i] === target) {
        resPosition.push([i, j])
      }
      j++
    }
  }
  return resPosition
}

console.log(targetSumPosition(5, [1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 7]));


console.log([1, 2, 3, 1].findIndex((num, index) => num === 1))

// leetcode高分解法
// ! 直接使用obj键值对做字典O(n),牛
function twoSum2(nums, target) {
  const obj = {}
  let i = 0
  while (i < nums.length) {
    if (obj[target - nums[i]] !== undefined) {
      return [i, obj[target - nums[i]]]
    } else {
      obj[nums[i]] = i
    }
    i++
  }
}

console.log(twoSum2([1, 2, 3, 4, 5, 6, 7], 6));
// 参考：https://leetcode.cn/problems/two-sum/?envType=study-plan-v2&envId=top-100-liked


var twoSum = function (nums, target) {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    if (obj[target - nums[i]] !== undefined) {
      return [i, obj[target - nums[i]]];
    }
    else {
      obj[nums[i]] = i;
    }
  }
};
console.time();
console.log(twoSum([2, 7, 11, 15], 9));
console.timeEnd();
console.time()
console.log(twoSum2([2, 7, 11, 15], 9));
console.timeEnd();

// 拓展：三个数呢

/**
 * @description: 最短子序列（求和大于等于target）
 * @param {*} arr
 * @param {*} target
 * @return {*}
 */
// 滑动窗口（双指针）
function shortestSubArrLen(arr, target) {
  let left = 0, sum = 0, ans = arr.length + 1
  for (let right = 0; right < arr.length; ++right) {
    sum += arr[right]
    while (sum >= target) {
      ans = Math.min(right - left + 1, ans)
      sum -= arr[left++]
      if (ans === 1) return 1
    }
  }
  return ans <= arr.length ? ans : 0
}

console.log(shortestSubArrLen([0, 2, 3, 4, 5, 6, 10], 10))

// 最长子字符串(includes或map字典)
function maxSubString(s) {
  let len = 0, n = s.length, subStr = ''
  for (let right = 0; right < n; right++) {
    if (!subStr.includes(s[right])) {
      subStr += s[right]
      len = Math.max(subStr.length, len)
    } else {
      const duplicateIndex = subStr.indexOf(s[right])
      subStr = subStr.slice(duplicateIndex + 1) + s[right]
    }
  }
  return len
}

console.log(maxSubString('dvdf'))
// console.log(maxSubString('qwerty'))
console.log('awazesxrctvygbhujiko'.length)

/**
 * @description 最长子串字典
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let start = 0, n = s.length, map = new Map(), ans = 0
  for (let i = 0; i < n; i++) {
    if (map.has(s[i])) {
      // ! map的问题是，还会有之前已经在范围之外的位置，这个问题要处理,abba
      start = Math.max(start, map.get(s[i]) + 1)
      // start = map.get(s[i]) + 1
    }
    map.set(s[i], i)
    ans = Math.max(ans, i - start + 1)
  }
  return ans
};
console.log(lengthOfLongestSubstring('abba'));
// console.log(lengthOfLongestSubstring('qwq'));

function lengthOfLongestSubString2(s) {
  let start = 0, map = new Map(), n = s.length, ans = 0
  for (let i = 0; i < n; i++) {
    if (map.get(s[i])) {
      start = Math.max(start, map.get(s[i]))
    }
    map.set(s[i], i)
    ans = Math.max(ans, i - start + 1)
  }
  return ans
}

// 三数之和
// 思路：先排序，再双指针找出所有两数和
function threeSumZero(nums = []) {
  const n = nums.length, ans = []
  let left = 0, right = n - 1
  // 排序
  const sortedNums = nums.sort((a, b) => a - b)
  // 双指针查找
  for (let i = 0; i < n - 2; i++) {
    left = i + 1
    right = n - 1
    while (
      left < right
      && sortedNums[i] !== sortedNums[i - 1]
    ) {
      const sum = sortedNums[i] + sortedNums[left] + sortedNums[right]
      if (sum > 0) right--
      else if (sum < 0) left++
      else {
        ans.push([sortedNums[i], sortedNums[left], sortedNums[right]])
        while (sortedNums[left] === sortedNums[left + 1]) {
          left++
        }
        left++
        while (sortedNums[right] === sortedNums[right - 1]) {
          right--
        }
        right--
      }
    }
  }
  return ans
}

console.log(threeSumZero([6, -2, -4, 1, 2, -3, 4, -3, 6]));
[-3, -3, 1, 2, 4, 6, 6]

var threeSum = function (nums) {
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};

/**
 * @description: 四数之和
 * @return {*}
 */


// 贪心算法，分饼干O(nlogn)
function cookieSplit(s = [], c = []) {
  sSorted = s.sort((a, b) => a - b);
  cSorted = c.sort((a, b) => a - b);
  let j = cSorted.length - 1, result = 0
  for (let i = s.length - 1; i >= 0; i--) {
    // console.log(j, sSorted[i], cSorted[j]);
    if (j >= 0) {
      while (sSorted[i] < cSorted[j]) {
        j--
      }
      if (sSorted[i] >= cSorted[j]) {
        j--
        result++
        // continue
      }
    }
  }
  return result
}

console.log(cookieSplit([1, 3, 8, 9], [1, 2, 7, 10]));

// 有效括号，栈解法
function isValid(str) {
  if (str.length % 2 === 1) return false
  const stack = [], leftPart = ['(', '[', '{'], rightPart = [')', ']', '}']
  for (const value of str) {
    // console.log(key);
    if (leftPart.includes(value)) { stack.push(value) }
    else {
      if (leftPart.indexOf(stack.pop()) !== rightPart.indexOf(value)) return false
    }
  }
  return leftPart.length === 0
}
console.log(isValid('{}(){}[[]]'));
