---
title: 2022 JS新增特性
author: 轻雾
date: '2023-01-17'
---

# 2022 JS新增特性

## Promise部分

### 1. Promise.allSettled: ([Promise]) => Promise
当可迭代对象内的所有Promise都决议时返回一个Promise对象，并包含每个Promise结果的数组
对标 Promise.all()
### 2. Promise.any() => Promise.race()
当可迭代对象内的Promise中有一个Promise兑现则返回这个Promise的兑现值，否则返回一个拒绝的Promise，并包含所有失败值的数组
