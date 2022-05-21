

 
/**
 * 旋转数组，使用pop和unshift,时间复杂度O(n^2)
 * @param arr arr
 * @param k k
 * @returns arr
 */
 export function rotate1(arr:number[],k:number):number[]{
    if(k<0){
       throw new Error('k值不能为0')
    }
    // O(n)
    for(let i=0;i<k;i++){
      const a=  arr.pop()
      if(a){
         arr.unshift(a) // 数组是一个有序结构，unshif操作是非常慢的 O(n)
      }
    }  
    return arr
 }
 
 /**
  * 旋转数组，使用concat ,时间复杂度O(1)
  * @param arr arr
  * @param k k
  * @returns arr
  */
  export function rotate2(arr:number[],k:number){
    if(k<0){
       throw new Error('k值不能为0')
    }
    const p1 = arr.slice(-k)
    const p2 = arr.slice(0,k+1)  
    return [...p1,...p2]
 }
 
 
//  console.log(rotate1([1,2,3,4,5,6,7],3));
 // console.log(rotate2([1,2,3,4,5,6,7],3));


 


 // 性能测试
 const arr1:number[] = []
 for(let i=0;i<1000000;i++){
     arr1.push(i)
    }

console.time('rotate1')
rotate1(arr1,1000) // rotate1: 421.188ms
console.timeEnd('rotate1')

console.time('rotate2')
rotate2(arr1,1000) // rotate2: 0.09ms
console.timeEnd('rotate2')


 