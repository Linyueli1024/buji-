import { useState, useEffect } from "react"
import axios from 'axios';
// 普通函数  不要使用hooks
const GetRoomDate = async () => {
    //获取房态数据
    // const [hotelData, setHotelData] = useState([])
    const data = {
    "username": "zymanager",
    "password": "zy12345678!@"
    }
    const response = await axios.post('https://yapi.pro/mock/374222/getRoom', JSON.stringify(data),{
    headers: {
        'Content-Type': 'application/text' // 明确设置请求头
    }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    return response.data.hotelData
}

export {GetRoomDate}

