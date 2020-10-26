/**
 * https://my.oschina.net/u/2436852/blog/1837552
 */

/**
 * 解决异步实现
 * 现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们

类似于发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then，所以存在同一个数组内。
 * 
*/

class Promsie {
    constructor(executor) {
        // 初始化状态
        let state = 'pending' // 2
        // 成功的值
        let value = undefined // 2
        // 失败的值
        let reson = undefined // 2
        // 成功存放的数组
        this.onResolveCallbacks = [] // 4
        // 失败存放的数组
        this.onRejectedCallbacks = [] // 4
        // 成功
        let reslove = (value) => { //2
            // 改变state的状态
            if (this.state === 'pending') {
                this.state = 'fullfilled'
                this.value = value
                // 一旦resolve执行，调用成功数组的函数
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }; //1
        // 失败
        let reject = (reson) => { // 2
            // 改变state的状态
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reson = reson
                // 一旦reject执行，调用失败数组的函数
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }; //1


        try {
            // 立即执行
            executor)(reslove, reject) //1
    } catch (err) {
        reject(err)
    }


}

//解决链式调用
// 为了达成链式，我们默认在第一个then里返回一个promise。秘籍规定了一种方法，就是在then里面返回一个新的promise,称为promise2：promise2 = new Promise((resolve, reject)=>{})



then(onFullfilled, onRejected) { // 3
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
        throw err
    };
    let promsie2 = new Promise((reslove, reject) => {
        // 如果state为fullfilled,执行onFullfilled
        if (this.state === 'fullfilled') {
            // 异步
            setTimeout(() => {
                try {
                    let x = onFullfilled(this.value)
                    reslovePromise(promsie2, x, reslove, reject)
                } catch (err) {
                    reject(err)
                }

            }, 0)

        }
        // 如果state为rejected,执行onRejected
        if (this.state === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reson)
                    reslovePromise(promsie2, x, reslove, reject)
                } catch (err) {
                    reject(err)
                }


            }, 0)

        }
        // 当状态state为pending时
        if (this.state === 'pending') {
            // onFullfilled傳入到成功數組
            this.onResolveCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFullfilled(this.value)
                        reslovePromise(promsie2, x, reslove, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)

            })
            // onRejected传入到失败数组
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value);
                        reslovePromise(promsie2, x, reslove, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)

            })
        }
    })

}
}

function reslovePromise(promsie2, x, reslove, reject) {
    // 循环引用报错
    if (promsie2 === x) {
        // reject报错
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            // A+规定，声明then = x的then方法
            let then = x.then;
            // 如果then是函数，就默认是promise了
            if (typeof then === 'function') {
                then.call(x, y => {
                    // 成功和失败只能调用一个
                    if (called) return;
                    called = true;
                    // resolve的结果依旧是promise 那就继续解析
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    // 成功和失败只能调用一个
                    if (called) return;
                    called = true;
                    reject(err); // 失败了就失败了
                })
            } else {
                resolve(x); // 直接成功即可
            }
        } catch (e) {
            // 也属于失败
            if (called) return;
            called = true;
            // 取then出错了那就不要在继续执行了
            reject(e);
        }
    } else {
        resolve(x);
    }
}

class MyPromise {
    constructor(fn) {
        this.status = "padding";
        this.data = "";
        this.error = "";
        this.resolveArr = [];
        this.rejectArr = [];
        let resolve = data => {
            setTimeout(() => {
                if (this.status == "padding") {
                    this.data = data;
                    this.status = "resolved";
                    this.resolveArr.forEach(i => i());
                }
            }, 0);
        };
        let reject = error => {
            setTimeout(() => {
                if (this.status == "padding") {
                    this.error = error;
                    this.status = "rejected";
                    this.rejectArr.forEach(i => i());
                }
            }, 0);
        };
        fn(resolve, reject);
    }
    then(Onresolve, Onreject) {
        if (this.status == "resolved") {
            return new MyPromise((resolve, reject) => {
                let res = Onresolve(this.data);
                if (res instanceof MyPromise) {
                    res.then(resolve, reject);
                } else {
                    resolve(res);
                }
            });
        }
        if (this.status == "rejected") {
            return new MyPromise((resolve, reject) => {
                let res = Onreject(this.error);
                if (res instanceof MyPromise) {
                    res.then(resolve, reject);
                } else {
                    resolve(res);
                }
            });
        }
        if (this.status == "padding") {
            return new MyPromise((resolve, reject) => {
                this.resolveArr.push(() => {
                    let res = Onresolve(this.data);
                    if (res instanceof MyPromise) {
                        res.then(resolve, reject);
                    } else {
                        resolve(res);
                    }
                });
                this.rejectArr.push(() => {
                    let res = Onreject(this.error);
                    if (res instanceof MyPromise) {
                        res.then(resolve, reject);
                    } else {
                        resolve(res);
                    }
                });
            });
        }
    }
    static resolve(data) {
        return new MyPromise(resolve => resolve(data));
    }
    static reject(error) {
        return new MyPromise(reject => reject(error));
    }
}