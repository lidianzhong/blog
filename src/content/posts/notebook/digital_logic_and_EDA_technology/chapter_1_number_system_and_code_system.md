---
title: "不同进制之间的转换、编码方式"
published: 2024-06-24
lastmod: 2024-06-24
category: "笔记"
tags: ["数字电路"]
description: "不同的进制之间是如何转换的，以及对于比特进行不同方式的编码"

weight: 20
draft: false # 是否为草稿
comments: true # 本页面是否显示评论
reward: false # 打赏
mermaid: true #是否开启mermaid
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: false #顶部显示路径
cover:
  image: "" #图片路径例如：posts/tech/123/123.png
  zoom: # 图片大小，例如填写 50% 表示原图像的一半大小
  caption: "" #图片底部描述
  alt: ""
  relative: false
---

### 数制和码制

数码中每一位的构成方法和低位到高位的进位规则称为**数制**，比如十进制，二进制，八进制，十六进制

一些常见的十进制编码有：8421码、余3码、2421码等



## 不同进制之间的转换

### 二进制转十进制

个位是2的0次方，以此类推

![image-20240624233615415](chapter_I_number_system_and_code_system/image-20240624233615415.png)

### 十进制转二进制

整数部分：模2取余法

小数部分：乘2取进位

![image-20240624233814431](chapter_I_number_system_and_code_system/image-20240624233814431.png)

![image-20240624233914735](chapter_I_number_system_and_code_system/image-20240624233914735.png)

### 二进制与十六进制相互转换

![image-20240624234102673](chapter_I_number_system_and_code_system/image-20240624234102673.png)

### 八进制与二进制的相互转换

![image-20240624234237855](chapter_I_number_system_and_code_system/image-20240624234237855.png)

### 十六进制与十进制的相互转换

十六进制转十进制：乘以 16 的某某次方

十进制转十六进制：通过二进制转化



## 原、反、补码的计算

反码：数值位逐位求反

补码：正数的补码和原码相同；负数的补码等于数值位逐位求反（反码） + 1



补码计算出来的最高位就是符号位



## 几种常用的编码

### 十进制代码

![image-20240624235630448](chapter_I_number_system_and_code_system/image-20240624235630448.png)

### 格雷码

相邻代码只有一位改变状态，减少过渡噪声

![image-20240624235814186](chapter_I_number_system_and_code_system/image-20240624235814186.png)

