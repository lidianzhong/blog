---
title: '《四足机器人控制算法》阅读笔记——机器人仿真与控制框架'
published: 2024-04-02
draft: false
weight: 30
tags: ["阅读笔记", "四足机器人"]
category: "四足机器人"
---

## ROS与Gazebo

ROS 中将每一个进程视作一个节点（Node），节点之间的通信方式依靠：话题（Topic）、服务（Service）、参数（Parameter）。

控制器（Controller）与仿真（Gazebo）就是两个节点，利用 `topic`通信。

过程是：控制器从Gazebo读取机器人各个关节角度、角速度、IMU等数值，然后计算出控制量，如目标力矩、目标关节角度等发送给Gazebo。



## 面向对象设计

面向对象的程序设计的三大特性为：封装、继承、多态。

想象以下的场景：有一个控制器，想要它既可以与仿真环境Gazebo交互，也可以和实际的机器人交互。如何实现？

**封装**：将控制器与ROS交互接口的收发功能进行封装，用类中的一个方法加以实现。

**继承**：针对仿真模型和真实机器人的两个接口类，IOROS类和IOSDK类。它们用不同的方法完成同一个任务，即收发数据。因此他们有相同的共性，我们可以将这个共性提取到IOInterface类，都用到的函数设定为纯虚函数。

**多态**：现在有了两个接口，通过将父类（IOInterface）的指针赋值为IOROS或IOSDK指针的值，可以方便地完成控制器在仿真平台到真实机器人的切换。



## 有限状态机

有限状态机不是一个真实的硬件，而是抽象的概念。利用有限状态机可以实现控制器中对各个状态的切换。比如从阻尼模式切换到站立模式。

有限状态机有五种状态（阻尼模式、固定站立、自由站立等），两种任务。任务一是重复当前运行状态（即重复执行当前状态的`run`函数），任务二是切换状态。



## 实现：让机器人站起来

### 机器人的关节控制

前面说了如何发送命令给单个电机，以控制电机或读取状态，现在考虑给机器人的12个电机发送电机命令和接收状态。

相关的类是 `FSMState.h`，它是有限状态机四个状态的基类，每个状态继承了下面变量：

``` c++
CtrlComponents *_ctrlComp;	// 包含大多数控制所需的类与状态变量
LowlevelCmd *_lowCmd;	    // 发送给各个电机的命令
LowlevelState *_lowState;	   // 从各个电机接收的状态
```

四足机器人有四条腿，同时每个腿有三个关节。关节顺序是这样定义的：

- 每一条腿，自上而下的三个关节为机身关节、大腿关节、小腿关节，顺序分别为 0、1、2。
- 四条腿，按照右前腿、左前腿、右后腿、左右腿的顺序排列。

``` text
0:0 号腿 0 号关节，即右前腿机身关节
1:0 号腿 1 号关节，即右前腿大腿关节
2:0 号腿 2 号关节，即右前腿小腿关节
3:1 号腿 0 号关节，即左前腿机身关节
4:1 号腿 1 号关节，即左前腿大腿关节
5:1 号腿 2 号关节，即左前腿小腿关节
6:2 号腿 0 号关节，即右后腿机身关节
7:2 号腿 1 号关节，即右后腿大腿关节
8:2 号腿 2 号关节，即右后腿小腿关节
9:3 号腿 0 号关节，即左后腿机身关节
10:3 号腿 1 号关节，即左后腿大腿关节
11:3 号腿 2 号关节，即左后腿小腿关节
```



### 机器人的阻尼模式

出于安全考虑，一般机器人在开机时默认进入阻尼模式（Passive）。

阻尼模式的代码`src/FSM/State_Passive.cpp`：

``` c
void State_Passive::enter(){
    if(_ctrlComp->ctrlPlatform == CtrlPlatform::GAZEBO){
        for(int i=0; i<12; i++){
            _lowCmd->motorCmd[i].mode = 10;
            _lowCmd->motorCmd[i].q = 0;
            _lowCmd->motorCmd[i].dq = 0;
            _lowCmd->motorCmd[i].Kp = 0;
            _lowCmd->motorCmd[i].Kd = 8;
            _lowCmd->motorCmd[i].tau = 0;
        }
    }
    else if(_ctrlComp->ctrlPlatform == CtrlPlatform::REALROBOT){
        for(int i=0; i<12; i++){
		......
        }
    }

    _ctrlComp->setAllSwing();
}

void State_Passive::run(){
    
}

void State_Passive::exit(){

}
```

可以看到，代码对在仿真平台和真实机器人进行了不同的设定。各个参数的设置放置在了 函数`enter`中，意味着只有在有限状态机进入阻尼模式时，LowLevelCmd 才修改一次。而 `run` 和 `exit` 均为空函数，说明不进行其它操作。但是有限状态机在运行时会不停地发送LowLevelCmd给电机，所以机器人会持续收到阻尼模式的命令。

在有限状态机中，添加了自动保护功能。`checkSafty` 函数进行了机身姿态的判断。当`checkSafty` 返回 false 时，会让机器人的所有关节进入阻尼模式。



### 机器人各个关节的坐标系与零角度点

> 机器人的每个关节需要一个坐标系和零角度点来确定位置和角度

机器人上所有的坐标系都是右手系，且互相平行。坐标系的 x 轴朝向机器人的前方，y 轴朝向机器人的左侧，z 轴竖直向上。

机身关节的旋转轴为 x 轴，大腿关节和小腿关节为 y 轴，旋转正方向符合右手定则，使用弧度制。

这样就可以用数值来表示一个特定的关节状态了。比如机器人站立的状态就可以表示为：

``` tex
机身关节：0.00
大腿关节：0.67
小腿关节：-1.30
```

于是我们就可以在代码中设定目标关节角度：

``` cpp
float_targetPos[12] = {0.0, 0.67, -1.3, 0.0, 0.67, -1.3, 0.0, 0.67, -1.3, 0.0, 0.67, -1.3};
```



### 机器人的固定站立模式

> 知道了机器人的目标角度，如何实现机器人的固定站立呢？

对函数 `enter`、`run`、`exit`进行考虑：

在 `enter` 函数中，首先将每个关节的期望值设定好，然后再更新最初姿态的变量

``` cpp
void State_FixedStand::enter(){
    for(int i=0; i<4; i++){
        if(_ctrlComp->ctrlPlatform == CtrlPlatform::GAZEBO){
            _lowCmd->setSimStanceGain(i);	// 设置关节期望值
        }
        else if(_ctrlComp->ctrlPlatform == CtrlPlatform::REALROBOT){
            _lowCmd->setRealStanceGain(i);
        }
        _lowCmd->setZeroDq(i);	// 设置关节期望值
        _lowCmd->setZeroTau(i);	// 设置关节期望值
    }
    for(int i=0; i<12; i++){
        _lowCmd->motorCmd[i].q = _lowState->motorState[i].q;
        _startPos[i] = _lowState->motorState[i].q;	// 设定初始姿态
    }
    _ctrlComp->setAllStance();
}
```

在 `run` 函数中，使用线性插值来完成从最初状态到目标姿态的过渡，每运行一次越靠近目标姿态

``` cpp
void State_FixedStand::run(){
    _percent += (float)1/_duration;
    _percent = _percent > 1 ? 1 : _percent;
    for(int j=0; j<12; j++){
        _lowCmd->motorCmd[j].q = (1 - _percent)*_startPos[j] + _percent*_targetPos[j]; 
    }
}
```

在 `exit` 函数中，将 `_percent` 设置为 0，这样再次切换到站立模式，才能正常运行。
