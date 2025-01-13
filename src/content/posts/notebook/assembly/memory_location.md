---
title: "内存访问"
published: 2024-04-15T19:14:13+08:00
lastmod: 2024-04-15T19:14:13+08:00
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

## 使用间接寻址访问内存中的指令

`[0]` 表示访问内存地址为 0 的位置，`[bx]` 表示访问内存地址为 `bx` 寄存器值的位置。

```assembly
;  从内存地址为 0x1000 的位置读取一个字节
mov bx, 0x1000 ; 将 0x1000 存入 bx 寄存器
mov al, [bx]   ; 从内存地址为 bx 的位置读取一个字节，存入 al 寄存器
```

## 使用 and 和 or 实现内存定位

`and` 指令：按位进行与运算，可以将相应位设为 0，其它位不变

`or` 指令：按位或运行，可以将相应位设为 1，其它位不变

```assembly
and al, 101111111B ;将al的第六位设为0
and al, 111111110B ;将al的第0位设为0

or al, 010000000B ; 将al的第六位设为1
```

## 实例：汇编中实现大小写转换

**解决大小写转换问题**：在汇编中不是考虑通过加减 20H 将大写转化为小写，或者小写转化为大写，而是采用大写第五位置 0，小写第五位置 1。比如 A 的二进制为 01000001，而小写 a 的二进制为 01100001。

**loop 函数如何实现**：`loop` 指令是一个循环指令，它首先减少 `CX` 寄存器中的值，然后检查 `CX` 是否为零。如果 `CX` 不为零，则跳转到标签 `s` 处执行循环内的指令。如果 `CX` 为零，则程序继续执行下一条指令。

```assembly
ASSUME CS:codesg, DS:datasg		; 指定段寄存器的默认段值

datasg SEGMENT
           db 'BaSiC'				  ; 存储字符串，使用 '.......' 表示字符串
           db 'iNfOrMaTiOn'
datasg ENDS

codesg SEGMENT
    START: mov  ax, datasg
           mov  ds, ax
           mov  bx, 0
           mov  cx, 5
    s:     mov  al, [bx]				; 循环 5 次，每次修改一个字母
           and  al, 11011111b			;  这一步，将字母变成大写
           mov  [bx], al
           inc  bx						; bx 寄存器中的值加一
           loop s

           mov  bx, 5
           mov  cx, 11
    s0:    mov  al, [bx]
           or   al, 00100000b			; 这一步，将字母变成小写
           mov  [bx], al
           inc  bx
           loop s0

           mov  ax, 4c00h
           int  21h

codesg ENDS
END START
```

## [bx + idata]

`[bx + idata]` 表明一个内存单元，它的偏移地址为 `(bx) + idata(bx 中的数值加上 idata)`。

比如，`mov ax,[bx + 200]`，数学描述为 `(ax) + ((ds) * 16 + (bx) + 200)`

这样，上面的大小写转换可以使用类似数组的方式实现

```assembly
ASSUME CS:codesg, DS:datasg

datasg SEGMENT
              db 'BaSiC'
              db 'iNfOrMaTiOn'
datasg ENDS

codesg SEGMENT
       START: mov  ax, datasg
              mov  ds, ax
              mov  bx, 0

              mov  cx, 5
       s:     mov  al, [bx]
              and  al, 11011111b
              mov  [bx], al
              mov  [5 + bx], al
              inc  bx
              loop s

              mov  ax, 4c00h
              int  21h

codesg ENDS
END START
```

## SI 和 DI

`bx`：在 x86 架构的汇编语言中，`BX` 寄存器通常用作地址寄存器，用于间接寻址。

`si（Source Index）寄存器`：通常用于指向源数据的内存地址。

`di（Destination Index）寄存器`：通常用于指向目标数据的内存地址。

在一些情况下，它们也可被用于通用的寄存器。

## [bx + si] 和 [bx + di]

基址加索引寻址：

1. `[bx + si]`：这种寻址方式表示的是以 `bx` 寄存器的值为基址，`si` 寄存器的值为偏移量的内存地址。例如，如果 `bx` 的值是 `0x1000`，`si` 的值是 `0x0040`，那么 `[bx + si]` 就表示的是内存地址 `0x1040`。
2. `[bx + di]`：这种寻址方式表示的是以 `bx` 寄存器的值为基址，`di` 寄存器的值为偏移量的内存地址。例如，如果 `bx` 的值是 `0x2000`，`di` 的值是 `0x0080`，那么 `[bx + di]` 就表示的是内存地址 `0x2080`。

