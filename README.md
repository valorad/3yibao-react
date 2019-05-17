# 3yibao-react
A screen-saver for teasing 3yibao, re-written in React
三怡宝的日常放松专属屏保

![demo](https://i.imgur.com/Vv8xw8g.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) v3.

## Description

This site is used as a dashboard to describe the general attributes of the funny character 3yibao (e.g. the energy level, bad-luck points, jackpot chances and probability of losing weight) by some random algorithms. The attributes are all customizable. It is now using react framework at the front, and a simple go echo framework at the back-end.

### Yibao Attributes

The program calculates the yibao attributes during the time based on the input and put them in the charts.

The yibao attributes can be categorized into two: experience type and probability type.

Experience type has level thresholds, in which levels can go up or go down, and threshold order decides the leveling-up direction, while the probability type has a fixed range of 0 - 100%.

You need to specify the name, order and algorithm parameters in advance for both of them, and additionally the level thresholds for experience type.

As for now, the experiences are using [Random walk](https://en.wikipedia.org/wiki/Random_walk) model, in which a Gaussian number needs to be generated by the polar form of [Box–Muller transform](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) first, while for the probability part, the model is relatively simple, just normal javascript random numbers. Hopefully, we can customize the algorithms in future updates.


### Billboard
![billboard](https://i.imgur.com/t8uOFjz.png)

3yibao's alias, as you can see the 0, 1,...,9 yibaos, is randomly generated. This alias will be used across the site.

The billboard up front will dynamically display the current yibao in place. The two lights are programmed to circling around, and "恭喜N怡宝" moves left and right periodically.

### Dashboard

![dashboard](https://i.imgur.com/g4QpQMy.png)

The dashboard in the middle shows the current status of yibao attributes. It automatically tells which level it is now and shows the next level value for experience type, and also show the current probability or status for probability type.

The charts from [FusionCharts](https://github.com/fusioncharts/fusioncharts-dist) display the newly generated value. By default, they are line charts that have a memory of 30 points. Alternatively, you can select simple gauge. The "boom" effect is given near the chart every time there is an experience "level up" or probability "Off the charts". The charts will also grey out if the value reaches the pre-configured minimum value.

### Console and notification system

![console](https://i.imgur.com/N4mxSxu.png)
You can press "~" key or click the billboard to open the console, and check the log of various events (upgrade / downgrade / probability too low, etc.) there.

![notification](https://i.imgur.com/CLOP0vA.png)
Also, the events will pop up by notification system (which utilizes [react-toastify](https://github.com/fkhadra/react-toastify)). Note that the maximum number of notifications on the screen is limited to 5.
