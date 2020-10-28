function unique (arr) {
    return [...new Set(arr)]
}

function unique(arr) {
    return arr.filter((item,index,arr)=>{
        return arr.indexOF(item,0) === index
    })
}