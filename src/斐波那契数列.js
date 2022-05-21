/*
 * @Description: 😎在这里写你的描述
 * @Autor: 曹老板
 * @Date: 2022-03-21 22:39:26
 * @LastEditTime: 2022-03-29 11:44:30
 */

 // 1,1,2,3,5,8,13,21,34,55

/**
 * 输入一个数字，返回一个斐波那契数列
 * @param num num 
 * @returns num
 */
function foo(num){
if(num===1) return 1
if(num===2) return 1
// 循环第一次和为0
// 2 1
// 3 2
// 4 3
// 5 5
    let num1 = 1 // n-1
    let num2 = 1 // n-2
    let sum = 0
    // 循环的次数是由我决定的，我得知道循环几遍
    for(let i=2;i<num;i++){ 
        sum=num1+num2
        num2=num1
        num1=sum
    }
    return sum
}

console.log(foo(6)); 

