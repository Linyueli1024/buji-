import React, { useEffect, useState } from "react";
import './index.scss'
import dayjs, { Dayjs } from "dayjs";
import Item from "antd/es/list/Item";

const CustomTable = ({tableData, thisWeekMonday, selectDate, isLoading}) => {
  console.log(selectDate);
  // 获取localStorage数据
  // const localStorageMonday = localStorage.getItem('thisWeekMonday')
  // const localStorageTableData = localStorage.getItem('tableData')
  // const localStorageSelectDate = localStorage.getItem('selectDate')
  
  // 将thisWeekMonday处理成12点
  thisWeekMonday =  thisWeekMonday + " 12:00:00.000Z" 
  const [leftColumn, setLeftColumn] = useState()
  const [tableData2, setTableData] = useState()
  //Loading占位符


  // console.log(tableData);
  // console.log("2024-05-03 12:00:00.000Z" < thisWeekMonday);
  // 获得左侧房间号表格数据
  // console.log(localStorageTableData);
  
  const roomIdList = (tableData || []).map((item) => (item.room_ID))
  useEffect(()=>{
    setLeftColumn(roomIdList)
  }, [tableData])
  // const {} = (thisWeekData || []).map((item) => (
  //   item.room_ID
  // ))
  // let date = thisWeekMonday
  console.log(roomIdList);
  console.log(thisWeekMonday);
  
  // console.log(dayjs(thisWeekMonday).add(4, 'day'));
  const renderTableRows = (tableData) => {
    return (tableData|| []).map((item, index) => {
      if (item.check_In_date <= thisWeekMonday){
        // 获取今日日期
        var sameColumn = 0
        const todayDate = new Date()
        // 计算需要合并的列数
        const timeDifference = Math.ceil((new Date(item.check_Out_date).getTime() - new Date(thisWeekMonday).getTime()) / (1000 * 60 * 60 * 24)) + 1;
        console.log(timeDifference);
        return (
          <tr style={{ border: "1px solid rgb(118, 148, 136)" , height:"40px"}}>
            {timeDifference >= 7 && (
              <td
                key={`${index}${1}`}
                style={{ border: "1px solid rgb(118, 148, 136)", height:"40px", padding:'10px 18px', textAlign: "center" }}
                colSpan={7}
              >
                <button style={{width: `${160*7 -20}px`, border:"10px solid transparent"}} className={item.flag === '已入住' ? 'class-button-isCheckedIn' : item.flag === '待退房' ? 'class-button-awaitingCheckOut' : item.flag === '已退房' ? 'class-button-isCheckedOut' : 'class-button-awaitingCheckIn'}>{item.flag}</button>
              </td>
            )}
            {timeDifference < 7 && (
              <td
                key={`${index}${1}`}
                style={{ border: "1px solid rgb(118, 148, 136)" ,height:"40px", padding:'10px 18px', textAlign: "center"  }}
                colSpan={timeDifference}
              >
                <button style={{width: `${160*timeDifference -20}px`, border:"10px solid transparent"}} className={item.flag === '已入住' ? 'class-button-isCheckedIn' : item.flag === '待退房' ? 'class-button-awaitingCheckOut' : item.flag === '已退房' ? 'class-button-isCheckedOut' : 'class-button-awaitingCheckIn'}>{item.flag}</button>
              </td>
            )}
            {
              timeDifference < 7 && (
                [...Array(7-timeDifference)].map((_, indexArray) => {
                  // columnId += 1; // 自增 columnId
                  console.log(indexArray);
                  console.log(index);
                  
                  return (
                    <td key={`${index}${indexArray+2}`} style={{ border: "1px solid rgb(118, 148, 136)", height:"40px", padding:'10px 18px', textAlign: "center"   }}>
                    {/* <td style={{ border: "1px solid #ddd" }}> */}
  
                      {/* {index + 1} */}
                    </td>
                  );
                })
              )
            }
            
          </tr>
        );        
      }
      else {

        const timeDifference = Math.ceil((new Date(item.check_In_date).getTime() - new Date(thisWeekMonday).getTime()) / (1000 * 60 * 60 * 24));
        // 计算需要合并的列数
        console.log(timeDifference);
        
        const unitedColumn = 7 - timeDifference
        console.log(unitedColumn);
        var columnId = 0
        return (
          <tr style={{ border: "1px solid #ddd rgb(118, 148, 136)", height:"40px"  }}>
            {
            [...Array(timeDifference)].map((_, indexArray) => {
              columnId += 1
              return (
                // <td key={`${indexArray}-col`} style={{ border: "1px solid #ddd" }}>
                <td style={{ border: "1px solid rgb(118, 148, 136)" , height:"40px", padding:'10px 18px', textAlign: "center"  }}>
                {/* {index + 1} */}
              </td>
              )
            })
            
            }
            {unitedColumn != 7 && (
              <td
                // key={`${index}-col`}
                style={{ border: "1px solid rgb(118, 148, 136)", height:"40px", padding:'10px 18px' , textAlign: "center"  }}
                colSpan={unitedColumn}
              >
                <button style={{width: `${160*unitedColumn -20}px`, border:"10px solid transparent"}} className={item.flag === '已入住' ? 'class-button-isCheckedIn' : item.flag === '待退房' ? 'class-button-awaitingCheckOut' : item.flag === '已退房' ? 'class-button-isCheckedOut' : 'class-button-awaitingCheckIn'}>{item.flag}</button>
              </td>
            )}
            {unitedColumn > 7 && (
              <td
                // key={`${index}-col`}
                style={{ border: "1px solid rgb(118, 148, 136)", height:"40px", padding:'10px 18px', textAlign: "center"   }}
                colSpan={7}
              >
                {/* <button style={{height:"35px", width: `${160*7 -20}px`, borderRadius:"10px"}} className={'class-button-isCheckedIn'}>{item.flag}</button> */}
                <button style={{width: `${160*7 -20}px`, border:"10px solid transparent"}} className={item.flag === '已入住' ? 'class-button-isCheckedIn' : item.flag === '待退房' ? 'class-button-awaitingCheckOut' : item.flag === '已退房' ? 'class-button-isCheckedOut' : 'class-button-awaitingCheckIn'}>{item.flag}</button>




              </td>
            )}
        
          </tr>
        );
        
        
      }  
  });
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px auto", // 左侧固定宽度200px，右侧自适应
        gap: "10px",
        alignItems: "start",
      }}
    >
      {/* 左侧独立列 */}
      {isLoading ? <div></div>:(
        <div
        style={{
          // backgroundColor: "#f5f5f5",
          // padding: "10px",
          border: "1px solid #769488",
          marginTop: "80px",
          width: "120px",
          // position: "relative"
        }}
      >
        {(leftColumn && leftColumn.length > 0) ? (leftColumn).map((item, index) => (
          <div
            key={item.room_ID} // 使用房间号作为 key
            style={{
              padding: "10px 10px",
              borderBottom: "1px solid #769488",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: "(-50%, -50%)"
            }}
          >
              {item}
          </div>
        )):
        (<div style={{border:"0px"}}></div>)
        }
      </div>
      )}

      {/* 右侧表格 */}
      <div style={{marginTop:"13px"}}>
        <table style={{  borderCollapse:'collapse'}}>
          <thead>
            <tr key={1}>
              {[...Array(7)].map((_, index) => {
                const date = dayjs(thisWeekMonday).add(index, 'day').format('MM-DD');
                const dayOfWeek = ['一', '二', '三', '四', '五', '六','日']; // 星期的中文表示
                // console.log(new Date(selectDate).getDay());
                
                return (
                  <th
                  key={`header-${index}`}
                  style={{ border: "1px solid #ddd", height: "65px", width: "140px" }}
                >
                  <span className={new Date(selectDate).getDay() === 0 ? index+1 === 7 && 'class-tag-active' : index+1 === new Date(selectDate).getDay() && 'class-tag-active'}>{date} {' '} {dayOfWeek[index]}</span>
                  {/* <span >{date} {' '} {dayOfWeek[index]}</span> */}
                  </th>  
              )})}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>加载中...</td>
              </tr>
            ) : tableData.length > 0 ? (
              renderTableRows(tableData)
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>暂无数据</td>
              </tr>
            )}
          </tbody>

          <tbody>
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export {CustomTable};
