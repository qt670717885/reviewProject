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

function shallowClone(initalObj) {
    var obj = {};
    for (var i in initalObj) {
        obj[i] = initalObj[i];
    }
    return obj;
}

// let newObj, newArr;
// newObj = shallowClone(obj)
// newArr = shallowClone(arr)
// console.log(newArr)
// newObj = Object.assign({}, obj)
// newObj.like.sport1 = '羽毛球'
// newObj.name = 'zh'

// console.log(newObj, obj)

// 深拷贝

function deepClone (obj) {
    if(!obj && typeof obj !== 'object'){
        throw new Error('error arguments')
    }

    const targetObj = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)) {
            if(obj[key] && typeof obj[key] === 'object') {
                targetObj[key] = deepClone(obj[key])
            }else{
                targetObj[key] = obj[key]
            }
        }
    }
    return targetObj
}

let newObj = deepClone(obj)
newObj.like.sport1 = '羽毛球'
console.log(newObj,obj)
let newArr = deepClone(arr)
newArr[4].name = 'zh'
console.log(newArr,arr)