// class Promise {

//     constructor(excutor) {
//         this.state = 'pending' // 初始化状态
//         this.value = undefined // 成功时候的值
//         this.reson = undefined // 失败时候的值 
//         this.onResolvedCallback = [] // 存储成功数组
//         this.onrejectedCallback = []
//         let resolve = value => {
//             if (this.state === 'pending') {
//                 this.state = 'fullfilled'
//                 this.value = value
//                 // 一旦resolve执行，调用成功数组的函数
//                 this.onResolvedCallbacks.forEach(fn => fn());
//             }
//         }
//         let reject = reson => {
//             if (this.state === 'pending') {
//                 this.state = 'rejected'
//                 this.reson = reson
//                 this.onrejected.forEach(fn => fn())
//             }
//         }
//         // 如果excuter报错，直接执行rejected
//         try {
//             excutor(resolve, reject)
//         } catch (err) {
//             reject(err)
//         }
//     }
//     then(onfullfilled, onrejected) {
//         let promise2 = new Promise((resolve, reject) => {
//             if (this.state === 'fullfilled') {
//                 let x = onfullfilled(this.value)

//             }
//             if (this.state === 'rejected') {
//                 onrejected(this.reson)
//             }
//             if (status === 'pendding') {
//                 this.onResolvedCallbacks.push(() => {
//                     onfullfilled(this.value)
//                 })
//                 this.onrejectedCallback.push(() => {
//                     onrejected(this.reson)
//                 })
//             }
//         })

//     }
// }

class myPromise {
    constructor(excutor) {
        this.state = 'pening'
        this.value = undefined //成功时候的值
        this.reson = undefined // 失败时候的值
        this.onresolveCallback = []
        this.onrejectCallback = []
        let resolve = value => {
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'onfullfilled'
                    this.value = value
                    this.onresolveCallback.forEach(fn => fn())
                }
            }, 0)

        }
        let reject = reson => {
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'rejected'
                    this.reson = reson
                    this.onrejectCallback.forEach(fn => fn())
                }
            }, 0)
        }
        try {
            excutor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then(onFullfilled, onrejected) {
        if (this.state === 'onfullfilled') {
            return new myPromise((resolve, reject) => {
                let res = onFullfilled(this.value)
                if (res instanceof MyPromise) {
                    res.then(resolve, reject)
                } else {
                    resolve(res)
                }
            })
        }
        if (this.state === 'rejected') {
            return new Promise((resolve, reject) => {
                let res = onrejected(this.reson)
                if (res instanceof MyPromise) {
                    res.then(resolve, reject)
                } else {
                    reject(res)
                }
            })
        }
        if (this.status == "padding") {
            return new MyPromise((resolve, reject) => {
                this.onresolveCallback.push(() => {
                    let res = onFullfilled(this.value)
                    if (res instanceof MyPromise) {
                        res.then(resolve, reject)
                    } else {
                        resolve(res)
                    }
                })
                this.onrejectCallback.push(()=>{
                    let res = onrejected(this.reson)
                    if(res instanceof MyPromise){
                        res.then(resolve,reject)
                    }else{
                        reject(this.reson)
                    }
                })
            })
        }
    }
    static resolve(val) {
        return new MyPromise((resolve,reject)=>{
            resolve(val)
        })

    }
    static reject(val){
        return new MyPromise((resolve,reject)=>{
            reject(val)
        })
    }
    static race(arr){
        return new Promise((resolve,reject)=>{
            for(let i = 0;i<arr.length;i++){
                arr[i].then(resolve,reject)
            }
        })
    }
    static all(arr) {
        let result = []
        let i = 0
        function processData(index,data) {
            result[index] = data
            i++
            if(i === arr.length){
                resolve(result)
            }
        }
        return new Promise((resolve,reject)=>{
            for(let i = 0;i<arr.length;i++){
                arr[i].then(data=>{
                    processData(i,data)
                },reject)
            }
        })
    }
}