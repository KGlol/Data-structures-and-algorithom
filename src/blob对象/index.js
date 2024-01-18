// /*
//  * @Description: 😎在这里写你的描述
//  * @Autor: 曹老板
//  * @Date: 2022-03-31 09:47:52
//  * @LastEditTime: 2023-10-22 18:32:01
//  */

// const str = '<div>哈哈</div>'

// const blob = new Blob([str], {
//   type: 'text/html'
// })

// input.onchange = (e) => {
//   const file = e.target.files[0]
//   const img = new Image()
//   const srcImg = URL.createObjectURL(file)
//   console.log("🤡 ~~ srcImg", srcImg)
//   img.src = srcImg
//   document.body.appendChild(img)
// }

// input.onchange = (e) => {
//   const file = e.target.files[0]

//   const img = new Image()
//   const fileReader = new FileReader()

//   fileReader.readAsDataURL(file)

//   fileReader.onload = function () {
//     const src = fileReader.result
//     img.src = src
//   }
//   document.body.appendChild(img)
// }

console.log('this :>> ', this);