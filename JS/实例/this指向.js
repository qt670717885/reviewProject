// 第一种：构造函数
class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

const obj = new People('qt', 18)
console.log(obj.name) // qt

// 第二种：直接调用
function fn() {
    console.log(this)
}
fn() // window

// 第三种： 箭头函数
let name = 'qt'

function fun() {
    let name = "qt1"
    return () => {
        let name = 'qt22'
        console.log(this.name) //qt
        return () => {
            let name = 'qt33'
            console.log(this.name) //qt
        }
    }
}
fun()()()
