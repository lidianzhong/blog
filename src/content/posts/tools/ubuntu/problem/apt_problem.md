---
title: "Ubuntu 中 apt 相关问题"
published: 2024-04-28T02:48:48+08:00
lastmod: 2024-04-28T02:48:48+08:00
keywords:
  -
categories: # 没有分类界面可以不填写
  -
tags: # 标签
  - "123"
  - Ubuntu
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

## 问题列表

> 1. W: GPG error: https://mirrors.tuna.tsinghua.edu.cn/ubuntu jammy-updates InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 871920D1991BC93C

解决方法：添加公钥

[解决清华源问题(GPG error:because the public key is not available)\CSDN 博客](https://blog.csdn.net/qq_41204553/article/details/123773944)

<br>

> 2. E: gnupg, gnupg2 and gnupg1 do not seem to be installed, but one of them is required for this operation

解决方法：安装 gnupg 库

```shell
sudo apt install gnupg
```

<br>

> 3. E: Error, pkgProblemResolver::Resolve generated breaks, this may be caused by held packages.

解决方法：修复破损包

```bash
apt --fix-broken install
```

```bash
apt-get install aptitude
sudo aptitude install <packagename>
```
