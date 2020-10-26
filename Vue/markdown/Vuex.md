### Vuex是什么？

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。



### Vuex的架构

![vuex](https://vuex.vuejs.org/vuex.png)

### Vuex的5个模块

分别为State，Getter，Mutation，Action，Module



#### State （ 单一状态树 ）

在Vue组件中获取Vuex的状态

- 方法一 ： 需要将Vuex注入Vue中，可以使用this.$store.state.count调用

- 方法二 ： 通过mapstate辅助函数将state映射到组件中，在计算属性中接收

  ```vue
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: "Vuex1",
    computed: {
        ...mapState(['count'])
    },
  };
  </script>
  ```



#### Getter

Gettter相当于store的计算属性。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```
state: {
      count : 0,
      todo : [
        { id : 1, text: 'todo1' , done : true },
        { id : 2, text: 'todo2' , done : false },
        { id : 3, text: 'todo3' , done : false },
        { id : 4, text: 'todo4' , done : true },
      ]
  },
  getters : {
    doneTodos : state => {
      return state.todo.filter(todo => todo.done)
    }
  },
```



在组件中引用gette

- 方法一 ： 使用$store.getters.xxx引用
- 方法二 ： 使用mapGetters辅助函数，它可以将store中的getter映射到局部计算属性

```
import { mapState , mapGetters } from 'vuex'

export default {
  name: "Vuex1",
  computed: {
      ...mapState(['count']),
      ...mapGetters(['doneTodos'])

  },
};
```



#### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：



**提交载荷**

你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

```
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```

```
store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```



**在组件中提交Mutation**

- 方法一 ： 使用$store.commit('名称',参数)‘
- 方法二：使用mapMutations辅助函数将组件中的**methods**映射为store.commit

```
<template>
  <div>
    {{ count }}
    <button @click="addCount(1)">增加</button>
    <button @click="addCount(-1)">减少</button>
    <h1>todoList</h1>
    <div v-for="item in doneTodos" :key="item.id">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Vuex1",
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["doneTodos"]),
  },
  methods: {
    ...mapMutations(["addCount"]),
  },
};
```



#### action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

```
actions: {
    increment (context) {
      context.commit('increment')
    }
  }
```



也可以使用解构来优化代码

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```



**分发action**

使用store.dispatch

```
store.dispatch('increment')
```



**在组件中分发action**

- 方法一 ： 使用`this.$store.dispatch('xxx')` 分发 action
- 使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```
...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
```

