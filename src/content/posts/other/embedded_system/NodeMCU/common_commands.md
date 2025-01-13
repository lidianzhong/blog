---
title: "嵌入式常用命令汇总"
published: 2024-04-12T00:57:30+08:00
lastmod: 2024-04-12T00:57:30+08:00
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

## 嵌入式命令

查看已经安装的驱动：`sudo dmesg`

查看安装的串口设备：`ls -l /dev/ttyS*`

查看安装的 USB 转串口设备：`ls -l /dev/ttyS*`

查看系统日志关于串口设备的信息：`dmesg | grep ttyS`

查看 ttyS0 驱动的安装时间：`ls -l /dev/ttyS0`

### Windows 下查看端口命令

1. 通用方法，Win + X，选择设备管理器，查看 COM 端口，也可点击属性信息查看

2. PlatformIO Vscode 开发，点击小图标，然后输入命令：`pio device list`
