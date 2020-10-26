function Father(name) {
    this.name = name
    this.say = function () {
        console.log(` Hello World ,Hello ${this.name} `)
    }
}

// 原型链继承
/**
 * 优点：
 * 实现简单，父类新增实例与属性子类都能访问
 * 缺点：
 * 1.子类更改父类继承过来的属性，会影响其他实例
 * 2.创建子类的时候，没有办法在不影响其他实例的情况下想父类的构造函数传参
 * 3.无法实现多继承
 * 4.创建子类实例时，不能向父类构造函数中传参数
 */
function Child1(age) {
    this.age = age
}

Child1.prototype = new Father('qt')
const child1 = new Child1(18)
console.log(child1.name, child1.age)
child1.say()

// 借用构造函数继承
/**
 * 优点 ：
 * 1.解决了子类构造函数向父类构造函数中传递参数
 * 2.可以实现多继承（call或者apply多个父类）
 * 缺点：
 * 1.方法都在构造函数中定义，无法复用	
 * 2.不能继承原型属性/方法，只能继承父类的实例属性和方法
 */

function Child2(name, age) {
    Father.call(this, name)
    this.age = age
}

let child2 = new Child2('qtt', 18)
console.log(child2.name, child2.age)
child2.say()

// 组合继承
/**
 * 优点：
 * 1.函数可以复用
 * 2.不存在引用属性问题
 * 3.可以继承属性和方法，并且可以继承原型的属性和方法
 * 缺点：
 * 需要调用两次父类
 */

function Child3(name, age) {
    Father.call(this, name)
    this.age = age
}

Child3.prototype = new Father('qttt')
Father.prototype.constructor = Child3
let child3 = new Child3('qttt',18)
console.log(child3.name, child3.age)
child3.say()

// 组合寄生继承
function Child4(name,age){
    Father.call(this,name)
    this.age  = age
}

function createfn ( father , child ){
    let o = Object.create(father.prototype)
    o.constructor = child
    child.prototype = o
}

createfn(Father,Child4)

let child4 = new Child4('qtttt',18)
console.log(child4.name, child4.age,child4)
child4.say()