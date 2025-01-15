---
title: "什么是数字电路和EDA技术"
published: 2024-06-24
lastmod: 2024-06-24
category: "笔记"
tags: ["数字电路"]
description: "数字电路和EDA技术是指什么，EDA技术有什么用"

weight: 20
draft: false # 是否为草稿
comments: true # 本页面是否显示评论
reward: false # 打赏
mermaid: true #是否开启mermaid
showToc: true # 显示目录
TocOpen: true# 自动展开目录
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

### 数字技术

A\D 转换、数字逻辑处理、D\A 转换：将现实的信息转化为数字，即使用二进制进行保存；通过对数字逻辑进行一些处理（运算、加工、存储等）；再将数字信息还原为信息。



### 模拟信号与数字信号

**模拟信号**描述时间和数值上连续的物理量，比如正弦波方波、矩形波等；

**数字信号**用01来表示事物的对立两面。

![image-20240624222403702](overview/image-20240624222403702.png)



## EDA 技术

### 什么是EDA技术

EDA（Electronic Design Automation）

以计算机为工作平台，以EDA软件工具为开发环境，以FPGA器件或者ASIC专用集成电路为目标器件设计实现电路系统的一种技术。



在设计过程中，只需关注**硬件的行为和功能**，**其它均由计算机自动完成**。



### EDA 设计方法

自上而下的设计方法，将数字系统的整体逐步分解为各个子系统和模块



### EDA、PLD、HDL、FPGA、Verilog HDL

EDA是一种技术；EDA的实现载体：可编程逻辑器件（PLD）；描述方式：硬件描述语言（HDL）；FPGA是常用的PLD器件；Verilog PLD是硬件描述语言中的一种。



### 软件编译器和硬件综合器

生成的目标文件不同

![image-20240624231732141](overview/image-20240624231732141.png)



### EDA 设计的优势

把逻辑设计与具体电路的实现分成两个独立的阶段来操作；逻辑设计与实现的工艺无关，并且逻辑设计可以重复利用；当写好HDL文本之后后，通过**综合**生成低层的便于可编程器件实现的电路网表文件。

![image-20240624224703647](overview/image-20240624224703647.png)

