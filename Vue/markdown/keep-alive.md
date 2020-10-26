### keep-alive是什么？

keep-alive 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 transition 相似，keep-alive 是一个抽象组件：它自身不会渲染成一个 DOM 元素，也不会出现在父组件链中。

**keep-alive的作用：**简单来说就是在组件切换中保留组件内的状态，避免重复渲染，减少加载时间和性能损耗，提高用户体验。



### keep-alive的参数

- `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- `max` - 数字。最多可以缓存多少组件实例。



### keep-alive的生命周期

- **activated** ： 

  在 keep-alive 组件激活时调用，该钩子函数在服务器端渲染期间不被调用

- **deactivated：**

  在 keep-alive 组件停用时调用，该钩子在服务器端渲染期间不被调用



**注意**：**只有使用keep-alive包裹时，这两个生命周期函数才会被调用，如果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来 created 钩子函数中获取数据的任务。使用 exclude 排除之后，就算被包裹在 keep-alive 中，这两个钩子函数依然不会被调用！另外，在服务端渲染时，此钩子函数也不会被调用。**



### keep-alive的使用

#### 1. 缓存所有页面

需要在App.vue中定义router-view的位置包裹上keep-alive

```
//app.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
    </div>
    <keep-alive >
      <router-view />
    </keep-alive>
  </div>
</template>
```



#### 2. 根据条件缓存页面

##### 使用include，exclude

```vue
//app.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/keepAlive">keepAlive</router-link>
    </div>
    <!-- 1.逗号分隔字符串 -->
    <keep-alive include="Home,keepAlive" exclude="about">
      <router-view />
    </keep-alive>
    <!-- 2.正则表达式 (使用 `v-bind`) -->
    <keep-alive :include="/Home|keepAlive/">
      <router-view />
    </keep-alive>
    <!-- 3.数组 (使用 `v-bind`) -->
    <keep-alive :include="['a', 'b']">
      <router-view />
    </keep-alive>
  </div>
</template>
```

```

```



**注意**： **这里include，exclude匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 `components` 选项的键值)。匿名组件不能被匹配。**



#### 3. 集合路由，缓存页面

主要是在路由配置中为各个路由中增加meta属性，在meta属性中使用keepAlive控制组件的缓存，在App.vue中使用keep-alive包裹router-view，在router-view中使用v-if判断条件，条件为$route.meta.keepAlive具体如下：

```
//router中的index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/keepAlive',
    name: 'keepAlive',
    component: () => import('../views/keepAlive.vue'),
    meta: {
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
```

```
//app.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/keepAlive">keepAlive</router-link>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

```

**注意** ： 这里需要再keep-alive包裹外再定义一个router-view，如不定义，其他不满足keep-alive的组件将无法被渲染。