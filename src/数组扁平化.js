/*
 * @Description: 😎在这里写你的描述
 * @Autor: 曹老板
 * @Date: 2022-03-22 08:59:12
 * @LastEditTime: 2022-03-22 09:29:45
 */

// [1,2,[3,[4]]]

const arr = [1,2,[3,[4,[5,'a']]]]



/**
 * 数组扁平化,深度扁平化
 * @param {arr} arr 
 * @returns arr
 */
function foo(arr,filterArr = []){
    for(let i =0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            foo(arr[i],filterArr)
        }else{  
            filterArr.push(arr[i])
        }
    }
    return filterArr
} 
console.log(foo(arr)); 



const brr = [1,2,[3,[4]]]
/**
 * 单层数组扁平化,注意concat返回一个新数组
 * @param {*} arr 
 * @returns arr
 */
function foo2(arr){
    let res = []

    arr.forEach(item => {
      res= res.concat(item)
    });

    return res
}

console.log(foo2(brr));