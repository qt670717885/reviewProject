#### . 常用的CSS属性的值及含义

- display

  | 值           | 描述                                                         |
  | ------------ | ------------------------------------------------------------ |
  | none         | 此元素不会被显示。                                           |
  | block        | 此元素将显示为块级元素，此元素前后会带有换行符。             |
  | inline       | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
  | inline-block | 行内块元素。（CSS2.1 新增的值）                              |
  | table        | 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 |
  | table-cell   | 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）          |
  | flex         | 此元素会作为弹性盒模型显示                                   |

  

- position

  | 值       | 描述                                                         |
  | -------- | ------------------------------------------------------------ |
  | static   | 默认值，没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明） |
  | inherit  | 规定应该从父元素继承 position 属性的值。                     |
  | relative | 生成相对定位的元素，相对于其正常位置进行定位。               |
  | absolute | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。 |
  | fixed    | 生成固定定位的元素，相对于浏览器窗口进行定位。               |
  | sticky   | 粘性定位，该定位基于用户滚动的位置。它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。 |
  | inherit  | 从父元素继承                                                 |

  - position中定位时left，right，top，bottom的值是指离对应方向多远，比如left:10px,指的是距离左侧边界10px,实则元素向右移动了10px。top : 10px指的是距离上方边界10px，实则元素向下移动了10px

- overflow

  | 值      | 描述                                             |
  | ------- | ------------------------------------------------ |
  | visible | 默认值。内容不会被修剪，会呈现在元素框之外       |
  | hidden  | 内容会被修剪，并且其余内容不可见                 |
  | scroll  | 内容会被修剪，浏览器会显示滚动条以便查看其余内容 |
  | auto    | 由浏览器定夺，如果内容被修剪，就会显示滚动条     |
  | inherit | 规定从父元素继承overflow属性的值                 |

- float

  | 值     | 描述                                                 |
  | ------ | ---------------------------------------------------- |
  | left   | 元素向左浮动。                                       |
  | right  | 元素向右浮动。                                       |
  | none   | 默认值。元素不浮动，并会显示在其在文本中出现的位置。 |
  | nherit | 规定应该从父元素继承 float 属性的值。                |

  

#### . 居中布局实现

[css居中方法](./CSS/CSS居中方式.md)

#### . Padding、Margin百分比取值依据

- margin和padding四个方向上的百分比参照物都是父元素的宽
- 高度的百分比是相对于父元素的高度设置的

原因就是保持padding，margin四个值的统一

#### . 为什么margin 不能纵向取Auto

​	auto的作用是自动填充剩余空间，水平上，默认的宽度鬼则是"适应父级"规则（在水平方向上自动填充），所以在水平方向上设置auto会自动平均分配剩余空间

​	垂直方向上，块级元素不会自动填充，它的外部尺寸没有自动充满父元素，也没有剩余空间可说。所以margin：auto不能实现垂直居中。

​	通过position:absolute 和 top:0 bottom:0将元素设为流体特性的元素，这样该元素可自动填充父级元素的可用尺寸。

​	格式化宽度**：格式化宽度仅出现在“绝对定位模型中”，也就是出现在position属性值为absolute或fixed的元素中。

对于非替换元素，当left/right或top/bottom对立方位的属性值同时存在时，元素的宽度表现为“格式化宽度”，其宽度大小相对于最近的具有定位特性的祖先元素计算。

“格式化宽度”具有完全的流动性，也就是margin、border、padding、content内容区域同样会自动分配水平和垂直空间。

````css
.father {

    width: 300px; height:150px;

    position: relative;

}

.son {
    position: absolute;

    top: 0; right: 0; bottom: 0; left: 0;

    width: 200px; height: 100px;

    margin: auto;
}
````

#### . BFC(block formatting context )块级格式化上下文

​	BFC是块级格式上下文，，它是一个独立的容器，而且不会影响BFC外部元素的布局，也不会受外面布局的影响。

​	创建方式:

- 根元素html标签
- 浮动元素float值不为none
- 绝对定位元素，position值为absolute或fixed
- 行内块元素，display：inline-block
- overflow值不为visible的块级元素
- display：flow-root的元素
- display：flex或inline-flex或grid或inline-gird
- 表格单元格：display：table-cell
- 表格标题：display：table-caption

特性：

- BFC内部的块级元素会在垂直方向上一个接着一个的放置
- 同BFC内部的相邻块级元素在垂直方向上的距离由margin决定，且会发生垂直外边距重叠现象
- BFC内部每个元素的坐外边界与包含块的左外边界相接触，即时浮动元素也是如此
- BFC的区域不会与其他float元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算

应用场景:

- 浮动定位与清除浮动
- 外边距折叠（重叠）
- 阻止因为浏览器四舍五入计算宽度造成的多栏布局换行的情况，可在最后一列触发BFC来阻止换行
- 两栏布局时，当左侧盒子浮动之后，右侧盒子可以触发BFC，达到自适应

#### . 各类布局方式

[布局方式](./CSS/markdown/布局方式.md)

#### . 清除浮动的几种方法

​		读懂元素脱离了文档流，就无法撑起父元素，会造成父元素的高度塌陷

