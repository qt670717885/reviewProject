//1. 创建Promsie一个参数，参数接收resolve,reject两个参数
//2. 添加三个状态pending,fullfilled,rejected,pending为初始化状态，可转化为fullfilled状态与rejected状态
//   成功时，不可转为其他状态，且必须有一个不可改变的值（value）,失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
//   若是executor函数报错 直接执行reject();
//3. then方法，里面有两个参数，onFulfilled,onRejected,成功有成功的值，失败有失败的原因
//   当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.value
//   onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数
//4. 现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
//5. 解决链式调用
// class Promise {
//     constructor(excutor) {
//         this.state = 'pending' // 初始化状态
//         this.value = undefined // 成功时的值
//         this.reason = undefined // 失败时的值
//         this.onResolvedCallbacks = [] // 成功存放的数组
//         this.onRejectedCallbacks = [] // 失败存放的数组
//         let resolve = value => {
//             // state改为fullfilled
//             if (this.state === 'pending') {
//                 this.state = 'fullfilled'
//                 this.value = value
//                 this.onResolvedCallbacks.forEach(fn => fn())
//             }
//         }
//         let reject = reason => {
//             // state改为rejected
//             if (this.state === 'pending') {
//                 this.state = 'rejected'
//                 this.reason = reason
//                 this.onRejectedCallbacks.forEach(fn => fn())
//             }
//         }
//         // 如果excuter报错，直接执行rejected
//         try {
//             excutor(resolve, reject)
//         } catch (err) {
//             reject(err)
//         }

//     }
//     // 接收两个参数onfullfilled,onRejected
//     /**
//      * 解决异步实现
//         现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
//      * 
//     */
//     then(onfullfilled, onRejected) {
//         // 声明返回的promise 
//         let promise2 = new Promise((resolve, reject) => {
//             // 判断state
//             if (this.state === 'fullfilled') {
//                 setTimeout(() => {
//                     try {
//                         let x = onFulfilled(this.value);
//                         // resolvePromise函数，处理自己return的promise和默认的promise2的关系
//                         resolvePromise(promise2, x, resolve, reject);
//                     } catch (e) {
//                         reject(e)
//                     }
//                 }, 0)

//             }
//             if (this.state === 'rejected') {
//                 setTimeout(() => {
//                     try {
//                         let x = onRejected(this.reason)
//                         resolvePromise(promise2, x, resolve, reject);
//                     } catch (e) {
//                         reject(e);
//                     }

//                 }, 0)

//             }
//             // 当状态为pending时
//             if (this.state === 'pending') {
//                 this.onResolvedCallbacks.push(() => {
//                     setTimeout(() => {
//                         try {
//                             let x = onFulfilled(this.value);
//                             resolvePromise(promise2, x, resolve, reject);
//                         } catch {
//                             reject(e)
//                         }
//                     }, 0)


//                 })
//                 // onRejected传入到失败数组
//                 this.onRejectedCallbacks.push(() => {
//                     setTimeout(() => {
//                         try {
//                             let x = onRejected(this.reason);
//                             resolvePromise(promise2, x, resolve, reject);
//                         } catch (e) {
//                             reject(e)
//                         }
//                     }, 0)

//                 })
//             }
//         })
//         return promise2
//     }
//     catch (fn) {
//         return this.then(null, fn);
//     }
// }

//规定了一段代码，让不同的promise代码互相套用，叫做resolvePromise
//如果 x === promise2，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误
/**
 * x 不能是null
 * x 是普通值 直接resolve(x)
 * x 是对象或者函数（包括promise），let then = x.then 2、当x是对象或者函数（默认promise）
 * 声明了then
 * 如果取then报错，则走reject()
 * 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
 * 如果成功的回调还是pormise，就递归继续解析 3、成功和失败只能调用一个 所以设定一个called来防止多次调用
 */

