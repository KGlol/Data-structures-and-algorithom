/*
 * @Description: 😎在这里写你的描述
 * @Autor: 曹老板
 * @Date: 2022-03-28 08:46:32
 * @LastEditTime: 2022-03-28 09:35:03
 */






function foo<T extends string>(parms:T):Object{
    if(!parms){
        return {}
    }

   const parmsArr = parms.split('&')
   const mapParmsArr:any= {}
    parmsArr.forEach(item=>{
       const [key,value] = item.split('=')
    mapParmsArr[key] = value
   })
   console.log(mapParmsArr);
   
   return mapParmsArr
}

foo('a=1&b=2&c=3')
 


function getValue<T,K extends keyof T>(o:T , key: K) {
    return o[key];
  }
  const obj1 = { name: '张三', age: 18 };
  const nameS = getValue(obj1, 'name');