​		清除浮动的原理就是将浮动区域创建一个BFC，这样就不会影响到外面元素的布局，

- 方法一: 父元素设置固定宽高

- 方法二: 父元素设置overflow不为none的属性值

- 方法三: 在浮动元素同级设置带有clear:both属性的元素

  ```
    <div class="f1">
       <div class="c1"></div>
       <div class="clear"></div>
     </div>
     
     //css
     .f1{      
       background: gray;
     }
     .c1{
       width: 100px;
       height: 100px;
       background: tomato;
       float: left;
       }
    .clear{
       clear: both;
     }
  ```

- 使用伪元素

  ```
  .parent:after{
  	display :block;
  	content:'';
  	clear:both;
  	visibility: hidden;
  }
  ```

  

#### . CSS标准盒模型与低版本IE的盒模型

​	一个盒子由外到内分为margin，border，padding,content组成。

- 标准盒模型中，width指content部分的宽度，height也指的是content部分的高度
- IE盒模型中，width指的是content+padding+border三部分的宽度

使用box-sizing来切换盒模型

```
box-sizing:content-box//标准盒模型
box-sizing:border-box//IE盒模型
```

#### .CSS选择符有哪些

- 基本选择器
  - id选择器（#id）
  - 类选择器 （.class）
  - 标签选择器 (div,p,sapn)
  - 通配符选择器(*)
  - 属性选择器
- 组合选择器
  - 紧邻同胞选择器(p+div,p后面紧跟着的div)
  - 一般同胞选择器 (p ~ div,p后面所有的div)
  - 子选择器(ul>li)
  - 后代选择器（li a）

#### . 伪类与伪元素

- 伪元素和伪类的区别
  - 伪元素和伪类都是为了给一些特殊需求加样式，定义上基本一致。
  - 伪类像类选择器一样给已存在某个元素添加额外的样式；伪元素则是给自己虚拟的元素添加样式。
  - 已存在元素是指DOM中存在的，伪元素则是虚拟的一种，样式也是给这个虚拟的元素使用的。比如虚拟一个div
  - 声明不同，伪类和选择器之间用**一个冒号隔开**，伪元素则是**两个冒号隔**.

