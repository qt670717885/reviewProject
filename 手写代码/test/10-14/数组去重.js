
// 去重

function unique(arr) {
    return Array.from(new Set(arr))
}

function unique(arr) {
    let array = []
    for(let i = 0;i<arr.length;i++){
        if(arr.indexOf(arr[i] === -1)){
            array.push(arr[i])
        }
    }
    return array
}

function unique(arr) {
    return arr.filter((item,index,arr) =>{
        return arr.indexOf(item,0) === index
    })
}