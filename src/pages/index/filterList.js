/*
 * @Author: your name
 * @Date: 2021-01-13 16:06:00
 * @LastEditTime: 2021-01-15 17:31:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\pages\index\filterList.js
 */
import React, { useState, useEffect } from 'react';
import { iterTree } from '@/utils/common'
import { Button } from 'antd-mobile'
import SeaGrid from '@/components/seaGrid';
import styles from './index.less';
function FilterList(props) {
    const { type, list, checked, confirm, reset } = props;
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
        setCheckArr({...checkArr, [key]: [item.value]});
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
            <div >
                <Button className={styles.btn} type="ghost" size="small" inline onClick={reset}>重置</Button>
                <Button className={styles.btn} type="primary" size="small" inline onClick={() =>{confirm(checkArr)}}>查询</Button>
            </div>
            
        </div>
    )
}
export default FilterList;