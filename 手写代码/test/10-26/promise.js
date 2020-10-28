class MyPromise {
    constructor(excutor) {
        this.state = 'pendding'
        this.value = value // 成功的值
        this.reson = reson // 失败的值
        this.resolveCallback = [] // 成功时的回调
        this.rejectCallback = []
        let resolve = value => {
            setTimeout(() => {
                if (this.status === 'pending') {
                    this.state = 'onfullfilled'
                    this.value = this.value
                    this.resolveCallback.forEach(fn => fn)
                }
            }, 0)
        }
        let reject = reson => {
            setTimeout(reson => {
                if (this.status === 'pending') {
                    this.state = 'rejected'
                    this.reson = 'reson'
                    this.rejectCallback.forEach(fn => fn)
                }
            }, 0)
        }
        try {
            excutor(resolve, reject)
        }
        cache(error) {
            reject(error)
        }
    }
    then(onfullfilled, rejected) {
        if (this.state === = 'onfullfilled') {
            return new MyPromise((resolve, reject) => {
                let res = onfullfilled(this.value)
                if (res instanceof MyPromise) {
                    res.then(resolve, reject)
                } else {
                    resolve(res)
                }
            })
        }
        if (this.state === 'rejected') {
            return new MyPromise((resolve, reject) => {
                let res = rejected(this.reson)
                if (res instanceof MyPromise) {
                    res.then(resolve, reject)
                } else {
                    reject(res)
                }
            })
        }
        if (this.state === 'pending') {
            return new MyPromise((resolve, reject) => {
                this.resolveCallback.push(() => {
                    let res = onfullfilled(this.value)
                    if (res instanceof MyPromise) {
                        res.then(resolve, reject)
                    } else {
                        resolve(res)
                    }
                })
                this.rejectCallback.push(() => {
                    let res = rejected(this.reson)
                    if (res instanceof MyPromise) {
                        res.then(resolve, reject)
                    } else {
                        reject(res)
                    }
                })
            })
        }
    }
    static resolve(value) {
        return new MyPromise((resolve,reject)=>{
            resolve(value)
        })
    }
    static reject(value){
        return new MyPromise((resolve,reject)=>{
            reject(value)
        })
    }
    static race(promise){
        return new MyPromise((resolve,reject)=>{
            promise.forEach(item=>{
                item.then(resolve,reject)
            })
        })
    }
    static all(promise){
        let result = []
        let index = 0
        function processFn (index,data) {
            result[index] = data
            if(index === promise.length){
                resolve(result)
            }
        }
        return new MyPromise((resolve,reject)=>{
            for(let i = 0;i<promise.length;i++){
                promise[i].then(data=>{
                    processFn(i,data)
                },reject)
            }
        })
    }
}