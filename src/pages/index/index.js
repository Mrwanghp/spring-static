// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { withRouter, routerRedux } from 'dva/router';
import Tab from '@/components/seaTab';
import SeaListView from '@/components/seaListView';
import SeaDrawer from '@/components/seaDrawer';
import FilterList from './filterList';
import { Icon } from 'antd-mobile';
import styles from './index.less';
import filterPng from '@/assets/filter.png';
import { videoList, tabList, getValueSet } from '@/services/list';
import { prohibited } from '@/utils/common'; // 禁止键盘抬起页面滑动
function Index(props) {
    // 筛选列表初始模板
    const list = {
        type: [],
        areaList: [], 
        langList: [], 
        yearList: []
    };
    const [tabs] = useState([
        { title: '全部', key: 0 },
        { title: '电影', key: '1,6,7,8,9,10,11,12' },
        { title: '连续剧', key: '13,14,15,16,20,21,22,23,24' },
        { title: '综艺', key: '25,26,27,28' },
        { title: '动漫', key: '29,30,31,32,33' },
        { title: '资讯', key: '17,18,35,36' }
    ]);
    const [open, setOpen] = useState(false);
    const [typeId, setTypeId] = useState(0);
    const [typeName, setTypeName] = useState('全部');
    const [typeList, useTypeList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [checked, setChecked] = useState(list);
    const params = {
        type_id: checked.type.join() || typeId || '',
        name: searchVal || '',
        year: checked.yearList.join(),
        land: checked.langList.join(),
        area: checked.areaList.join()
    };
    // 跳转详情
    const toDetail = (item) => {
        props.dispatch(routerRedux.push({
            pathname: '/detail',
            search: `id=${item.vod_id}`
        }))
    };
    //初始化筛选列表
    const initFilterList = async () => {
        const list = [getValueSet(),tabList()];
        const data = await Promise.all(list)
        useTypeList(data)
    }
    // 搜索
    const search = (event) => {
        event.keyCode === 13 && setRefresh(true);
    }
    // 筛选查询
    const confirm = (arr) => {
        setOpen(false);
        setChecked(arr);
        setRefresh(true);
    }
    // 筛选重置
    const reset = () => {
        setOpen(false);
        setChecked(list);
        setRefresh(true);
    }
    //open弹框
    const drawerTab = () => {
        setOpen(true)
    }
    // tab点击
    const onTabClick = (item) => {
        setSearchVal('');
        setTypeId(item.key);
        setTypeName(item.title);
        setChecked(list);
        setRefresh(true);
    };
    // init筛选子类
    useEffect(() => {
        prohibited();
        initFilterList();
    }, []);
    // 刷新ref
    useEffect(() => {
        refresh && setTimeout(() => setRefresh(false)) ;
    }, [refresh]);
    // 列表dom
    const renderListDom = (item) => {
        return (
            <div onClick={() => { toDetail(item) }}>
                <div className={styles.list} key={item.vod_id}>
                    <img loading="lazy" src={item.vod_pic} alt="" />
                    <div className={styles.sub}>{item.vod_remarks}</div>
                    <div className={styles.heading}>{item.vod_name || '-'}</div>
                    <div className={styles.Introduction}>{item.vod_blurb || '-'}</div>
                </div>
            </div>
        );
    };
    return (
        <div >
            <Tab tabs={tabs} onTabClick={onTabClick} />
            <div className={styles.content}>
                <div className="flex space-between" style={{ position: 'relative' }}>
                    <div style={{ flex: 4 }}>
                        <input
                            onKeyDown={search}
                            value={searchVal}
                            onChange={(event)=>{setSearchVal(event.target.value)}}
                            className={styles.search}
                            type="search"
                            placeholder="请输入">
                        </input>
                        <Icon className={styles['icon-seatch']} type="search" color="#999999" size="xs" />
                    </div>
                    <div className={styles.filter} onClick={drawerTab}>
                        <span>筛选</span>
                        <img className={styles.img} src={filterPng} alt="" />
                        <SeaDrawer 
                            open={open} 
                            Slot={
                                ()=> typeList.length && 
                                    <FilterList 
                                        list={typeList} 
                                        type={typeName}
                                        checked={checked}
                                        reset={reset}
                                        confirm={(arr)=>{confirm(arr)}}
                                    />
                            } 
                            callback={()=>{setOpen(false)}}
                        />
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
