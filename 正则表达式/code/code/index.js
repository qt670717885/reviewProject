const reg = /(?=(\B)(\d{3})+$)/g ///(?=(\B)(\d{3})+$)/g;


let num = '1000000'

console.log(num.replace(reg,'，'))
