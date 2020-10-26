- **基本类型和引用类型**

  基本类型 : number,string,boolean,null,undefind,symbol (es6)

  引用类型: object,array,function，统称对象类型

- **类型判断**

  1. typeof

     ```javascript
     //typeof对引用类型，除了函数返回function，其他都返回object
     typeof 1 // 'number'
     typeof '1' // 'string'
     typeof undefined // 'undefined'
     typeof true // 'boolean'
     typeof Symbol() // 'symbol'
     typeof null // 'object'
     a = ()=>{}
     console.log( typeof a)//function
     ```

  2. instamceof判断引用类型

     ```js
     [1,2,3] instanceof Array // true
     { name : 'xxx' } instanceof Object // true
     a = () => {}
     a instanceof Function // true
     ```

  3. isArray()判断是否为数组

     ```js
     Array.isArray([1,2,3])
     ```

  4. Object.prototype.toString.call(...)： 万能方法

     ```js
     
     Object.prototype.toString.call(1) // [object Number]
     
     Object.prototype.toString.call('1')//[object String]
     
     Object.prototype.toString.call(true)//[object Boolean]
     
     Object.prototype.toString.call(null)//[object Null]
     
     Object.prototype.toString.call(undefind)//[object Undefind]
     
     Object.prototype.toString.call(Symbol()) //[object Symbol]
     
     Object.prototype.toString.call(()=>{})//[object Function]
     
     Object.prototype.toString.call({})//[object Object]
     
     Object.prototype.toString.call([1,2,3])//[object Array]
     
     ```

- 强制类型转换

  ```
  [] == [] // false
  [] != [] // true
  [] === [] // false
  [] !== [] // false
  
  [] == ![] // true
  
  {} == {} // fasle
  {} != {} //true
  {} == !{} // false
  
  a = () =>{}
  b = ()=>{}
  a == b// false
  a != b// true
  ```



- #### event Loop

  Js是单线程的，所有任务排队依次执行，避免阻塞，任务开始时，

  1. 同步任务会在主线程执行形成执行栈，
  2. 异步任务会被暂时挂起，等有了结果后再被调回“任务队列”（task queue），排队等待
  3. 当执行栈中的同步任务执行完毕，就会读取任务队列第一个回调函数，并将该回调推入执行栈执行
  4. 主线程不断循环重复第三步，这就是“event loop”的运行机制。

- #### 宏任务与微任务

  宏任务可以理解为每次执行栈执行的代码就是一个宏任务，包括同步代码，setTimeout，I/O等。整体代码也算一个宏任务

  微任务是在当前宏任务执行结束后立即执行的任务，微任务包含Promise，process.nextTick(Node环境下)

- #### this指向

  this指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，指向的就是调用它的对象。

  this指向分为以下几种情况：

  1. 在构造函数中，使用new关键字，this将永远指向实例化的对象

     ```js
     class People {
         constructor (name,age){
             this.name = name
             this.age = age
         }
     }
     
     const obj = new  People('qt',18)
     console.log(obj.name) // qt
     ```

     

  2. 当this在一个函数中时，函数直接被调用，此时this指向的是window，严格模式下是undefind

     ```
     function fn() {
         console.log(this)
     }
     fn() // window
     window.fn() //window
     ```

  3. 箭头函数

     箭头函数没有自己的 this，当在内部使用了 this时，它会指向最近一层作用域内的 this。

     无论嵌套多少层箭头函数中的this与最外层非箭头函数this相同，最外层非箭头函数为fun()，其中的this指向window所以里面两个箭头函数也一样。

     call，apply，bind无法改变箭头函数的this
  
     ```
     var name='hkj'
     function fun(){
       var name="hkj1"
       return ()=>{
         var name='hkj2'
         console.log(this.name)          //hkj
         return ()=>{
           var name='hkj3'
           console.log(this.name)        //hkj
         }
       }
     }
   fun()()()
     ```

  4. 当做属性调用时，函数中this指向对最后一个调用函数的对象。这里指向obj,所以name为hkj
  
     ```
     var name='window'
     function fun(){
       var name='fun'
       console.log(this.name)
     }
     let obj={
       fun:fun,
       name:'hkj'
     }
     obj.fun()       //hkj
     ```
     
     
     
  5. 定时器内this指向，setTimeout中的this都指向window。
  
     ```
     var name='window'
     function hello(){
       setTimeout(function(){
         console.log(this.name)
       }, 100);
     }
     let obj={
       name:'obj',
       hello
     }
     obj.hello()     //widow
     
     var name='window'
     function hello(){
       console.log(this.name)
     }
     let obj={
       name:'obj',
       hello
     }
     setTimeout(obj.hello,1000)          //window
     
     ```
  
  绑定优先级：
  
  ​	new>call及其他两个函数>属性调用>直接调用
  
- #### 闭包

  > 当函数能够记住并访问所在的词法作用域时，就产生了闭包。

  ```
  function () {
  	let name = 'qt'
  	return function (age) {
  		console.log(name+age)
  	}
  }
  ```



​	闭包是一个特殊的函数，它可以访问函数内部的变量，可以让变量始终保存在内存中，，不会在函数调用后被垃圾回收机制清除

- #### 原型与原型链

  [原型与原型链](./js/markdown/js面向对象/面向对象构造函数，原型与原型链.md)

- #### JS继承

  [JS继承](./js/markdown/js面向对象/面向对象继承.md)
  
- #### null与undefind的区别

  - null表示为无，不应有值，所以对象的某个属性值为`null`是正常的，`null`转换为数值时值为`0`。
  - undefind表示“缺少值”，即此处应有一个值，但还没有定义，

