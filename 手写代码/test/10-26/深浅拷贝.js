function clone (arr) {
    let result
    Array.isArray(arr) ? result = [] : result = {}
    for(let item in arr){
        if(arr.hasOwnProperty(item)) {
            result[item] = arr[item]
        }
    }
    return item
}

function deepClone (arr) {
    let result = Array.isArray(arr) ? [] : {}
    for(let key in arr){
        if(arr.hasOwnProperty(key)){
            if(arr[key] && typeof arr[key] === 'object') {
                result[key] = deepClone(arr[key])
            }
        }else{
            result[key] = arr[key]
        }
    }
    return result
}