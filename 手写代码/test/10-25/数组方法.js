
Array.prototype._push = function () {
    let arr = this
    if (!Array.isArray(arr)) throw new Error('not Array')
    let arg = [...arguments]
    let arrL = arg.length
    if(arrL === 0){
        return arr.length
    }
    for(let i = 0;i<arrL.length;i++){
        arr[arr.length++]  = arg[i]
    }
    return arr.length
}

