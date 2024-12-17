import React from 'react';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ReactNode } from 'react';

// 定义 MenuItem 类型
type MenuItem = Required<MenuProps>['items'][number];

// 创建 getItem 函数，用于构建菜单项
function getItem(
  label: ReactNode,
  key: React.Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// 导出 MenuItem 和 getItem 函数
export { getItem };
export type { MenuItem };
