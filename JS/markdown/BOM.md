#### BOM的概述

BOM的全称为浏览器对象模型。BOM提供了多种对象，用于访问浏览器的功能。



BOM的核心对象就是window。它表示浏览器的一个实例。它既是javaScript访问浏览器窗口的一个借口，又是ECMAScript规定的Global对象。 



#### 窗口位置

各个浏览器对window对象位置的属性和方法有很多，IE，Safari，Opera，Chrome都提供了screenLeft和screenTop属性，对应表示窗口相对于屏幕左边和上边的位置。Firefox则在screenX和screenY属性，所以在使用时需要判别

```js
let leftPos = typeof window.screenLeft === 'number' ? window.screenLeft : window.screenX

let topPos = typeof window.screenTop === 'number' ? window.screenTop : window.screenY
```

**注意** ： 无法在跨浏览器的条件下取得窗口左边和上边的精确坐标值。然而使用moveTo()与moveBy()方法倒可能将浏览器精确的移动到新位置。

- moveTo接收两个参数，对应着新位置的x,y的坐标值
- moveBy接收两个参数，对应着水平和垂直方向上移动的像素数。

**注意**：这两个方法可能会被浏览器禁用，而且Opera和IE7（及更高版本）中默认就是禁用的，另外两个方法只能对最外层window对象使用。



#### 窗口大小

确定窗口大小不是一件容易的事情，IE9+，firefox，Safari，Opera和Chrome均为此提供了4个属性：innerWidth，innerHeight,outerWidth和outerHeight。

- 在IE9+，Safari和firefox中outerWidth与outerHeight返回浏览器窗口本身大小

- 在Opera中outerWidth与outerHeight表示页面视图容器的大小，而innerWidth，innerHeight则表示该容器中页面视图区的大小（减去边框宽度）
- 在chrome中，outerWidth和outerHeight与innerWidth，innerHeight返回相同的值，即视口大小而非浏览器窗口大小



#### 视口大小

IE，firefox，Safari，Opera和Chrome中，**document.documentElement.clientWidth**与**document.documentElement.clientHeight**中保存了页面视口的信息。

IE6中必须在标准模式才有效，混杂模式下要通过**document.body.clientWidth**与**document.body.clientHeight**返回相同结果

chrome中在混杂模式下两者都可以取得相同的视口大小

```
// 取得视口大小
let pageWidth = window.innerWdith
let pageHeight = window.innerHeight

if(typeof pageWidth !== 'number'){
	if(dicument.compatMode == 'CSS1Compat') {// 检查页面是否处于标准模式
		pageWidth = document.documentElement.clientWidth
		ageHeight = document.documentElement.clientHeight
	}else {
		pageWidth = document.body.clientWidth
		ageHeight = document.body.clientHeight
	}
}
```



可以使用resizeTo()和resizeBy()方法调整浏览器窗口的大小。这两个方法接收两个参数，resizeTo接收浏览器窗口的新宽度和新高度，resizeBy接收新窗口与原窗口的宽度和高度的差。这两个方法也是被浏览器禁用



#### 导航与打开窗口

window.open()方法可以导航到一个URL也可以打开一个新的窗口。接收4个参数，URL,窗口目标，一个特性字符串，一个新页面是否取代浏览器历史记录总当前加载页面的布尔值，通常只需传第一个参数

```
window.open()
```



#### location对象

location对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。loacation对象是一个很特别的对象，它既是window对象的属性，也是document对象的属性

| 属性名    | 例子                  | 描述                                                 |
| --------- | --------------------- | ---------------------------------------------------- |
| hash      | “contents”            | 返回URL中的hash，如果URL中不包含散列，则返回空字符串 |
| host      | “www.xxx.com:80”      | 返回服务器名称与端口号                               |
| hostname  | “www.xxx.com”         | 返回不带端口号的服务器名称                           |
| href      | “http://www.xxxx.com” | 返回当前加载页面的完整URL                            |
| pathname  | “/xxxx/”              | 返回URL中的目录和文件名                              |
| port      | “8080”                | 返回URL指定的端口号                                  |
| protoocol | “http:”               | 返回页面使用的协议                                   |
| search    | “?id=xxxxx”           | 返回URL的查询字符串                                  |



