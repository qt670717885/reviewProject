/**
 * URL中#后面的内容作为路径地址
 * 通过laction.URL更改地址，不会像服务器发送请求，但会记录到浏览器访问地址
 * 监听inghashchange事件
 * 根据当前路由地址找到对象组件重新渲染
 */

import VueRouter from "./muVueRouterHIstory"

/**
 * 类图
 * 名称 ： Vuerouter
 * 属性 ： 
 * options
 * data
 * routerMap
 * 方法
 *  Constructor(Options) : VueRouter
 *  _install(Vue) : void
 *  init() : void
 *  initEvent() :void
 *  createRouteMap() :void
 *  initComponents(Vue) : void
 * 
 */
const _Vue = null
export default class VueRouer {
    constructor($options) {
        this.options = this.options
        this.data = _Vue.observable({
            current: '/'
        })
        this.routerMap = {}
    }
    static install(Vue) {
        // 1. 判断插件是否被安装
        // 2. 将Vue的构造函数记录到全局变量
        // 3. 把router注入到Vue实例上，这里利用混入
        if (VueRouter.prototype.installed) {
            rteurn
        }
        VueRouer.installed.installed = true

        _Vue = Vue
        _Vue.mixin({
            beforeCreate() {
                // 判断是否是组件的实例，如果是就不执行,而vue实例的时候才执行
                if (this.$options.router) {
                    // 这里的this就是Vue实例
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            },
        })
    }
    init() {
        this.createRouteMap()
    }
    createRouteMap() {
        // 这里将option中的路由规则通过键值对的形式存储到routeMap中
        this.options.routes.forEach(route => {
            this.routerMap[route.path] = route.component
        })
    }
    initComponents(Vue) {
        // 这里创建两个组件vue-link,vue-view
        Vue.component('vue-link', {
            props: {
                to: String
            }
            render(h) {

                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHandler(e) {
                    e.preventDefault()
                    // 修改hash值
                    location.hash = this.to
                    // 改写current
                    this.$router.data.current = this.to
                }
            },
        })
        let self = this // 这里存储this指向为Vuerouter对象
        Vue.component('vue-view', {
            render(h) {
                const component = self.routerMap[self.data.current]
                return h(component)
            }
        })
    }

    initEvent () {
        window.addEventListener('hashchange',()=>{
            this.data.current =  window.location.hash.substr(1)
        })
    }
}