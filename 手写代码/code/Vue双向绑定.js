/*
    基于Object.defineProperty实现双向绑定
*/
// 极简版
Object.defineProperties(obj, 'text', {
    get: function () {
        console.log('get val')
    },
    set: function (newVal) {
        console.log(`set Val: ${newVal}`)
        document.getElementById('input').value = newVal;
        document.getElementById('span').innerHTML = newVal;
    }
})


const input = document.getElementById('input');
input.addEventListener('keyup', function (e) {
    obj.text = e.target.value;
})

// 发布订阅版本
//我们先实现一个订阅发布中心，即消息管理员（Dep）,它负责储存订阅者和消息的分发,不管是订阅者还是发布者都需要依赖于它
let uid = 0;
// 用于储存订阅者并发布消息
class Dep {
    constructor() {
        // 设置id,用于区分新Watcher和只改变属性值后新产生的Watcher
        this.id = uid++;
        // 储存订阅者的数组
        this.subs = [];
    }
    // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
    depend() {
        Dep.target.addDep(this);
    }
    // 添加订阅者
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
        this.subs.forEach(sub => sub.update());
    }
}
// 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
Dep.target = null;

// 现在我们需要实现监听者(Observer),用于监听属性值的变化。

// 监听者,监听对象属性值的变化
class Observer {
    constructor(value) {
        this.value = value
        this.walk(value);
    }
    // 遍历属性值并监听
    walk(value) {
        Object.keys(value).forEach(key => this.convert(key, value[key]));
    }
    // 执行监听的具体方法
    convert(key, val) {
        defineReactive(this.value, key, val);
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    // 给当前属性的值添加监听
    let chlidOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set: newVal => {
            if (val === newVal) return;
            val = newVal;
            // 对新值进行监听
            chlidOb = observe(newVal);
            // 通知所有订阅者，数值被改变了
            dep.notify();
        }
    })
}

function observe(value) {
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

// 那么接下来就简单了,我们需要实现一个订阅者(Watcher)。

class Watcher {
    constructor(vm, expDrFn, cb) {
        this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
        this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
        this.cb = cb; // 当数据更新时想要做的事情
        this.expOrFn = expOrFn; // 被订阅的数据
        this.val = this.get(); // 维护更新之前的数据
        // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
        update() {
            this.run();
        }
        run() {
            const val = this.get();
            console.log(val);
            if (val !== this.val) {
                this.val = val;
                this.cb.call(this.vm, val);
            }
        }
        get() {
            // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
            Dep.target = this;
            const val = this.vm._data[this.expOrFn];
            // 置空，用于下一个Watcher使用
            Dep.target = null;
            return val;
        }
        addDep(dep) {
            // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
            // 此判断是避免同id的Watcher被多次储存
            if (!this.depIds.hasOwnProperty(dep.id)) {
                dep.addSub(this);
                this.depIds[dep.id] = dep;
            }
        }
    }
}

// 那么我们最后完成Vue,将上述方法挂载在Vue上。
class Vue {
    constructor(options = {}) {
        // 简化了$options的处理
        this.$options = options;
        // 简化了对data的处理
        let data = (this._data = this.$options.data);
        // 将所有data最外层属性代理到Vue实例上
        Object.keys(data).forEach(key => this._proxy(key));
        // 监听数据
        observe(data);
    }
    // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
    $watch(expOrFn, cb) {
        new Watcher(this, expOrFn, cb);
    }
    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: () => this._data[key],
            set: val => {
                this._data[key] = val;
            },
        });
    }
}

// defineProerty的缺陷
/*
    1. 无法监听数组变化
    2. Object.defineProperty的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择。
*/

// Proxy 的特点
/*
    1. Proxy可以直接监听对象而非属性
    2. Proxy可以直接监听数组的变化
*/