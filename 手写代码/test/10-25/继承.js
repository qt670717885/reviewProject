function Father(name) {
    this.name = name
    this.say = function () {
        console.log(`hellow ${name}`)
    }
}

// 原型链继承

function Child(age) {
    this.age = age
}

Child.prototype = new Father('qt')

// 借用构造函数

function Child(name, age) {
    this.age = age
    Father.call(this, name)
}

// 组合继承

function Child3(name, age) {
    Father.call(this, name)
    this.age
}

Child3.prototype = new Father('qtt')
Father.prototype.constructor = Child3

// 组合寄生继承

function Child4(name, age) {
    Father.call(this, name)
    this.age
}

function createFn(Father, Child) {
    const o = Object.create(Father.prototype)
    o.constructor = Child
    return 0
}
createFn(Father,Child4)