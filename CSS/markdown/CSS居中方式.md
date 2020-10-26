- 行内元素垂直居中

  ```
   <div class="div1">行内元素垂直居中</div>
  .div1{
       background: tomato;
       width: 200px;
       height: 200px;
       line-height: 200px;
       margin-bottom: 50px;
  }
  ```

  

- 行内元素水平居中

  ```
  <!-- 行内元素水平居中 -->
  <div class="div2">行内元素水平居中</div>
  
  .div2 {
      background: tomato;
      height: 200px;
      width: 200px;
      text-align: center;
  }
  ```

  

- 块级元素水平居中

  ```
  <div class="div3">块级元素水平居中</div>
  
  .div3 {
     background: tomato;
     height: 200px;
     width: 200px;
     margin: 100px auto;
  }
  ```

- 水平垂直居中
  - 方法一 ： flex布局

  ```
  <div class="div4">
      <div class="child4">水平垂直居中</div>
  </div>
  
  .div4{
      display: flex;
      width: 200px;
      height: 200px;
      border: 1px solid tomato;
      align-items: center;
      justify-content: center;
  }
  .child4{
    width: 50px;
    height: 50px;
    background: tomato;
  }
  ```

  - 方法二:  position定位+transfrom

  ```
  <div class="div5">
     <div class="child5">水平垂直居中</div>
  </div>
  
  .div5{
     width: 200px;
     height: 200px;
     border: 1px solid tomato;
     margin: 0 auto;
     
     position: relative;
  }
  .child5{
     width: 100px;
     height: 100px;
     background: tomato;
     
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%);      
  }
  ```

  - 方法三: 父元素table-cell+子元素inline-block（不推荐）

  ```
  <div class="div6">
     <div class="child6">水平垂直居中3</div>
  </div>
  
  
  .div6{
    width: 200px;
    height: 200px;
    border: 1px solid tomato;
    margin: 0 auto;
  
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  
  }
  .child6{
     width: 100px;
     height: 100px;
     display: inline-block;
     background: tomato;
  }
  ```

  - grid布局

  



