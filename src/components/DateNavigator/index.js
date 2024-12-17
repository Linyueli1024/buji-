import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { useState } from 'react';
const DateNavigator = ({setDateToRoom})=>{
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    const [dateValue, setDateValue] = useState(localStorage.getItem('selectDate')?dayjs(localStorage.getItem('selectDate')):dayjs(new Date()))
    const onChange = (date, dateString) => {
        console.log(date, dateString);
        date ? setDateValue(date) : new Date(); // 更新选中日期
    };
    const changeToday = () => {
        const today = dayjs(); // 获取今天的日期
        setDateValue(today); // 更新状态为今天
    };
    // 前一天日期
    const toPreDate = () => {
        const preDate = dateValue.subtract(1, 'day')
        setDateValue(preDate)
    }
    // 后一天日期
    const toNextDate = () => {
        const nextDate = dateValue.add(1, 'day')
        setDateValue(nextDate)
    }
    console.log(dateValue);
    
    setDateToRoom(dateValue)
    return (
        <div>
            <div style={{display:"inline-block"}}>
                <button style={{backgroundColor:"#769488", border:"none", color:"#fff", padding:"12px 20px", borderRadius:"6px"}} onClick={changeToday}>今日</button>
            </div>
            <div style={{display:"inline-block", marginLeft:"20px", padding:"6px 60px",  backgroundColor:"#769488", borderRadius:"6px"}}>
                <button style={{display:"inline-block", border:"none", color:"#fff", backgroundColor:"rgba(0,0,0,0)"}} onClick={toPreDate}>{'<'}</button >
                <DatePicker 
                    onChange={onChange} 
                    value={dateValue} // 将状态绑定到 DatePicker 的 value
                    style={{display:"inline-block", marginLeft:"40px", color:"#fff", backgroundColor:"#769488", border:"none"}} 
                    defaultValue={dayjs(new Date())} 
                />
                {/* <div style={{display:"inline-block", margin:"0px 40px", color:"#fff"}} onClick={changeDate}>2024-10-19</div> */}
                <button style={{display:"inline-block", border:"none", color:"#fff", backgroundColor:"rgba(0,0,0,0)"}} onClick={toNextDate}>{'>'}</button>
            </div>
            <div style={{display: "inline-block", marginLeft: "40px"}}>
                <span style={{borderRadius:"10px", backgroundColor:'#faf3e5', color:'#e8a056', padding:'12px 20px', marginLeft:'20px'}}>待入住</span>
                <span style={{borderRadius:"10px", backgroundColor:'#e8f1ff', color:'#6b8cc4', padding:'12px 20px', marginLeft:'20px'}}>已退房</span>
                <span style={{borderRadius:"10px", backgroundColor:'#fcece8', color:'#d3726e', padding:'12px 20px', marginLeft:'20px'}}>待退房</span>
                <span style={{borderRadius:"10px", backgroundColor:'#e7f8f0', color:'#76bc9c', padding:'12px 20px', marginLeft:'20px'}}>已入住</span>
            </div>
        </div>
    )
}

export {DateNavigator}