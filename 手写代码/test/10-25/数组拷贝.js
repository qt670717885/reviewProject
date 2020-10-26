function copy(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[i]
    }
    return result
}

// 深拷贝
function deepClone(obj {
    if (!obj && typeof obj !== 'object') {
        throw new Error('error arguments')
    }
    const result = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
        if(obj.hasOwnProperty(key)){
            if(obj[key] && typeof obj[key] === 'object'){
                result[key] = deepClone(obj[key])
            }else{
                result[key] = obj[key]
            }
        }
    }
    return result
}

function deepClone(obj) {
    if(!obj && typeof obj !== 'object') {
        throw new Error('error arguments')
    }
    const result = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(obj[key] && typeof obj[key] === 'object'){
                result[key] = deepClone(obj[key])
            }else{
                result[key] = obj[key]
            }
        }
    }
    return result
}