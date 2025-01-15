---
title: "使用嵌入式设备 NodeMCU ESP8266 联网"
published: 2024-04-12T02:54:39+08:00
lastmod: 2024-04-12T02:54:39+08:00
category: "随笔"
tags: ["嵌入式", "BUG"]
description: "使用 NodeMCU ESP8266 的开发板，进行简单的 wifi 连接的工程实践"

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

## ESP8266

ESP8266 利用 WiFi 联网时有三种工作模式。

- **Station 模式**：工作在 Station 模式下的 ESP8266 就像是一个接收机一样，它可以接收来自无线路由器发出的信号。ESP8266 模块通过路由器连接互联网，手机或电脑通过互联网实现对设备的远程控制。

<!-- ![img](nodemcu/NodeMCU-Station.eef9f475.png) -->

- **SoftAP 模式**：无线接入点的简称，ESP8266 模块作为热点，实现手机或电脑直接与模块通信，实现局域网无线控制。

<!-- ![img](nodemcu/NodeMCU-Access-Point.cdc5a882.png) -->

- **Station + SoftAP 模式**：两种模式共存，既可以通过路由器连接到互联网，也可以作为 WiFi 热点，使其他设备连接到模块，实现广域网与局域网的无缝切换。


## 相关参考

构建过程：[基于 PlatformIO 平台玩转 NodeMCU 入门篇 | 匠心博客 (zhaomenghuan.js.org)](https://zhaomenghuan.js.org/blog/platformio-nodemcu-getting-started.html#前言)

## 在工程实践中遇到的问题

### 1. `command ‘platformio-ide.build‘ not found`

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
