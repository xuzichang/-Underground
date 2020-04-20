# 东方Underground
主要类型为包含躲避和射击元素的H5弹幕游戏。参考游戏《东方project》。多媒体课程设计。
## 最终实现效果如下
<img src="https://github.com/xuzichang/TouhouUnderground/blob/master/ImgForReadme/final01.png" width="750"/>
<img src="https://github.com/xuzichang/TouhouUnderground/blob/master/ImgForReadme/final02.png" width="750"/>
<img src="https://github.com/xuzichang/TouhouUnderground/blob/master/ImgForReadme/final03.png" width="750"/>
<img src="https://github.com/xuzichang/TouhouUnderground/blob/master/ImgForReadme/final04.png" width="750"/>

## 对各个场景的简单描述
总体框架：游戏界面分为左右两个部分，左边为游戏主界面，右边是生命值数据界面。生命值数据根据角色能够动态变化。
场景一：通过上下键可以在三个难度中选择，Enter键进入对应第二个场景。（见图1.1）。
场景二：小型敌人根据类型不同发射出不同的子弹类型。
		小型敌人塑料袋的子弹类型是圆环。（见图1.2.1）
		小型敌人易拉罐的子弹类型是自狙击，跟踪角色的位置。(见图1.2.2)
		小型敌人饮料瓶的子弹类型是旋转的弧，放射速度快且密集。（见图1.2.3）
场景三：游戏最终大BOSS拥有三种形态。
		形态一是旋转弧。（见图1.3.1）
		形态二是花瓣形状。（见图1.3.2）
		形态三是花瓣形状和旋转激光的组合。（见图1.3.3）
## 设计思路 
代码主要功能可分为：主调用的文件的Game。提供对象方法的Player、Enemy、Boss、Bullet。
### 1. 主文件Game中，主要有三个模块。
> * 动画函数调用的mainLoop函数。
> * 更新右侧面板的UpdatePane函数。
> * 键盘事件
### 2. 提供对象方法的文件中，主要是对应的Update方法。
> * Player的Update
不断更新角色的坐标x,y值。并且控制x,y可移动范围。返回x,y的值。
> * Enemy的Update
调用子弹绘制函数（传入的angle是关键）；判定敌人死亡函数。
> * Boss的Update
通过f控制调用三次子弹绘制函数（传入的angle是关键）。
> * Bullet的Update
根据传入的angle计算出坐标；判定角色生命值 -1的函数。
