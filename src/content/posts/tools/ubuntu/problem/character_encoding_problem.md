---
title: "Ubuntu中字符编码相关问题"
published: 2024-04-23T01:13:21+08:00
lastmod: 2024-04-23T01:13:21+08:00
keywords:
  -
category: "工具"
tags: ["Ubuntu", "BUG"]
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

### 出现 `LF will be replaced by CRLF in ******`

解决方法：`git config core.autocrlf false`
