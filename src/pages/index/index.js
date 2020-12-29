// @ts-nocheck
import React, { useState } from 'react';
import { connect } from 'dva';
import NavBar from '@/components/seaNavBar';
import Tab from '@/components/seaTab';
import SeaListView from '@/components/seaListView';
import { Icon } from 'antd-mobile';
import styles from './index.less';
import filterPng from '@/assets/filter.png';
import { videoList } from '@/services/list';
function Index() {
    const [tabs] = useState([
        { title: '最新' },
        { title: '电影' },
        { title: '连续剧' },
        { title: '动漫' },
        { title: '综艺' },
        { title: '资讯' }
    ]);
    const params = {
        ac: 'detail',
        t: '',
        h: '10'
    }
    const onTabClick = (e) => {}
    const renderListDom = (item) => {
        return (
            <div>
                <div className={styles.list} key={item.vod_id}>
                    <img src={item.vod_pic} alt="" />
                    <div className={styles.heading}>{item.vod_name}</div>
                    <div className={styles.Introduction}>{item.vod_blurb}</div>
                </div>
            </div>
        );
    };
    return (
        <div >
            <NavBar title="首页" ></NavBar>
            <Tab tabs={tabs} onTabClick={onTabClick} />
            <div className={styles.content}>
                <div className="flex space-between" style={{ position: 'relative' }}>
                    <div style={{ flex: 4 }}>
                        <input className={styles.search} type="text" placeholder="请输入"></input>
                        <Icon className={styles['icon-seatch']} type="search" color="#999999" size="xs" />
                    </div>
                    <div className={styles.filter}>
                        <span >筛选</span>
                        <img className={styles.img} src={filterPng} alt="" />
                    </div>
                </div>
                <SeaListView requset={videoList} slot={renderListDom} params={params} />
            </div>
        </div>
    );
}

Index.propTypes = {
};

export default connect()(Index);
