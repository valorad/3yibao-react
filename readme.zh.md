# 3yibao-react
A screen-saver for teasing 3yibao, re-written in React
三怡宝的日常放松专属屏保

[English](./readme.md)

![demo](https://i.imgur.com/Vv8xw8g.gif)

原图: https://i.imgur.com/Vv8xw8g.gif (如果 Github 说图太大拒绝显示)

三怡宝(3yibao, Troisième C'est bon) 由 [Create React App](https://github.com/facebook/create-react-app) v3 生成

## 简单介绍

此网站是为三怡宝设置的专属屏保。网站中各种图表标示用来显示三怡宝今天的日常属性，比如：活力等级，负能量点数，中奖概率以及减肥成功率等。这些属性其实是由不同的算法“预测”生成并展示出来的。在生成网站之前，你可以对这些属性进行增减，或者修改其中的算法参数，来达到不同的效果。

3yibao-react的前端是普通react，而现在的后台用的框架是echo，基于goLang的。

目前网站首页包括大招牌、仪表盘、控制台和通知系统几大部分组成

### 怡宝属性

3yibao会每隔段时间计算一次怡宝属性，并且将计算结果以图表的形式展示出来。

怡宝属性分为两大类，一个是经验值类，这类属性有等级的具体阈值，以及等级阈值排列顺序。比如等级按升序排列，那么超过上界就升级了，低于下界就降级了。降序的排列与之相反。而另一个是概率类，概率类没有等级，只有一个最大值 100 % 和最小值 0 % 。

在生成网站之前，你要提供怡宝属性的名字、算法参数。对于经验值类，你还需要设定等级阈值及其排列顺序。

目前，经验类用的是[随机游走](https://en.wikipedia.org/wiki/Random_walk)模型，涉及到用极坐标形式的[Box–Muller transform](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform)生成一个高斯随机数，而概率类的模型就只是生成JavaScript随机数。我们所设置的参数，一个是幅度，一个是偏移量，都只是对模型进行线性变换。如果后面更新的话希望增加个自己设置算法的功能。

### 大招牌
![billboard](https://i.imgur.com/t8uOFjz.png)

你看到1怡宝，2怡宝...9怡宝，这些“三怡宝”的别称是由首页随机生成的。网站其他部分会一直用这个值去描述发生的事件。

上方的大招牌会一直显示现在是“几怡宝”。周围的灯会一直转圈亮（这个是脚本控制的），而"恭喜N怡宝"会不断左右滚动播放。

### 仪表盘

![dashboard](https://i.imgur.com/g4QpQMy.png)

中间的仪表盘是用来显示目前怡宝属性的状态的。对于经验值类型的怡宝属性，它会显示当前的值，以及升到下一等级所需的经验值。对于概率类，它会显示当前的概率，或者状态。

下方的图表是用的[FusionCharts](https://github.com/fusioncharts/fusioncharts-dist)， 它们会把当前的值显示出来。默认情况下（即你没指定图表类型），它们是折线图。折线图只会记录最近的30个值。另外也可以指定图表类型为仪表。当经验“升级”或者概率“爆表”时，图表旁边就会显示一个"Boom!!!". 此外，如果当前值太小了（你可以设这个最小值），那么这个值就不会显示到图表里，并且图会灰掉。

### 控制台与通知系统

![console](https://i.imgur.com/N4mxSxu.png)

你可以按"~"键，或者点击大招牌开启控制台，来查看历史事件记录（比如升级了、降级了，还有概率低到不行了等等）

![notification](https://i.imgur.com/CLOP0vA.png)

同时，通知系统会不断弹出最近发生的事件。（通知组件用了[react-toastify](https://github.com/fkhadra/react-toastify)）。值得一提的是，屏幕上的通知数最多只能有5个。

## 感谢

[Create React App](https://github.com/facebook/create-react-app) 里的 React 图标

爆炸图标 [OnlyGFX](https://www.onlygfx.com/6-starburst-explosion-comic-vector-png-transparent-svg/)

大量图标来自 [iconfont](https://www.iconfont.cn)

[react-toastify](https://github.com/fkhadra/react-toastify)

[FusionCharts](https://github.com/fusioncharts/fusioncharts-dist)

