---
title: "49.字母异位词分组"
published: 2025-03-27
lastmod: 2025-03-27
category: "算法"
tags: ["算法", "Leetcode"]
description: "给你一个字符串数组，请你将"字母异位词""组合在一起。可以按任意顺序返回结果列表。"

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

# 49. 字母异位词分组

题目：https://leetcode.cn/problems/group-anagrams



## 解答

### 方法一：先排序后归类

思路：先将每个字母进行排序，方便后续的遍历。接下来的步骤就是如何将一样的字符串放在一起了。可以利用map的key，自动将相同内容归到一起。

代码：

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // sort
        vector<string> sorted_strs(strs);
        for (int i = 0; i < sorted_strs.size(); ++i) {
            std::sort(sorted_strs[i].begin(), sorted_strs[i].end());
        }

        // mapping
        unordered_map<string, vector<string>> hash_table;
        for (int i = 0; i < sorted_strs.size(); ++i) {
            hash_table[sorted_strs[i]].push_back(strs[i]); // <"aet", <"eat", "aet">>
        }

        // output
        vector<vector<string>> result;
        for (const auto& [_, value] : hash_table) {
            result.push_back(value);
        }
        
        return result;
    }
};
```

