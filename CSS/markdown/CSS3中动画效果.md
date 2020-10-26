### @keyframes属性

@keyframes 规则是创建动画。

@keyframes 规则内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式。

```
// 需要定义@keyframes
		@keyframes translate {
            from {
                left: 0;
            }
            to {
                left: 100px;
            }
        }
or
		@keyframes translate {
            0% {
                left: 0;
            }
            100% {
                left: 100px;
            }
        }
```



### animation属性

**语法**

```
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

**属性值**

| 值                        | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| animation-name            | 指定要绑定到选择器的关键帧的名称                             |
| animation-duration        | 动画指定需要多少秒或毫秒完成                                 |
| animation-timing-function | 设置动画将如何完成一个周期                                   |
| animation-delay           | 设置动画在启动前的延迟间隔，以秒或毫秒计。默认值为0。        |
| animation-iteration-count | 定义动画的播放次数。                                         |
| animation-direction       | 指定是否应该轮流反向播放动画。                               |
| animation-fill-mode       | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| animation-play-state      | 指定动画是否正在运行或已暂停。                               |
| initial                   | 设置属性为其默认值。                                         |
| inherit                   | 从父元素继承属性。                                           |



**animation-timing-function属性值**

| 值                            | 描述                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| linear                        | 动画从头到尾的速度是相同的。                               |
| ease                          | 默认。动画以低速开始，然后加快，在结束前变慢。             |
| ease-in                       | 动画以低速开始                                             |
| ease-out                      | 动画以低速结束                                             |
| ease-in-out                   | 动画以低速开始和结束                                       |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值 |



**animation-iteration属性值**

| 值       | **描述**                         |
| -------- | -------------------------------- |
| *n*      | 一个数字，定义应该播放多少次动画 |
| infinite | 指定动画应该播放无限次（永远）   |

**animation-direction属性值**

| 值                | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| normal            | 默认值。动画按正常播放。                                     |
| reverse           | 动画反向播放。                                               |
| alternate         | 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。 |
| alternate-reverse | 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。 |
| initial           | 设置该属性为它的默认值                                       |
| inherit           | 从父元素继承该属性                                           |



**animation-fill-mode**

| 值        | 描述                                                         |
| :-------- | :----------------------------------------------------------- |
| none      | 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。 |
| forwards  | 在动画结束后（由 animation-iteration-count 决定），动画将应用该属性值。 |
| backwards | 动画将应用在 animation-delay 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 animation-direction 为 "normal" 或 "alternate" 时）或 to 关键帧中的值（当 animation-direction 为 "reverse" 或 "alternate-reverse" 时）。 |
| both      | 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。 |
| initial   | 设置该属性为它的默认值。                                     |
| inherit   | 从父元素继承该属性。                                         |



**animation-play-state**

| 值      | 描述               |
| ------- | ------------------ |
| paused  | 指定暂停动画       |
| running | 指定正在运行的动画 |