## [bx + si + idata] 和 [bx + si + idata]

基址加索引加位移寻址:

1. `[bx + si + idata]`：这种寻址方式表示的是以 `bx` 寄存器的值为基址，`si` 寄存器的值为索引，`idata` 为一个立即数偏移量的内存地址。例如，如果 `bx` 的值是 `0x1000`，`si` 的值是 `0x0040`，`idata` 的值是 `0x0002`，那么 `[bx + si + idata]` 就表示的是内存地址 `0x1042`。
2. `[bx + di + idata]`：这种寻址方式表示的是以 `bx` 寄存器的值为基址，`di` 寄存器的值为索引，`idata` 为一个立即数偏移量的内存地址。例如，如果 `bx` 的值是 `0x2000`，`di` 的值是 `0x0080`，`idata` 的值是 `0x0004`，那么 `[bx + di + idata]` 就表示的是内存地址 `0x2084`。

## 案例：将 datasg 中每个字符改为大写字母

题目是这样的，将其中的字母都转为大写。

```assembly
datasg SEGMENT
           db 'ibm             '
           db 'dec             '
           db 'dos             '
           db 'vax             '
datasg ENDS
```

考虑到这类似于 C++ 中实现两层 for 循环遍历修改一样，考虑使用两层 loop 循环用汇编实现相似功能

```assembly
ASSUME CS:codesg DS:datasg

datasg SEGMENT
           db 'ibm             '
           db 'dec             '
           db 'dos             '
           db 'vax             '
datasg ENDS

codesg SEGMENT
    START: mov  ax, codesg
           mov  ds, ax
           mov  bx, 0

           mov  cx, 4            ; 外层循环，代表每一行，总共4行

    s0:    mov  si, 0
           mov  cx, 3            ; 内层循环，代表每一行的前三个字符

    s:     mov  al, [bx + si]
           and  al, 11011111b
           mov  [bx + si], al
           inc  si

           loop s                ; 内层循环结束

           add  bx, 16
           loop s0               ; 外层循环结束


codesg ENDS

END START
```

这里的问题出现在，内层和外层都使用的是 cx 寄存器计数（就相当于 C++ 中，你两层循环都用 i 来迭代，这个肯定不行）。由于汇编中 loop 函数只能用 cx 寄存器计数实现，解决方法是，在进入内部的一个循环时，先将 cx 的数值暂存起来，等到里面的循环结束了之后，再恢复，这个借用 dx 寄存器来实现暂存，于是代码变成了这样：

```assembly
ASSUME CS:codesg, DS:datasg

datasg SEGMENT
           db 'ibm             '
           db 'dec             '
           db 'dos             '
           db 'vax             '
datasg ENDS

codesg SEGMENT
    START: mov  ax, codesg
           mov  ds, ax
           mov  bx, 0

           mov  cx, 4

    s0:    mov  dx, cx           ; 使用 dx 寄存器暂存 cx 的值，用于后面的恢复
           mov  si, 0
           mov  cx, 3

    s:     mov  al, [bx + si]
           and  al, 11011111b
           mov  [bx + si], al
           inc  si

           loop s

           add  bx, 16
           mov  cs,dx            ; 恢复 cx 的值
           loop s0


codesg ENDS

END START
```

这里的问题又在于，不能想着暂存时，使用寄存器，因为寄存器的数量是有限的。这个时候，我们可以想到使用内存来实现，并且**在需要暂存数据的时候，我们都应该使用栈**。于是，程序可以做进一步的改进。

```assembly
ASSUME CS:codesg, DS:datasg, SS:stacksg

datasg SEGMENT
           db 'ibm             '
           db 'dec             '
           db 'dos             '
           db 'vax             '
datasg ENDS

stacksg SEGMENT
            dw 0, 0, 0, 0, 0, 0, 0, 0
stacksg ENDS

codesg SEGMENT
    START: mov  ax, stacksg
           mov  ss, ax
           mov  sp, 16

           mov  ax, codesg
           mov  ds, ax
           mov  bx, 0

           mov  cx, 4

    s0:    push cx               ; 将外层循环的计数器 cx 压栈
           mov  si, 0
           mov  cx, 3            ; cx 设置为内层循环的次数

    s:     mov  al, [bx + si]
           and  al, 11011111b
           mov  [bx + si], al
           inc  si

           loop s

           add  bx, 16
           pop  cx               ; 弹出外层循环的计数器 cx, 恢复 cx

           loop s0

           mov  ax, 4c00h
           int  21h
codesg ENDS

END START
```
