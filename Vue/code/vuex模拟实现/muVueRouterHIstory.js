/**
 * 通过history.pushState()方法改变地址栏，它并不向服务器发送请求，只是改变地址栏地址，并记录到历史记录
 * 监听popstate事件
 * 根据当前路由地址找到对应组件重新渲染
 */


/**
 * Vue-router的使用
 * import VueRouter from 'vue-router'
 * Vue.use(VueRouter)
 * 
 * const routes = [{
 *      path: '/',
 *      name: 'Home',
 *      component: Home,
 * }] 
 * 
 * const router = new VueRouter({
 *      routes
 *  })
 *
 *export default router
 */

/**
 * vue.use可以传入一个函数，直接调用这个函数，也可以传入一个对象，并调用对象的install方法
 */

/**
 * 创建一个VueRouter类，里面有一个install方法
 */

/**
 * 类图 ： 
 * 名称 ： VueRouter
 * 属性 ：
 *  - options : 记录构造函数中传入的对象
 *  - data ： [object] 需要一个响应式对象,里面存储的路由地址与组件，路由改变时自动加载组件
 *  - routeMap ： 记录路由和组件的对应关系
 * 方法：
 *  Constructor(Options) : VueRouter
 *  _install(Vue) : void
 *  init() : void
 *  initEvent() :void
 *  createRouteMap() :void
 *  initComponents(Vue) : void
 */

let _Vue = null // 记录构造函数
export default class VueRouter {

    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/' // 当前的路由地址
        })

    }

    static install(Vue) {
        // 1. 判断当前是否被安装
        if (VueRouter.install.installed) { // 记录到install函数的installed上
            return
        }
        VueRouter.install.installed = true
        // 2. 把Vue的构造函数记录到全局变量，原因是其他实例方法需要用到Vue构造函数
        _Vue = Vue
        // 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
        // _Vue.prototype.$router = this.$options.router
        // 利用混入获取Vue实例
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
        this.initComponents(_Vue)
        this.initEvent()
    }

    createRouteMap() {
        // 帮我们解析路由规则，通过键值对形式存在routeMap中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents(Vue) { // 传递Vue构造函数的作用是减少对外部环境的依赖
        // 需要router-link与router-view组件
        Vue.component('router-link', {
            props: { // 这里的router-link传递一个to属性
                to: String
            },
            // 运行时版本Vue是不支持template的,需要render函数
            // template : '<a :href:"to"><slot></slot></a>'
            render（ h） { // hh函数的作用是创建虚拟dom，render函数中调用h函数，并把结果返回
                //h函数接收三个参数，第一个参数是对应的元素选择器，第二个参数设置标签属性, 第三个参数设置生成元素的子元素
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
                    // 1. 调用pushState改变地址栏
                    history.pushState({}, '', this.to)
                    // 2. 将当前地址记录到data.current中
                    this.$router.data.current = this.to
                    e.preventDefault(); // 阻止事件默认行为
                }
            }
        })

        const self = this // 这里存储this指向为Vuerouter对象
        Vue.component('router-view', {
            render(h) {
                // 获取对应组件
                const component = self.routeMap[self.data.current]
                // h函数可以把一个组件转换为虚拟dom
                return h(component)
            }
        })

    }

    initEvent() {
        window.addEventListener('popstate', () => {
            // 作用是解决前进，后退操作
            // 这里的this就是vuerouter对象
            this.data.current = window.location.pathname

        })
    }
}