---
title: "Docker 安装 Nginx"
published: 2024-04-27T00:41:17+08:00
lastmod: 2024-04-27T00:41:17+08:00
keywords:
  -
categories: # 没有分类界面可以不填写
  -
tags: # 标签
  - "123"
  - Install
description: ""
weight:
draft: true # 是否为草稿
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

</br>

#### 大致流程

思路：先运行一个容器，得到生成的挂载文件，然后删除这个容器，再次创建一个新容器，使用这些挂载文件即可。

在过程中，需要注意文件的挂载关系，以下的外链需要稍作修改才可以（修改挂载映射部分）

</br>

#### 参考指南

[Windows 环境下 Docker Desktop 安装 Nginx_dockerdesktop 搭建 nigix-CSDN 博客](https://blog.csdn.net/weixin_45876462/article/details/128273148)

[Linux 环境下 Docker 安装 Nginx 容器 (完整详细版)\_docker nginx-CSDN 博客](https://blog.csdn.net/BThinker/article/details/123507820)
