// 模板
let obj = {
    name: 'qt',
    age: 18,
    like: {
        sport1: '篮球',
        sport2: '足球',
        eat: {
            food1: '饭',
            food2: '菜',
            food3 : function () { console.log('eat') }
        }
    }
}

let arr = [1, 2, 3, [5, 6],{name : 'qt'}]

// 浅拷贝

function shailowClone(obj) {
    let new_obj = {}
    for(let i in obj){
        new_obj[i] = obj[i]
    }
    return new_obj
}

// 深拷贝

function deepClone(obj) {
    if(!obj && typeof obj !== 'obj'){
        throw new error('error')
    }
    const targetObj = Array.isArray(obj) ? [] : {}
    for(let key in arr){
        if(obj.hasOwnProperty(key)) {
            if(obj[key] && typeof obj[key] === 'object' ) {
                targetObj[key] = deepClone(obj[key])
            }else{
                targetObj[key] = obj[key]
            }
        }
    }
    return targetObj
}