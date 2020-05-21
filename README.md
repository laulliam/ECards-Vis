# Campus ECards Visualization Analysis
## 一卡通数据可视分析

### 摘要

随着大数据时代的来临，数据可视化为创新资助工作提供了新的理念和技术支持，也为高校创新学生管理工作带来了新的机遇。本文的主要工作内容有：1）利用数据挖掘与可视分析技术发现“隐性贫困”学生与疑似“伪贫困”学生，为精准资助提供参考。2）针对COVID-19特殊事件，实现疫情后开学错峰就餐规划和模拟演示，助力高校疫情防控。3）基于离散轨迹计算学生的勤奋程度和生活规律性并建立相关模型，实现预测学生学业成绩。4）基于消费数据构建二分图并对其映射得到同伴关系网络，挖掘同伴关系对学生成绩的影响。本文旨在为学校优化资源配置和科学决策提供更科学的依据和参考，在智慧校园建设管理中的具有潜在价值和重大意义。

### 拟定的TASK

1. 利用数据挖掘与可视分析技术发现“隐性贫困”学生与疑似“伪贫困”学生，为精准资助提供参考。 
2. 针对COVID-19特殊事件，实现疫情后开学错峰就餐规划和模拟演示，助力高校疫情防控。
3. 基于离散轨迹计算学生的勤奋程度和生活规律性并建立相关模型，实现预测学生学业成绩。 
4. 基于消费数据构建二分图并对其映射得到同伴关系网络，挖掘同伴关系对学生成绩的影响。

### TASK分析

1. 利用数据挖掘与可视分析技术发现“隐性贫困”学生与疑似“伪贫困”学生，为精准资助提供参考。(奖惩助困)

> Description：基于校园一卡通数据，利用可视分析技术探索学生在校期间的真实消费情况、学生经济水平、发现“隐性贫困”与疑似“伪贫困”学生，实现奖惩助困，让每一笔资助经费得到最大价值的发挥与利用，帮助每一个贫困大学生顺利完成学业。 

> Key Point： ① 发现“隐性贫困”学生   -② 挖掘“伪贫困”学生-

> Q?: ① 如何验证结果的正确性和有效性？

> Solutions：
>
> ① 先**降维**（PCA\T-SNE等）然后**聚类**（KMeans\DBScan\Agglomeration等）
>
> ② 机器学习建模（KNN\XGB\SVM\LogisticRegression等）
>
> ③ 从可视化角度直接过滤筛选

> Experiment:
>
> ① 聚类：
>
> <img src="../AppData/Roaming/Typora/typora-user-images/image-20200511235956553.png" style="zoom:50%;" />
>
> <img src="../AppData/Roaming/Typora/typora-user-images/image-20200512000213408.png" alt="image-20200512000213408" style="zoom:67%;" />
>
> ② 机器学习模型，由已知的贫困生数据进行建模，正确率在80%左右

> System(设计中):
>
> ![image-20200512000908967](../AppData/Roaming/Typora/typora-user-images/image-20200512000908967.png)

2. 针对COVID-19特殊事件，实现疫情后开学错峰就餐规划和模拟演示，助力高校疫情防控。

> Description: 将可视分析技术应用于校园就餐数据分析中，为改进学校服务并为相关部门的决策提供信息支持，为助力校园突发事件（比如疫情防控COVID-19事件）提供参考。

> Leader：Ting Cai

3. 基于离散轨迹计算学生的勤奋程度和生活规律性并建立相关模型，实现预测学生学业成绩。 

> Leader：Hanglin Li

> Suggestion：参考电子科大周涛团队的工作   生活规律性 + 学习勤奋度  -> 学业成绩 
>
> *Cao Y, Gao J, Lian D, Rong Z, Shi J, Wang Q, Wu Y, Yao H, Zhou T. 2018 Orderliness predicts academic performance: behavioural analysis on campus lifestyle. J. R. Soc. Interface 15: 20180210.*  


6. 基于消费数据构建二分图并对其映射得到同伴关系网络，挖掘同伴关系对学生成绩的影响。

> Description: 通过研究大学生生活中的同伴关系对学业成绩的影响，发现好的同伴关系对于大学生的学业顺利完成、人格健康发展、社会能力培养等方面都有着积极的促进作用；而不好的同伴关系能够对彼此产生消极的影响，甚至导致挂科、降级、退学等学业困难事件。

> Key Point: ① 基于消费数据构造二分网络  

> ![image-20200512001330154](../AppData/Roaming/Typora/typora-user-images/image-20200512001330154.png)![image-20200512001717616](../AppData/Roaming/Typora/typora-user-images/image-20200512001717616.png)  