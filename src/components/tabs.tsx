import React from 'react';
import { Tabs, type TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};
const timeRange = [9,10,11,12,13,14,15,16,17,18,19]

// 将数字转换为字符串
const items = timeRange.map(time => ({
    key: String(time), // 将数字转换为字符串
    tab: <span>{time}</span>, // 使用 tab 属性定义每个 tab 的标题
    children: <div>这里可以放置 tab 的内容</div>,
  }));
const Tab: React.FC = () => 
    <Tabs defaultActiveKey="0" onChange={onChange}>
      {items.map(item => (
        <Tabs.TabPane {...item} /> // 使用展开运算符传递所有 item 属性到 TabPane
      ))}
    </Tabs>

export default Tab;