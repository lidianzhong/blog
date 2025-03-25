---
title: "1.两数之和"
published: 2025-03-25
lastmod: 2025-03-25
category: "算法"
tags: ["算法", "Leetcode"]
description: ""

weight: 1
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



# 1. 两数之和

题目：https://leetcode.cn/problems/two-sum



## 解答：

### 方法一：暴力搜索

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n; i ++) {
            int x1 = nums[i]; 
            for (int j = i + 1; j < n; j ++) {
                int x2 = nums[j];
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {-1, -1};
    }
};
```



### 方法二：

思路：题目的意思可以等价为**查找 target - current是否在之前出现过**，进一步可以得**使用一个数据结构来保存已经出现过的数，而target - current 是否在这些保存过的数里边**，因为考虑到**在找到之后要知道之前那个数的下标**，所以**需要同时存储出现的数对应的下标**，由于题目保证有且仅有一个有效答案，所以在数组遍历完之前必然能够找到答案。数据结构选择**哈希表**，key存放出现过的数，value存放下标。

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            // if (target - nums[i]) not in map.keys(), add nums[i] to map
            auto it = map.find(target - nums[i]);
            if (it == map.end()) {
                map[nums[i]] = i;
            } else {
                return {i, it->second};
            }
        }
        return {-1, -1};
    }
};
```



官方题解：

链接：https://leetcode.cn/problems/two-sum/solutions/434597/liang-shu-zhi-he-by-leetcode-solution/

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hashtable;
        for (int i = 0; i < nums.size(); ++i) {
            auto it = hashtable.find(target - nums[i]);
            if (it != hashtable.end()) {
                return {it->second, i};
            }
            hashtable[nums[i]] = i;
        }
        return {};
    }
};
```

