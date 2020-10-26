/**
 * 使用Vuex的情况是引入Vuex对象
 * import Vuex from "Vuex"
 * Vue.use(Vuex)
 * export default Vuex.store({
 *      state : {
 * 
 *      },
 *      getters : {
 *          xxx : state => {
 *              return state.xxxx.filter()
 *          }
 *      }
 *      ...
 * })
 * 在组建中使用
 * $store.state
 * 
 * 所以我们需要创建一个store类与install方法
 */

let _Vue = null // 存储Vue的构造函数在store中使用
class Store {
    // 需要一个构造函数接收一个参数,并定义两个方法
    constructor(options) {
        const {
            // 
            state = {}, // 这里需要时响应式的
            getters = {},
            mutations = {},
            actions = {}
        } = options
        this.state = _Vue.observable(state) // 这里就是对state进行响应式处理
        this.getters = Object.create(null) 
        Object.keys(getters).forEach(key => { 
            Object.definePropertiy(this.getters,key,{
                // 将key注册到getters中
                get : ()=> getters[key](state) // 这里就是讲state传入getter每一个方法的步骤
            })
        })
        this._mutations = mutations
        this._actions = actions

        // 创建两个方法commit与dispatch
        // commit接收两个参数，一个是mutation的名字，第二个是调用方法时传入的参数
        
        commit (type.payload) {
            this._mutations[type](this.state,payload)
        }

        dispatch(type,payload) {
            this._actions[type](this,payload)
        }
    }
}

function install(Vue) { // intsall方法接收两个参数，一个是Vue实例，一个是可配置选项
    _Vue = Vue
    // 这里需要把创建Vue实例时候注入的store对象挂在到Vue原型上$store
    // 这里通过混入来mixin中beforeCreate来拿到Vue实例
    _Vue.mixin({
        beforeCreate() {
            // 这里判断this.option.store是否存在，如果是组件实例就没有，就不逊要做这个事情
            if (this.options.store) {
                _Vue.prototype.$store = this.$option.store
            }
        },
    })
}

export default {
    Store,
    install
}