


function Father(name) {
    this.name = name
    this.say = function () {
        console.log('hello world')
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
function Child(age) {
    this.age = age
}

Child.prototype = new Father('qqq')
let q = new Child(18)
console.log(q.name,q.age)

// 借助构造函数

/**
 * 优点 ：
 * 1.解决了子类构造函数向父类构造函数中传递参数
 * 2.可以实现多继承（call或者apply多个父类）
 * 缺点：
 * 1.方法都在构造函数中定义，无法复用	
 * 2.不能继承原型属性/方法，只能继承父类的实例属性和方法
 */

function Child2(name,age) {
    Father.call(this,name)
    this.age = age
}

let people2 = new Child2('qt',18)
console.log(people2.name,people2.age)

//组合继承
/**
 * 优点：
 * 1.函数可以复用
 * 2.不存在引用属性问题
 * 3.可以继承属性和方法，并且可以继承原型的属性和方法
 * 缺点：
 * 需要调用两次父类
 */
function Child3 (name,age){
    Father.call(this,name)
    this.age = age
}

Child3.prototype = new Father('qttt')
Father.prototype.constructor = Father
let people3 = new Child3('qttt',18)
console.log(people3.name,people3.age,people3.__proto__)

// 组合寄生继承
function Child4(name,age){
    Father.call(this,name)
    this.age = age
}

function createFn(Father,child){
    let o = Object.create(Father.prototype)
    o.constructor = child
    child.prototype = o
}
createFn(Father,Child4)
let people4 = new Child4('qtttt',18)
console.log(people4.name,people4.age)
people4.say()


