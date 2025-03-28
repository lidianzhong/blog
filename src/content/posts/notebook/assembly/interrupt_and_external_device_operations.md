---
title: "8086中的中断及外部设备操作"
published: 2024-04-15
description: ""
image: ''
category: "笔记"
tags: ["汇编"]
draft: false # 是否为草稿
lang: ''


weight:
lastmod: 2024-04-15
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



## 直接定址表

直接定址表有数据的直接定址表和代码的直接定址表。数据的直接定制表相当于哈希表的操作，通过对对应位置的访问获得预先存放的数据。代码的直接定址表是在对应的位置访问存放代码段的首地址。

## 中断

CPU 不再接着向下执行，而是转去处理中断信息。中断有内中断和外中断，内中断指由 CPU 内部发生的事件而引起的中断，外中断指由外部设备发生的事件引起的中断。

CPU 内部产生的中断信息，比如除法错误，单步执行，执行 into 指令，执行 int 指令

CPU 收到中断请求时，会处理根据位置到中断向量表中找到对应中断程序的起始地址，开始执行。8086 CPU 的中断向量表，一共有 1024 个字节，包含 256 个中断程序的地址，每个中断的入口地址占用 4 个字节，分别存储 CS 和 IP。

每个中断中，中断类型码 N 和 CS、IP 的值有对应关系的，(IP) = (N _ 4), (CS) = (N _ 4 + 2)，N 为中断类型码

中断过程由 CPU 的硬件自动完成，8086 CPU 的终端过程如下：

1. 取得中断类型码 N
2. pushf
3. TF = 0， IF = 0
4. push CS
5. push IP
6. (IP) = (N _ 4)，(CS) = (N _ 4 + 2)

## 端口

CPU 可以直接读写的 3 个地方的数据

1. CPU 内部的寄存器
2. 内存单元
3. 端口

## CMOS RAM 芯片

这个芯片包含一个实时钟和一个有 128 个存储单元的 RAM 存储器。这个芯片的作用是存储内部一个实时钟、系统的配置信息、相关的程序（用于开机时配置系统信息）。

CMOS RAM 芯片内部有两个端口，端口地址为 70h 和 71h，70h 为地址端口，存放要访问的 CMOS RAM 单元的地址；71h 为数据端口，存放从选定的单元中读取的数据，或要写入到其中的数据。



## 外中断处理过程

外中断分为：可屏蔽中断和不可屏蔽中断。

可屏蔽中断是 CPU 可以不响应的外中断，根据标志寄存器中的 IF 位的设置，如果 IF = 1，那么 CPU 在执行完当前指令后相应中断，引发中断过程；如果 IF = 0，那么不响应可屏蔽中断。（8086 CPU 设置 IF 的指令：sti 用于设置 IF = 1；cli 用于设置 IF = 0）

不可屏蔽中断是 CPU 必须相应的外中断，当 CPU 检测到不可屏蔽中断信息时，在执行完当前指令后，立即响应，引发中断过程。8086 CPU 不可屏蔽中断的中断类型码固定为 2。
