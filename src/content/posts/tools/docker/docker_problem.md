---
title: "Docker_problem"
published: 2024-04-28T03:40:16+08:00
lastmod: 2024-04-28T03:40:16+08:00
keywords: 
- 
categories: # 没有分类界面可以不填写
- 
tags: # 标签
- "123"
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

## 常见问题

> denied: requested access to the resource is denied

解决：镜像的名称和账户的名称没有对应上

1. 登录 Hub 账户

```bash
 docker login
```

![image-20240428034510419](docker_problem/image-20240428034510419.png)

2. 更改好镜像的名字

``` bash
docker tag old-repo/my-image:1.0 new-repo/my-image:1.0
```

![image-20240428035309302](docker_problem/image-20240428035309302.png)

参考：[解决docker：denied: requested access to the resource is denied_docker login': denied:-CSDN博客](https://blog.csdn.net/fengpengfei_yes/article/details/113838579)



> nginx 一直跳转 welcome to nginx

[nginx配置不生效，页面一直是默认页面welcome to nginx的解决办法_welcome to nginx怎么解决-CSDN博客](https://blog.csdn.net/pcf1995/article/details/80973600)



> 拉取时太慢

[配置 docker 加速服务-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/929177)