- 伪类

  ![preview](https://segmentfault.com/img/bV7aUa?w=594&h=537/view)

- 伪元素

  ![preview](https://segmentfault.com/img/bV7bjy?w=491&h=212/view)

  

  原文地址:http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/

#### . CSS优先级算法如何计算

- 不同级别：

  !important > 行内样式 （1000）> ID选择器（100） > 类选择器 （10）> 标签（1） > 通配符 > 继承 > 浏览器默认属性

- 同一级别:

  后写的会覆盖先写的

#### . 使元素消失的方法

- visibility:hidden
- display:none
- z-index:-1
- opacity:0

#### .为什么css放在顶部而js卸载后面

1. 浏览器预先加载css后，可以不必等待HTML加载完毕就可以渲染页面了
2. 其实HTML渲染并不会等到完全加载完在渲染页面，而是一边解析DOM一边渲染。
3. js写在尾部，主要是因为js主要扮演事件处理的功能，一方面很多操作是在页面渲染后才执行的。另一方面可以节省加载时间，使页面能够更加的加载，提高用户的良好体验

#### . 网页的层叠等级(z-index)

![img](https://gitee.com/gitee_fanjunyang/JueJin/raw/master/images/%E9%9D%A2%E8%AF%95_HTMLCSS_1.png?imageslim)\

上下顺序为:

z-index为正 >z-index为0或者auto > 行内元素 > 浮动元素 > 块级元素 > z-index为负 > background/border

这个层叠关系必须在同一层叠上下文中，层叠顺序才有意义

#### . CSS3有哪些新特性

- 圆角(border-radius:10px)

- 新增各种CSS选择器、伪类 （经常用到 :nth-child）

- 文字渲染 （Text-decoration）

- 透明色 & 透明度（opacity）

- 旋转 （transform）

  旋转 rotate，缩放 scale，倾斜 skew，平移 translate

- 动画(animation) & 过渡效果(transition)

- 阴影（box-shadow, text-shadow）

  ```
  box-shadow: x-offset y-offset blur-radius spread-radius color;
  
  text-shadow: x-offset y-offset blur-radius color;
  ```

- 新的布局方式，如 多列布局 multi-columns 、 弹性布局 flexible box 与 网格布局 grid layouts

- 线性渐变（gradient）

- 多背景（background-image可以设置多个url或linear-gradient）

- 媒体查询(@media [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)) ([可以看看这个](https://www.cnblogs.com/moqiutao/p/4753839.html))

- 边框可以设置图片（border-image）

#### . CSS3中的flexbox

 #### . 移动端的布局用过媒体查询吗

通过媒体查询可以为不同大小和尺寸的媒体定义不同的css，适应相应的设备的显示。

1. < head >里边<link rel=”stylesheet” type=”text/css” href=”xxx.css” media=”only screen and (max-device-width:480px)”>
2. CSS : @media only screen and (max-device-width:480px) {/*css样式*/}

#### . 浏览器是怎样解析CSS选择器的

CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。
而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

#### . **怎么让Chrome支持小于12px 的文字？**

```
p{font-size:10px;-webkit-transform:scale(0.8);} //0.8是缩放比例
```



#### . **如果需要手动写动画，你认为最小时间间隔是多久，为什么？**

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。



#### .**png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？**

1. png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
2. jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
3. gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
4. webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

#### . 移动端1px解决方案

DPR设备像素比，它是默认缩放为100%的情况下，设备像素和CSS像素的比值。

window.devicePIxelRatio  = 物理像素 / css像素



**解决方案一 ： **

在IOS中的1px可以写0.5px的boder

```
border:0.5px solid #E5E5E5
```

**总结：**

- 优点：简单，没有副作用
- 缺点：支持iOS 8+，不支持安卓。后期安卓follow就好了。



**解决方案二**

使用边框图片

```
  border: 1px solid transparent;
  border-image: url('./../../image/96.jpg') 2 repeat;
```

**总结：**

- 优点：没有副作用
- 缺点：border颜色变了就得重新制作图片；圆角会比较模糊。



**解决方案三：**

使用box-shdow

```
box-shadow: 0  -1px 1px -1px #e5e5e5,   //上边线
            1px  0  1px -1px #e5e5e5,   //右边线
            0  1px  1px -1px #e5e5e5,   //下边线
            -1px 0  1px -1px #e5e5e5;   //左边线

```



**解决方案四：**

**使用伪元素**

```
.setBorderAll{
     position: relative;
       &:after{
           content:" ";
           position:absolute;
           top: 0;
           left: 0;
           width: 200%;
           height: 200%;
           transform: scale(0.5);
           transform-origin: left top;
           box-sizing: border-box;
           border: 1px solid #E5E5E5;
           border-radius: 4px;
      }
    }

```



**解决方案五：**

这个解决方案是利用viewport+rem+js 实现的。

```
<html>
  <head>
      <title>1px question</title>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
      <meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">        
      <style>
          html {
              font-size: 1px;
          }            
          * {
              padding: 0;
              margin: 0;
          }
          .top_b {
              border-bottom: 1px solid #E5E5E5;
          }

          .a,.b {
                      box-sizing: border-box;
              margin-top: 1rem;
              padding: 1rem;                
              font-size: 1.4rem;
          }

          .a {
              width: 100%;
          }

          .b {
              background: #f5f5f5;
              width: 100%;
          }
      </style>
      <script>
          var viewport = document.querySelector("meta[name=viewport]");
          //下面是根据设备像素设置viewport
          if (window.devicePixelRatio == 1) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
          }
          if (window.devicePixelRatio == 2) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
          }
          if (window.devicePixelRatio == 3) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
          }
          var docEl = document.documentElement;
          var fontsize = 32* (docEl.clientWidth / 750) + 'px';
          docEl.style.fontSize = fontsize;
      </script>
  </head>
  <body>
      <div class="top_b a">下面的底边宽度是虚拟1像素的</div>
      <div class="b">上面的边框宽度是虚拟1像素的</div>
  </body>
</html>

```



#### . 重绘与回流

- 浏览器使用流式布局模型 (Flow Based Layout)。

- 浏览器会把`HTML`解析成`DOM`，把`CSS`解析成`CSSOM`，`DOM`和`CSSOM`合并就产生了`Render Tree`。

- 有了`RenderTree`，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。

- 由于浏览器使用流式布局，对`Render Tree`的计算通常只需要遍历一次就可以完成，但`table`及其内部元素除外，他们可能需要多次计算，通常要花3倍于同等元素的时间，这也是为什么要避免使用`table`布局的原因之一。

**回流一定引发重绘，重绘不一定引发回流**



**回流**

当`Render Tree`中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

- 导致回流的操作
  - 页面首次渲染
  - 浏览器窗口大小发生改变
  - 元素尺寸或位置发生改变
  - 元素内容变化（文字数量或图片大小等等）
  - 元素字体大小变化
  - 添加或者删除**可见**的`DOM`元素
  - 激活`CSS`伪类（例如：`:hover`）
  - 查询某些属性或调用某些方法

**重绘**

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：`color`、`background-color`、`visibility`等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。



**如何避免**

### CSS

- 避免使用`table`布局。
- 尽可能在`DOM`树的最末端改变`class`。
- 避免设置多层内联样式。
- 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上。
- 避免使用`CSS`表达式（例如：`calc()`）。

### JavaScript

- 避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。
- 避免频繁操作`DOM`，创建一个`documentFragment`，在它上面应用所有`DOM操作`，最后再把它添加到文档中。
- 也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的`DOM`操作不会引发回流和重绘。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。



#### 超出部分显示省略号

```
overflow: hidden;
text-overflow:ellipsis; 
white-space: nowrap;
```





### CSS3

#### . css3中的2D3D转换
[css3中的2D3D转换](./CSS\markdown\CSS新增2D3D转换.md)

#### . CSS3中过度
[css3中的过渡效果](./CSS\markdown\CSS3过渡.md)

#### . CSS3中动画效果

















