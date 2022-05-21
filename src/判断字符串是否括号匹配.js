
 // a(b)s  {a(2)3} (23[ {2(3}2)

/**
 * 通过计算进栈和匹配出栈，计算数组的长度
 * @param  str string
 * @returns boolean
 */
 function foo(str){
    let length = str.length
    if(length ===0) return true

    let arr = []
    let leftBracket = '{[('
    let rightBracket = '}])'
    for(let i =0;i<length;i++){
        if(leftBracket.includes(str[i])){
            arr.push(str[i])
        }else if(rightBracket.includes(str[i])){
            const top = arr[arr.length-1]
            if((top==='('&&str[i]===')')||(top==='{'&&str[i]==='}')||(top==='['&&str[i]===']')){
                arr.pop()
            }else{
                return false
            }
        }
    }
    return arr.length==0
 }

 console.log(foo('{1(2)3}'));
  


