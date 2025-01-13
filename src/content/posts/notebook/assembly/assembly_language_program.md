---
title: "汇编语言程序设计"
published: 2024-06-15
lastmod: 2024-06-15
keywords:
  -
categories: # 没有分类界面可以不填写
  -
tags: # 标签
  - "123"
description: ""
weight:

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

## 汇编语言代码到实际执行

程序员编写汇编程序，汇编程序由编译器编译得到机器码，机器码由计算机执行。

首先使用编辑器书写 源程序文件.asm；然后经过编译步骤，生成 目标文件.obj；再然后经过链接步骤，生成 可执行文件.exe

汇编语言程序代码由伪指令和汇编指令构成，伪指令是指没有对应机器码的指令，最终不被 CPU 所执行。那么谁来执行伪指令呢？伪指令是由编译器来执行的指令，编译器根据伪指令进行相关的编译工作。汇编指令，对应有机器码的指令，可以被编译为机器指令，最终被 CPU 执行。

```assembly
    assume CS:codesg
    codesg segment
        mov ax, 0123H
        add bx, 0456H
        add ax, bx
        add ax, ax

        mov ax, 4c00H
        int 21H
    codesg ends
    end
```

其中，

```assembly
    assume CS:codesg
    codesg segment
        ……
        ……
        ……
    codesg ends
    end
```

为伪指令

```assembly
	mov ax, 0123H
	add bx, 0456H
	add ax, bx
	add ax, ax

	mov ax, 4c00H
	int 21H
```

为汇编指令

```assembly
	mov ax, 4c00H
	int 21H
```

程序结束运行后，将 CPU 的控制权交还给运行它的程序，比如 DOS 系统

## 符号约定

数字——立即数

[] —— 对应的地址

() —— 寄存器或者内存单元中对应的值 （约定）

idata —— 立即数 （约定）

## Loop

CPU 是如何执行 loop 指令的过程的：

1. (cx) = (cx) - 1

2. 判断 cx 中的值

   不为零则转至标号处执行程序

   如果为零则向下执行

## 段前缀

段前缀产生的原因：在汇编程序中，如果书写，mov al, [0]，在编译连接之后，这里的[0]被识别为常数，这时候需要加上段前缀来表示，这个[0]是一个地址。

表示方法：mov al, ds:[0]