// function resolvePromise(promise2, x, resolve, reject) {
//     // 循环引用报错
//     if (x === promise2) {
//         // reject报错
//         return reject(new TypeError('Chaining cycle detected for promise'));
//     }
//     // 防止多次调用
//     let called;
//     // x不是null 且x是对象或者函数
//     if (x != null && (typeof x === 'object' || typeof x === 'function')) {
//         try {
//             // A+规定，声明then = x的then方法
//             let then = x.then;
//             // 如果then是函数，就默认是promise了
//             if (typeof then === 'function') {
//                 // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
//                 then.call(x, y => {
//                     // 成功和失败只能调用一个
//                     if (called) return;
//                     called = true;
//                     // resolve的结果依旧是promise 那就继续解析
//                     resolvePromise(promise2, y, resolve, reject);
//                 }, err => {
//                     // 成功和失败只能调用一个
//                     if (called) return;
//                     called = true;
//                     reject(err); // 失败了就失败了
//                 })
//             } else {
//                 resolve(x); // 直接成功即可
//             }
//         } catch (e) {
//             // 也属于失败
//             if (called) return;
//             called = true;
//             // 取then出错了那就不要在继续执行了
//             reject(e);
//         }
//     } else {
//         resolve(x);
//     }
// }
// //resolve方法
// Promise.resolve = function (val) {
//     return new Promise((resolve, reject) => {
//         resolve(val)
//     });
// }
// //reject方法
// Promise.reject = function (val) {
//     return new Promise((resolve, reject) => {
//         reject(val)
//     });
// }
// //race方法 
// Promise.race = function (promises) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < promises.length; i++) {
//             promises[i].then(resolve, reject)
//         };
//     })
// }
// //all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
// Promise.all = function (promises) {
//     let arr = [];
//     let i = 0;

//     function processData(index, data) {
//         arr[index] = data;
//         i++;
//         if (i == promises.length) {
//             resolve(arr);
//         };
//     };
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < promises.length; i++) {
//             promises[i].then(data => {
//                 processData(i, data);
//             }, reject);
//         };
//     });
// }

// class Promise {
//     constructor(executor) {
//         this.state = 'pending';
//         this.value = undefined;
//         this.reason = undefined;
//         this.onResolvedCallbacks = [];
//         this.onRejectedCallbacks = [];
//         let resolve = value => {
//             if (this.state === 'pending') {
//                 this.state = 'fulfilled';
//                 this.value = value;
//                 this.onResolvedCallbacks.forEach(fn => fn());
//             }
//         };
//         let reject = reason => {
//             if (this.state === 'pending') {
//                 this.state = 'rejected';
//                 this.reason = reason;
//                 this.onRejectedCallbacks.forEach(fn => fn());
//             }
//         };
//         try {
//             executor(resolve, reject);
//         } catch (err) {
//             reject(err);
//         }
//     }
//     then(onFulfilled, onRejected) {
//         onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
//         onRejected = typeof onRejected === 'function' ? onRejected : err => {
//             throw err
//         };
//         let promise2 = new Promise((resolve, reject) => {
//             if (this.state === 'fulfilled') {
//                 setTimeout(() => {
//                     try {
//                         let x = onFulfilled(this.value);
//                         resolvePromise(promise2, x, resolve, reject);
//                     } catch (e) {
//                         reject(e);
//                     }
//                 }, 0);
//             };
//             if (this.state === 'rejected') {
//                 setTimeout(() => {
//                     try {
//                         let x = onRejected(this.reason);
//                         resolvePromise(promise2, x, resolve, reject);
//                     } catch (e) {
//                         reject(e);
//                     }
//                 }, 0);
//             };
//             if (this.state === 'pending') {
//                 this.onResolvedCallbacks.push(() => {
//                     setTimeout(() => {
//                         try {
//                             let x = onFulfilled(this.value);
//                             resolvePromise(promise2, x, resolve, reject);
//                         } catch (e) {
//                             reject(e);
//                         }
//                     }, 0);
//                 });
//                 this.onRejectedCallbacks.push(() => {
//                     setTimeout(() => {
//                         try {
//                             let x = onRejected(this.reason);
//                             resolvePromise(promise2, x, resolve, reject);
//                         } catch (e) {
//                             reject(e);
//                         }
//                     }, 0)
//                 });
//             };
//         });
//         return promise2;
//     }
//     catch (fn) {
//         return this.then(null, fn);
//     }
// }

// function resolvePromise(promise2, x, resolve, reject) {
//     if (x === promise2) {
//         return reject(new TypeError('Chaining cycle detected for promise'));
//     }
//     let called;
//     if (x != null && (typeof x === 'object' || typeof x === 'function')) {
//         try {
//             let then = x.then;
//             if (typeof then === 'function') {
//                 then.call(x, y => {
//                     if (called) return;
//                     called = true;
//                     resolvePromise(promise2, y, resolve, reject);
//                 }, err => {
//                     if (called) return;
//                     called = true;
//                     reject(err);
//                 })
//             } else {
//                 resolve(x);
//             }
//         } catch (e) {
//             if (called) return;
//             called = true;
//             reject(e);
//         }
//     } else {
//         resolve(x);
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