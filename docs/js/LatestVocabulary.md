---
title: 2022 JS新增特性
author: 轻雾
date: '2023-01-17'
---

# 2022 JS新增特性

## Promise部分
### 1. Promise.allSettled()
当可迭代对象内的所有Promise都敲定时返回一个Promise对象，并**包含每个Promise结果的数组**
对标 Promise.all()，但是Promise.all()只有在所有Promise都兑现时才会返回兑现的Promise对象，如果出现拒绝则返回第一个拒绝的Promise。
> 如果需要多个接口同时调用，且不希望其中某个接口报错或者超时的情况下影响其他接口，推荐使用Promise.allSettled()
### 2. Promise.any()
当可迭代对象内的Promise中有一个Promise兑现则返回这个Promise的兑现值，否则返回一个拒绝的Promise，并包含所有失败值的数组
对标 Promise.race()，但是Promise.race()只要有一个Promise被敲定，**无论是兑现还是拒绝**，都会返回这个已敲定的Promise。

```javascript
const promise1 = Promise.resolve('1');
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('2'), 100);
});
const promise3 = Promise.reject('3');
const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('4'), 200);
});

// Promise.allSettled()与Promise.all()进行比较
Promise.allSettled([promise1, promise2, promise3]).then(result => {
  console.log(result);
});
Promise.all([promise1, promise2, promise3]).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

// Promise.any()与Promise.race()进行比较
Promise.any([promise4, promise3, promise2, promise1]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
Promise.race([promise4, promise3, promise2, promsie1]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

## String部分
### String.prototype.replaceAll()
替换原字符串中**所有**满足pattern的部分，并且返回**新的字符串**  
String.prototype.replace()只是替换原字符串中**第一个**满足pattern的部分

```javascript
const str = 'good good study, day day up';
console.log(str.replaceAll('good', 'much'));
console.log(str.replace('good', 'much'));
```

## 新函数
### import()
新版import有静态导入和动态导入两种用法  
> 标准用法就是静态导入，在文件的开头提前声明外部文件进行导入
>* 好处：方便维护管理
>* 缺点：导入时就会直接进行编译，无法实现按需编译，当地首页加载速度

动态导入支持使用import()对模块进行按需编译运行，返回一个Promise对象，包含模块内的导出内容，支持使用await语法  
当然凡事有利就有弊，动态导入的缺点也很明显，无法进行静态分析依赖和**tree shaking**发挥作用
#### 什么时候使用“动态导入”呢？
>* 当静态导入的模块明显降低了代码的加载速度，且不需要立刻使用这个模块；(比如异步任务多且耗时久，但并不需要立刻使用的模块)
>* 当静态导入的模块占用大量内存，且使用频率不高；（比如代码量大，但只有某几个特殊场景才会用到的模块）
>* 当被导入的模块中有部分代码需要在特定场景调用；（比如模块中的某些代码一开始就编译运行会有问题，只能在前置条件成立后才调用运行）

```javascript
// 假设要动态引入的模块路径为 /demo/myModule.js
import('../../package.json').then(module => {
  console.log(module);
}).catch(() => {
  console.log('模块加载失败');
});
```
