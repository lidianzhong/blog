---
title: '《四足机器人控制算法》阅读笔记——四足机器人关节电机'
published: 2024-04-01T01:09:33+08:00
draft: false
tags: ["阅读笔记", "四足机器人"]
category: "四足机器人"
---

> 后续开发的算法，最终结果都是生成发送给这12个关节电机的命令


## 四足机器人的动力系统


### 1. 永磁同步电机（PMSM）

通过控制定子上三个线圈的电流，可以控制电机的力矩和角度。这种控制方法叫做**矢量控制（FOC）**。

### 2. 关节电机的混合控制

关节电机的内部，已经封装了电机底层的控制算法。作为用户，只要给关节电机发送相关的命令，电机就能完成从接收命令到关节力矩输出的工作。

控制指令有五个：前馈力矩、期望角度位置、期望角速度、位置刚度、速度刚度（阻尼）

### 3. 关节电机的命令下发

通过 RS485 接口进行通信，用上位机控制需要使用 USB 转 RS485 转接器。

### 4. 使用Python代码控制电机

指定七个参数，分别为`id`、`mode`和前面说的5个控制指令（T、W、Pos、K_P、K_W），作为结构体数据。结构体数据先要依据通信协议将数据编码为电机能够接收的格式，然后就能给电机发送命令。电机返回的数据也要通过解码再进行下一步的数据处理。

电机只有在接收到命令时才会返回当前自身状态，所以如果只是让电机持续运转，那么不需要持续发同一条命令，为了时刻检测电机状态，才需要持续发送命令。

用结构体中的mode参数来控制电机的控制模式。

**位置模式**：电机的输出轴稳定在一个固定的位置；

**速度模式**：电机稳定在一个固定的速度，

**阻尼模式**：在被外力旋转时，会产生一个抗阻力矩。方向与旋转方向相反，大小与旋转速度成正比；力矩模式，电机输出一个恒定力矩；

**零力矩模式**：保持力矩为0，转动输出轴的阻力会明显小于未开机时的阻力；

**混合模式（最常用）**：发送前馈力矩、目标角度、目标角速度混合控制。

### 5. 移植到其他上位机

根据电机发送的报文格式，通过 `RS-485` 协议标准，进行串口通信
