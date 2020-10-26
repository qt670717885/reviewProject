
// 观察者
class Observe {
    constructor(name,subject) {
        this.name = name
        this.subject = subject
        this.subject.attch(this)
    }
    update() {
        console.log(`${this.name} update`)
    }
}

// 主题
class subject {
    constructor(){
        this.state = 0
        this.observer = []
    }
    getState() {
        return this.state
    }
    setState(state){
        this.state = state
        this.notify()
    }
    attch(observer){
        this.observer.push(observer)
    }
    notify(){
        this.observer.forEach(observer=>{
            observer.update()
        })
    }
}