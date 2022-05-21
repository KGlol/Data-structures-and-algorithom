/*
 * @Description: 😎在这里写你的描述
 * @Autor: 曹老板
 * @Date: 2022-03-22 09:35:38
 * @LastEditTime: 2022-03-25 11:49:09
 */
// const num = 233000




/**
 * 找出重复的元素
 */
let a = [1,1,1,2,2,3,"a","b","a"];
let b = []
for(let i=0;i<a.length;i++){
    for(let j = i+1;j<a.length;j++){
        if(a[i] === a[j] && b.indexOf(a[j])){
            b.push(a[j])
        }
    }
}
console.log(b);
const c = a.filter(item=>{
    return b.indexOf(item)==-1
})
console.log(c);



// 找不同
// function getArrDifference(arr1, arr2) {
//     return arr1.concat(arr2).filter(function(v, i, arr) {
//         return arr.indexOf(v) === arr.lastIndexOf(v);
//     });
// };
// // 找重复
// function getArrRepeat(arr) {
//     let obj = {};
//     for (let i in arr) {
//         if(obj[arr[i]]) {
//             return true;
//         }
//         obj[arr[i]] = true;
//     }
//     return false;
// };