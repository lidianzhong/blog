---
title: "189. 轮转数组"
published: 2025-04-23
lastmod: 2025-04-23
category: "算法"
tags: ["算法", "Leetcode"]
description: '给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。'
weight: 189
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

# 189. 轮换数组

题目：https://leetcode.cn/problems/rotate-array/



## 思路

### 方法一

使用原地转换的思路来实现，一直轮换，直到轮换 n 次。这里要注意若干个值轮换成环的问题。



### 方法二

三次反转

![lc189.png](189-rotate-array/1716207476-TyuIlk-lc189.png)



## 代码

### 方法一

```cpp
class Solution {
    private:
        int mod(int a, int b) {
            return (a % b + b) % b;
        }
    public:
        void rotate(vector<int>& nums, int k) {
            int n = nums.size();
            
            int start_i = 0, idx = 0, count = 0;
    
            // 从 start_i 开始
            while (count < n) { // 在进行 n 次交换后结束
                idx = start_i;
                int first = nums[idx];
    
                do {
                    nums[idx] = nums[mod(idx - k, n)]; // 轮转
                    idx = mod(idx - k, n);
                    count++;
                } while (idx != start_i);
    
                nums[mod(idx + k, n)] = first;
    
                start_i++;
            }
    
            return;
        }
    };
```



### 方法二

```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

    private void reverse(int[] nums, int i, int j) {
        while (i < j) {
            int temp = nums[i];
            nums[i++] = nums[j];
            nums[j--] = temp;
        }
    }
}
```

