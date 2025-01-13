---
title: "NodeMCU 编程遇到的问题"
published: 2024-04-12T02:12:40+08:00
lastmod: 2024-04-12T02:12:40+08:00
keywords:
  -
categories: # 没有分类界面可以不填写
  -
tags: # 标签
  - "123"
  - BUG
description: ""
weight:

draft: false # 是否为草稿
comments: true # 本页面是否显示评论
reward: false # 打赏
mermaid: true #是否开启mermaid
showToc: true # 显示目录
TocOpen: false # 自动展开目录
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

### 1. command ‘platformio-ide.build‘ not found

解决：关闭 Vscode 再打开就好了~

### 2. PlatformIO 串口显示乱码

解决：串口监视器和单片机波特率不一致

```ini
[env:nodemcuv2]
platform = espressif8266
board = nodemcuv2
framework = esp8266-rtos-sdk
monitor_speed = 74880 ; 监视器波特率设置
monitor_port = COM3 ; 监视器端口设置，设置为连接的串口端口
```

### 3. PlatformIO 串口显示开头乱码

原因：很有可能是因为你之前烧写的程序没关，或是因为芯片自身不稳定，但只要它可以显示出你想显示的就可以。
