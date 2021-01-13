/*
 * @Author: your name
 * @Date: 2021-01-13 16:30:34
 * @LastEditTime: 2021-01-13 16:52:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\components\seaGrid\index.js
 */
import React from 'react';
import { Tag } from 'antd-mobile';
import PropTypes from 'prop-types'
function SeaNavBar(props) {
    const { list, onChange } = props;
    return (
        <div>
        { 
            list.map(item=> (
                <Tag key={item.key} onChange={()=>{onChange(item)}}>{item.name}</Tag>
            ))
        }
        </div>
    );
}

SeaNavBar.propTypes = {
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func
}
export default SeaNavBar;
