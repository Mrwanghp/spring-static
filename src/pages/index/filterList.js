/*
 * @Author: your name
 * @Date: 2021-01-13 16:06:00
 * @LastEditTime: 2021-01-14 17:02:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\pages\index\filterList.js
 */
import React, { useState, useEffect } from 'react';
import { iterTree } from '@/utils/common'
import { Button } from 'antd-mobile'
import SeaGrid from '@/components/seaGrid';
function FilterList(props) {
    const { type, list, checked, callback } = props;
    const [ valSet, smallType]  = list;
    const [ checkArr, setCheckArr] = useState({...checked});
    const { areaList, langList, yearList} = valSet.data;
    const typeList = type !== '全部' ? smallType.data.filter(item=> item.type_name === type)[0].children :
                     smallType.data.map(item => item.children);
    const arr = [
       { key: 'type', list: iterTree(typeList).map(item=> ({title: item.type_name, value: item.type_id}))},
       { key: 'areaList', list: areaList },
       { key: 'langList', list: langList },
       { key: 'yearList', list: yearList }
    ];
    const onChange = (item,key) => {
        setCheckArr({...checkArr, [key]: [item.value]})
    }
    const confirm = () => {
        callback(checkArr)
    }
    return(
        <div>
            {
                arr.map((item) =>
                   <SeaGrid 
                    key={item.key} 
                    checked={checked[item.key]} 
                    list={item.list} 
                    onChange={(value)=>onChange(value, item.key)}
                   />
                )
            }
            <Button type="ghost" size="small" inline>重置</Button>
            <Button type="primary" size="small" inline onClick={confirm}>查询</Button>
        </div>
    )
}
export default FilterList;