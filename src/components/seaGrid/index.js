/*
 * @Author: your name
 * @Date: 2021-01-13 16:30:34
 * @LastEditTime: 2021-01-14 17:29:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\components\seaGrid\index.js
 */
import React, { useState, useEffect } from 'react';
import { Tag } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';
function SeaNavBar(props) {
    const { list, onChange, checked } = props;
    const [curIndex, setCurIndex] = useState(0)
    const tagSwitch = (item, index) => {
        setCurIndex(index)
        onChange(item)
    }
    useEffect(()=>{
        setCurIndex(list.findIndex(item=> item.value === checked[0]))
    },[])
    return (
        <div className={styles.tag}>
            <div className={styles.tagInner}>
                { 
                    list.map((item, index)=> (
                        <Tag 
                            selected={index === curIndex} 
                            key={item.value} 
                            onChange={()=>{tagSwitch(item, index)}}>
                            {item.title}
                        </Tag>
                    ))
                }
            </div>
        </div>
    );
}

SeaNavBar.propTypes = {
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func
}
export default SeaNavBar;
