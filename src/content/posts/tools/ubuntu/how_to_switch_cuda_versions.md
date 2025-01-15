---
title: "如何切换 CUDA 的版本"
published: 2024-04-19T16:56:28+08:00
lastmod: 2024-04-19T16:56:28+08:00
keywords: 
- 
category: "工具"
tags: ["GPU", "Ubuntu"]
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


使用 `nvidia-smi` 命令显示的 cuda 版本表示支持最高的版本，并不是当前 cuda 的版本。

查看当前 cuda 版本的命令是使用 `nvcc -V` 命令，显示的 cuda 版本。

cuda 版本支持切换，主要是根据 PATH 中的指向来确定的

切换 cuda 版本的命令如下

``` shell
# <version> 须切换的CUDA版本号
export PATH=/usr/local/cuda-<version>/bin${PATH:+:${PATH}} 
export LD_LIBRARY_PATH=/usr/local/cuda-<version>/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```

[[解決方案\] conda 虚拟环境中 cuda不同版本進行切換（含Linux 和 Windows）_修改cuda版本-CSDN博客](https://blog.csdn.net/weixin_43305485/article/details/130413708)

[CUDA的正确安装/升级/重装/使用方式 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/520536351)

[ubuntu下安装多版本cuda及版本切换教程_ubuntu切换cuda版本-CSDN博客](https://blog.csdn.net/weixin_44120025/article/details/121002696)

