### transition属性



#### 语法

```
transition: *property duration timing-function delay*;
```



接收的四个值分别是



| 值                         | 描述                            |
| -------------------------- | ------------------------------- |
| transition-property        | 指定css属性名称，transition效果 |
| transition-duration        | 规定完成过渡效果需要花费的时间  |
| transition-timing-function | 指定切换效果的速度              |
| transition-delay           | 指定何时将开始切换效果          |



#####  transition-timing-function的值

| 值                            | 描述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| linear                        | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
| ease                          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in                       | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
| ease-out                      | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
| ease-in-out                   | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |