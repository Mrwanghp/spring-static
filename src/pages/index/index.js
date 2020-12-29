// @ts-nocheck
import React, { useState } from 'react';
import { connect } from 'dva';
import NavBar from '@/components/seaNavBar'
import Tab from '@/components/seaTab'
import { Icon } from 'antd-mobile';
import styles from './index.css';
import filterPng from '@/assets/filter.png'
function Index() {
    console.log(styles)
    const [tabs] = useState([
        { title: '最新' },
        { title: '电影' },
        { title: '连续剧' },
        { title: '动漫' },
        { title: '综艺' },
        { title: '资讯' }
    ]);
    const onTabClick = (e) => {
        console.log(e)
    }
    return (
        <div >
            <NavBar title="首页" ></NavBar>
            <Tab tabs={tabs} onTabClick={onTabClick} />
            <div className={styles.content}>
                <div className="flex space-between" style={{position: 'relative'}}> 
                    <div style={{flex:4}}>
                        <input className={styles.search} type="text" placeholder="请输入"></input>
                        <Icon className={styles['icon-seatch']} type="search" color="#999999" size="xs" />
                    </div>
                    <div style={{flex:1}}>
                        筛选
                        <img className={styles.img} src={filterPng} alt=""/>
                    </div>
                </div> 
            </div>
        </div>
    );
}

Index.propTypes = {
};

export default connect()(Index);
