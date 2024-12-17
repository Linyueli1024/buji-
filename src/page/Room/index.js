import { DateNavigator } from "../../components/DateNavigator"
import { CustomTable } from "../../components/CustomTable"
import { useState, useEffect, useRef } from "react"
import { GetRoomDate } from "../../apis/getRoomData"
import dayjs from "dayjs"
const Room = () => {
    // const [mondayDate,setMondayDate] = useState('')
    // DataNavigator组件到Room组件通讯
    const [date, setDate2] = useState(localStorage.getItem('selectDate')?dayjs(localStorage.getItem('selectDate')):dayjs())
    console.log(date);
    // Loading占位符
    const [isLoading, setIsLoading] = useState(true)
    
    const handleDate = (selectDate) => {
        console.log(selectDate);
        
        setDate2(selectDate)
    }
    const [mondayDate, setMondayDate] = useState(date.day() == 0 ? date.day(-6).format('YYYY-MM-DD'):date.subtract(date.day()-1, 'day').format('YYYY-MM-DD') )
    const [thisWeekData, setThisWeekData] = useState([])
    // const leftColumnData = useRef([])
    //日期改变时，计算本周周一日期
    useEffect(() => {
        // console.log(date.day(-6));
        
        const newMondayDate = date.day() == 0 ? date.day(-6).format('YYYY-MM-DD'):date.subtract(date.day()-1, 'day').format('YYYY-MM-DD')
        if (newMondayDate !== mondayDate) {
            setMondayDate(newMondayDate);
            
        }
        // console.log(mondayDate);
    }, [date]); // 仅在 date 发生变化时执行

    // 获取本周数据
    useEffect(() => {
        setIsLoading(true)
        const fetchRoomData = async () => {
            try {
                const roomData = await GetRoomDate(); // 异步调用
                console.log('Room data fetched:', roomData);
                console.log(mondayDate);
                
                const weekStart = new Date(mondayDate)
                const weekEnd = dayjs(new Date(new Date(mondayDate).setDate(weekStart.getDate()+ 6))).format('YYYY-MM-DD');     
                      
                // 从原有数据中提取这一周的数据
                const filterData = roomData.filter((item)=>{
                    const checkInDate = dayjs(item.check_In_date).format('YYYY-MM-DD');
                    const checkOutDate = dayjs(item.check_Out_date).format('YYYY-MM-DD');
                    // console.log(mondayDate, weekEnd, checkInDate, checkOutDate);
                    return (
                        (checkInDate >= mondayDate && checkInDate <= weekEnd) || // 入住日期在一周内
                        (checkOutDate >= mondayDate && checkOutDate <= weekEnd) || // 退房日期在一周内
                        (checkInDate <= mondayDate && checkOutDate >= weekEnd) // 覆盖整周
                    )
                })
                setThisWeekData(filterData)
                setIsLoading(false)
                console.log(filterData);
                // const tableData = filterData.map((item) => ({
                //     room_ID: item.room_ID,
                //     check_In_date: item.check_In_date,
                //     check_Out_date: item.check_Out_date,
                //     flag: item.flag
                // }));                
                // console.log(tableData);        

                
            } catch (error) {
                console.error('Failed to fetch room data:', error);
            }
        };
        fetchRoomData(); // 调用异步函数
    }, [mondayDate]); // 仅在 mondayDate 实际变化时触发
    // console.log(mondayDate);
    console.log(date);
    //将选中日期存入本地存储
    localStorage.setItem('selectDate',date)

    
    return (
        <>
            <DateNavigator setDateToRoom={handleDate} />
            <CustomTable tableData={thisWeekData} thisWeekMonday = {mondayDate} selectDate = {date} isLoading = {isLoading}/>
           
        </>
    )
}
export default Room