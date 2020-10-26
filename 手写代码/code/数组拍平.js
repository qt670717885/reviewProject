// 数组扁平化

let arr = [1,2,3,[4,[5,6]]]

// 方法一
const handle = array => JSON.parse(`[${JSON.stringify(array).replace(/\[|]/g,'')}]`)
handle(array)   // [ 1, 1, 2, 3, 1, 2, {} ]
// 方法二
let flatArr = (arr) => {
    return arr.reduce((flat,toFlat)=>{
        return flat.concat(Array.isArray(toFlat) ? flatArr(toFlat) : toFlat)
    },[])
}

let newarr = flatArr(arr)
console.log(newarr)