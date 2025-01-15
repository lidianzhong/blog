---
title: "关于 docker 的命令总结"
published: 2024-04-22T01:06:08+08:00
lastmod: 2024-04-22T01:06:08+08:00
category: "工具"
tags: ["Docker", "命令"]
description: "汇总使用 docker 时遇到的命令，并总结记录下来"

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
  caption: "" 
  alt: ""
  relative: false
---

<br>

#### 更新 apt 源
（这里使用的是 ubuntu 22.04 的源）
```bash
sudo rm /etc/apt/sources.list.d/*
```

```bash
echo "# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
# deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse" > /etc/apt/sources.list 
```

```bash
 sudo apt update && sudo apt install vim wget unzip
```


<br>

#### 开启 ssh 远程连接和 X11

启动 SSH 服务：

```bash
/etc/init.d/ssh start
```

查看端口命令：

```bash
sudo apt install net-tools
netstat -tuln | grep :22
```



[docker 容器如何开启 ssh 远程连接和 X11_x11-forwarding : (disabled or not supported by s-CSDN博客](https://blog.csdn.net/abc13068938939/article/details/116654533)


<br>

#### docker 指定 GPU 进行开启

```bash
--gpus='"device=3,4"'
```

[docker指定使用某几张显卡/某几个GPU_docker run --gpus 指定-CSDN博客](https://blog.csdn.net/qq_21768483/article/details/115204043)
