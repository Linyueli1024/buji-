import { Divider } from "antd"
import { Outlet, useNavigate, useLocation} from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { Radio, Space, Tabs } from 'antd';
import './index.scss'
import {HomeOutlined, EditOutlined, UsergroupDeleteOutlined, CopyOutlined} from '@ant-design/icons';


const Layout = () =>{
    const [tabPosition, setTabPosition] = useState('left');
    const navigate = useNavigate()
    const location = useLocation()
    const tabs = [
        {
            key:'/',
            title:'主页',
            icon:<HomeOutlined />,
            // component: <Outlet/>
        },
        {
            key:'/room',
            title:'房态',
            icon:<EditOutlined />,
            // component: <Outlet/>
        },
        {
            key:'/activity',
            title:'活动',
            icon:<UsergroupDeleteOutlined />,
            // component: <Outlet/>
        },
        {
            key:'/order',
            title:'订单',
            icon:<CopyOutlined />,
            // component: <Outlet/>
        }
    ]    
        const setRouterActive = (path)=>{
            console.log(path);
            navigate(path)
        }
    
    return (
        <>
        <div className="content">
            <div className="websitetitle">
                BUJI
            </div>
            <div className="sidebar">
                <Tabs
                tabPosition={tabPosition}
                activeKey={location.pathname}
                itemHoverColor={'#7A797E'}
                itemSelectedColor={'#fff'}
                items={tabs.map((item, i) => {
                    // const id = String(i + 1);
                    return {
                    label: item.title,
                    key:item.key,
                    children:<Outlet/>
                    };
                })}
                onChange={(e)=>{
                    setRouterActive(e)
                    
                }}
                />
            </div>
            
        </div>
        
      </>
    )
}

export {Layout}