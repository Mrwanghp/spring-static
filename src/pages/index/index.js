// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
// import NavBar from '@/components/seaNavBar';
import Tab from '@/components/seaTab';
import SeaListView from '@/components/seaListView';
// import SeaDrawer from '@/components/seaDrawer';
import { Icon } from 'antd-mobile';
import styles from './index.less';
import filterPng from '@/assets/filter.png';
import { videoList } from '@/services/list';
function Index(props) {
    const [tabs] = useState([
        { title: '全部', key: 0 },
        { title: '电影', key: 7 },
        { title: '连续剧', key: 13 },
        { title: '综艺', key: 25 },
        { title: '动漫', key: 29 },
        { title: '资讯', key: 36 }
    ]);
    const [typeId, setTypeId] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const params = {
        ac: 'detail',
        t: typeId || '',
        wd: searchVal || ''
    };
    const onTabClick = (item) => {
        setTypeId(item.key);
        setSearchVal('');
        setRefresh(true);
    };
    const toDetail = (item) => {
        props.dispatch(routerRedux.push({
            pathname: '/detail',
            search: `id=${item.vod_id}`
        }))
    };
    const setValue = (event) => {
        setSearchVal(event.target.value)
    }
    const search = (event) => {
        event.keyCode === 13 && setRefresh(true);
    }
    const renderListDom = (item) => {
        return (
            <div onClick={() => { toDetail(item) }}>
                <div className={styles.list} key={item.vod_id}>
                    <img src={item.vod_pic} alt="" />
                    <div className={styles.heading}>{item.vod_name || '-'}</div>
                    <div className={styles.Introduction}>{item.vod_blurb || '-'}</div>
                </div>
            </div>
        );
    };
    useEffect(() => {
        refresh && setTimeout(() => setRefresh(false))
    }, [refresh]);
    return (
        <div >
            {/* <NavBar title="首页" ></NavBar> */}
            <Tab tabs={tabs} onTabClick={onTabClick} />
            <div className={styles.content}>
                <div className="flex space-between" style={{ position: 'relative' }}>
                    <div style={{ flex: 4 }}>
                        <input
                            onKeyDown={search}
                            value={searchVal}
                            onChange={setValue}
                            className={styles.search}
                            type="search"
                            placeholder="请输入">
                        </input>
                        <Icon className={styles['icon-seatch']} type="search" color="#999999" size="xs" />
                    </div>
                    <div className={styles.filter}>
                        <span >筛选</span>
                        <img className={styles.img} src={filterPng} alt="" />
                    {/* <SeaDrawer/> */}
                    </div>
                </div>
                {!refresh && <SeaListView requset={videoList} slot={renderListDom} params={params} />}
            </div>
        </div>
    );
}

Index.propTypes = {
};

export default withRouter(connect()(Index));
