#### 2D转换

**1. transfrom:translate(x,y)**，**transfrom:translateX(x)**，**transfrom:translateY(y)**

translate是沿着X和Y轴移动，translateX与translateY是分贝沿着X与Y移动。

```
.box{
   width: 100px;
   height: 100px;
   background: tomato;
   transform: translate(100px,100px);
}
```



**2.transfrom:rotate(0deg)**

rotate()方法，在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转。	

```
.box{
   width: 100px;
   height: 100px;
   background: tomato;
   transform: rotate(180deg);
}
```



**3.transform:scale(x,y)**

scale()方法，该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数：

```
.box{
   width: 100px;
   height: 100px;
   background: tomato;
   transform: scale(1,1);
}
```



**transform:skew()**

skew()包含两个参数，分别表示X轴的倾斜角度，如果第二个参数为空，则默认为0，参数为负表示向反方向倾斜。

```
.box{
   width: 100px;
   height: 100px;
   background: tomato;
   transform: skew(90deg)
}
```



**transform:matrix()**

matrix()有六个参数,代表一个矩阵，旋转，缩放，移动，移动(平移)和倾斜功能

```

```



### 3D转换

![img](http://images2015.cnblogs.com/blog/740839/201604/740839-20160404190248937-1489051755.png)

**1.transform-origin: x-axis y-axis z-axis**

属性允许更改转换元素的位置，2D转换元素可以改变元素的X和Y轴。 3D转换元素，还可以更改元素的Z轴。

- x-axis的值为 ：left，center，right，length，%
- y-axis的值为 ：left，center，right，length，%
- z-axis的值为 ：length



**2. transform-style: flat|preserve-3d**

属性指定嵌套元素是怎样在三维空间中呈现

元素值：

| 值          | 描述                           |
| ----------- | ------------------------------ |
| flat        | 表示所有子元素在2D平面呈现     |
| preserve-3d | 表示所有子元素在3D空间中呈现。 |



**3.perspective：number**

多少像素的3D元素是从视图的perspective属性定义。这个属性允许你改变3D元素是怎样查看透视图。

定义时的perspective属性，它是一个元素的子元素，透视图，而不是元素本身。

**注意：**perspective 属性只影响 3D 转换元素。

**提示:** 请与 [perspective-origin](https://www.runoob.com/cssref/css3-pr-perspective-origin.html) 属性一同使用该属性，这样您就能够改变 3D 元素的底部位置。



**4.perspective-origin**

perspective-origin 属性定义 3D 元素所基于的 X 轴和 Y 轴。该属性允许您改变 3D 元素的底部位置。

定义时的perspective -Origin属性，它是一个元素的子元素，透视图，而不是元素本身。

**语法：perspective-origin: *x-axis y-axis*;**

| 值       |                    描述                     |
| :------- | :-----------------------------------------: |
| *x-axis* | 1. left 2. center 3. right 4. length 5. *%* |
| *y-axis* | 1. left 2. center 3. right 4. length 5. *%* |



**5.backface-visibility**

backface-visibility 属性定义当元素背面向屏幕时是否可见。

如果在旋转元素不希望看到其背面时，该属性很有用。

**语法**

| 值      | 描述             |
| :------ | :--------------- |
| visible | 背面是可见的。   |
| hidden  | 背面是不可见的。 |



**6. rotate3D，scale3d，translate3d**

```css
transform: translate3d(x, y, z)
rotate3d(x, y, z, a)
scale3d(x, y, z, a)
```

*x*

number 类型，可以是0到1之间的数值，表示旋转轴X坐标方向的矢量。

y

number 类型，可以是0到1之间的数值，表示旋转轴y坐标方向的矢量。

*y*

[``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number) 类型， 可以是0到1之间的数值，表示旋转轴Y坐标方向的矢量。

*z*

number 类型， 可以是0到1之间的数值，表示旋转轴Z坐标方向的矢量。

*a*

angle类型，表示旋转角度。正的角度值表示顺时针旋转，负值表示逆时针旋转。