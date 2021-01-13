/*
 * @Author: your name
 * @Date: 2021-01-13 16:06:00
 * @LastEditTime: 2021-01-13 17:54:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\pages\index\filterList.js
 */
import React, { useState, useEffect } from 'react';
function FilterList(props) {
    const { type, list } = props;
    const [ valSet, smallType]  = list;
    const { areaList, langListl, yearList} = valSet;
    const typeList = type ? smallType.data.filter(item=> item.type_name === type)[0].children :
                     smallType.data.map(item => item.children);
    const iterTree = (arr)=> {
        while (arr.some(item => Array.isArray(item))) {
            arr = [].concat(...arr);
        }
        return arr;
    }
    const arr = [iterTree(typeList), areaList, langListl, yearList];
    console.log(arr)
    return(
        <div>
            15151515
        </div>
    )
}
export default FilterList;