// js面向对象继承



// function People(name) {
//     this.name = name
//     this.say = function () {
//         console.log('hello')
//     }
// }

// // 01.原型链继承

function Child1(age) {
    this.age = age
}

Child1.prototype = new People('xiaoming')
let xiaoming = new Child1(18)
console.log(xiaoming.name, xiaoming.age) // xiaoming 18

// // 02. 借用构造函数

function Child2(name, age) {
    People.call(this, name)
    this.age = age
}

let xiaomei = new Child2('xiaomei', 18)
console.log(xiaomei.name, xiaomei.age) // xiaoming 18

// // 03. 组合继承

function Child3(name, age) {
    this.age = age
    People.call(this, name) // 第一次调用
}
Child3.prototype = new People('xiaoming')
People.prototype.constructor = People
let xiaoming2 = new Child3('xiaoming', 18)
console.log(xiaoming2.name, xiaoming2.age) // xiaoming 18

// 原型式继承
方式1
function object(o) {
    var F = function () {}
    F.prototype = o
    return new F()
}
var person2 = object(obj)
// 方式2
var person1 = Object.create(obj, {
    name: {
        value: 'person1'
    }
})

// // 寄生式继承

let obj = {
    name: '小明',
    age: 18,
    like: ['吃饭', '睡觉']
}

function createFn(ob) {
    let o = Object.create(ob)
    o.sayHi = function () {
        console.log('hi')
    }
    return o
}

let child4 = createFn(obj)
console.log(child4.name,child4.age)

// // 寄生组合继承
// //父类方法
People.prototype.eat = function () {
    console.log('吃饭')
}
//子类
function  Man(name,age) {
    People.call(this,name)
    this.age = age
}

//继承父类的方法
function  createFn(father,child) {
    let o = Object.create(father.prototype)
    console.log(o)
    o.constructor = child
    child.prototype = o
}
createFn(People, Man)
let person1 = new Man('xiaoming',18)
console.log(person1.name,person1.age)

// es6继承

class People {
    constructor(name ,age){
        this.name = name
        this.age = age
    }
    like () {
        console.log('吃饭','睡觉')
    }
}c

class Man extends People {
    constructor(name,age){
        //继承父类属性
        super(name,age)
    }
    like () {
        super.like()
    }
}

let people = new Man('xiaoming',18)
console.log(people.name,people.age)
people.like()