- 赋值，浅拷贝与深拷贝

  - 这里长指引用类型赋值是将引用类型的内存地址赋值给另外一个值。
  - 浅拷贝是创建一个新兑现，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
  - 将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象

- ### ES6

  #### 箭头函数与普通函数的区别

  - 箭头函数是匿名函数，不能作为构造函数，不能使用new
  - 箭头函数不能绑定arguments，取而代之用rest参数...解决

  ```
  function A(a){
    console.log(arguments);
  }
  A(1,2,3,4,5,8);
  // [1, 2, 3, 4, 5, 8, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  let C = (...c) => {
    console.log(c);
  }
  C(3,82,32,11323);
  // [3, 82, 32, 11323]
  ```

  - 箭头函数没有原型属性
  - 箭头函数的this永远指向其上下文的this，没有办改变其指向，
  - 箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值

- #### 强制类型转换

  ```
  [] == [] // false 原因是未赋值，找不到内存地址的指针
  /*
   * 首先，布尔操作符!优先级更高，所以被转变为：[] == false
   * 其次，操作数存在布尔值false，将布尔值转为数字：[] == 0
   * 再次，操作数[]是对象，转为原始类型（先调用valueOf()，得到的还是[]，再调用toString()，得到空字符串''）：'' == 0
   * 最后，字符串和数字比较，转为数字：0 == 0
  */
  [] == ![] // true 
  NaN == NaN // false     NaN不等于任何值
  null == undefined // true
  null == 0 // false
  undefined == 0 // false
  ```

  

- ### 作用域

  

- ### 事件捕获或事件冒泡

- ### 原生js获取位置的api

  ```
  // css
  		.box {
              width: 100px;
              height: 100px;
              background: tomato;
              padding: 20px;
              border: 10px solid #000;
              position: absolute;
              top: 100px;
              left: 100px;
          }
  //HTML
  <div class="box"></div>
  ```

  

  **元素自身大小**

  | api                                          | 描述                                             |
  | -------------------------------------------- | ------------------------------------------------ |
  | element.offsetWidth / element.offsetHeight   | 元素的整个宽高，包括(content+padding+border)     |
  | element.clientWidth /   element.clientHeight | 元素的内部宽高，不包含border （content+padding） |
  | element.clientTop  /  element.clientLeft     | 元素的上边框与做边框高度(border)                 |

  **元素的偏移量**

  | api                                    | 描述                     |
  | -------------------------------------- | ------------------------ |
  | element.offsetTop / element.offsetLeft | 上边偏移量，左边的偏移量 |

  

  **元素大小和相对于视口的位置**

  ````
  const rect = element.getBoundingClientRect()
  ````

  | api                                                  | 描述                                                         |
  | ---------------------------------------------------- | ------------------------------------------------------------ |
  | rect.width/ rect.height                              | 元素自身的宽高（content+padding+border）                     |
  | react.x / react.y                                    | 元素左上角与父元素左上角的距离(position移动的值)             |
  | react.top / react.left /  react.right / react.bottom | 元素的上边界和父元素上边界的距离 / 元素的左边界和父元素左边界的距离 / 元素的右边界和父元素的左边界的距离 / 元素的下边界和父元素上边界的距离 |

  

  **可视区域大小**

  | api                                   | 描述     |
  | ------------------------------------- | -------- |
  | document.documentElement.clientWidth  | 视口宽度 |
  | document.documentElement.clientHeight | 视口高度 |

  ​	

  **页面实际大小**

  | api                                   | 描述     |
  | ------------------------------------- | -------- |
  | document.documentElement.scrollWidth  | 页面宽度 |
  | document.documentElement.scrollHeight | 页面高度 |

  

  **窗口左上角与屏幕左上角的距离**

  | api            | 描述    |
  | -------------- | ------- |
  | window.screenX | 距离x轴 |
  | window.screenY | 距离Y轴 |



​		**窗口的内高度、内宽度（文档显示区域+滚动条）**
​			

- | api                | 描述       |
  | ------------------ | ---------- |
  | window.innerWidth  | 窗口内宽度 |
  | window.innerHeight | 窗口内高度 |



### 判断是否在可视区域

```
if (rect.top < document.documentElement.clientHeight && rect.bottom > 0 && rect.left < document
                .documentElement.clientWidth && rect.right > 0) {
                return true
            } else {
                return false
            }
```



### 事件流

#### 事件委托

事件代理的原理用到的就是事件冒泡和目标元素，把事件处理器添加到父元素，等待子元素事件冒泡，并且父元素能够通过target（IE为srcElement）判断是哪个子元素，从而做相应处理

```
var colorList=document.getElementById("color-list");
    colorList.addEventListener('click',showColor,false);
    function showColor(e)
    {
        e=e||window.event;
        var targetElement=e.target||e.srcElement;
        if(targetElement.nodeName.toLowerCase()==="li"){
        alert(targetElement.innerHTML);
        }
    }
```



#### 事件代理的好处

 总结一下事件代理的好处：

- 将多个事件处理器减少到一个，因为事件处理器要驻留内存，这样就提高了性能。想象如果有一个100行的表格，对比传统的为每个单元格绑定事件处理器的方式和事件代理（即table上添加一个事件处理器），不难得出结论，事件代理确实避免了一些潜在的风险，提高了性能。
- DOM更新无需重新绑定事件处理器，因为事件代理对不同子元素可采用不同处理方法。如果新增其他子元素（a,span,div等），直接修改事件代理的事件处理函数即可，不需要重新绑定处理器，不需要再次循环遍历。



阻止事件冒泡

```
e,stopPropagation()
```

