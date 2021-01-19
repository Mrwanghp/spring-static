import styles from './index.less';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
function SeaListView(props) {
    const { params, slot, requset } = props;
    const listDom = useRef(null);
    const orgList = useRef({});
    const [height, setHeight] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [initLoading, setInitLoading] = useState(true); // 初始化加载loading
    const [downLoading, setDownLoading] = useState(true); // 下拉loading
    const [upLoading, setUpLoading] = useState(true); // 上拉加载loading
    const [noRepeat, setNoRepeat] = useState(false); //防止重复加载
    const listDataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const dataSource = useRef(listDataSource);
    // 上拉加载
    const onEndReached = () => {
        !noRepeat && setPageNum(pageNum + 1);
    };
    // 下拉刷新
    const onRefresh = () => {
        setPageNum(1)
        setUpLoading(true);
        pageNum === 1 && initListData();
    };
    const initListData = async () => {
        setNoRepeat(true);
        const paramsdata = { ...params, curPage: pageNum, pageSize: 15,};
        const { data } = await requset(paramsdata);
        if (pageNum === 1 && !data.length) {
            setInitLoading(false);
        }
        if (!data.length) {
            setDownLoading(false);
        } else {
            if (pageNum === 1) {
                dataSource.current = dataSource.current.cloneWithRows(data);
                orgList.current = data;
                console.log(orgList.current)
            } else {
                dataSource.current = dataSource.current.cloneWithRows([...orgList.current, ...data]);
                orgList.current = [...orgList.current, ...data];
            }
        }
        setUpLoading(false);
        setNoRepeat(false);
        setInitLoading(false);
    };
    // 计算list高度
    const calcHeight = () => {
        const [tabbar] = document.getElementsByClassName('am-tab-bar-bar');
        const height = document.documentElement.clientHeight-listDom.current.offsetTop - tabbar.offsetHeight;
        setHeight(height)
    }
    useEffect(() => {
        calcHeight();
        setDownLoading(true);
        setUpLoading(true);
        initListData();
    }, [pageNum])
    return (
        <div ref={listDom} style={{ marginTop: '.266667rem' }}>
            {
                initLoading ? <div className={styles.auto}><div className={styles.loading}></div></div> 
                :(orgList.current.length ? 
                    <ListView
                        dataSource={dataSource.current}
                        renderFooter={() => (orgList.current.length >= 15 && <div className={styles.downloading}>
                            {downLoading ? '加载中...' : '哎呀，到底了'}
                        </div>)}
                        renderRow={slot}
                        style={{
                            height: height + 'px',
                            overflow: 'auto',
                        }}
                        pageSize={15}
                        pullToRefresh={<PullToRefresh
                            refreshing={upLoading}
                            onRefresh={onRefresh}  //下拉刷新
                        />}
                        scrollRenderAheadDistance={500}  //当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                        onEndReached={onEndReached} //上拉加载
                        onEndReachedThreshold={20} //调用onEndReached之前的临界值，单位是像素
                    />
                     : <div style={{ textAlign: 'center' }}>哎呀 好像没找到您想看的</div>)

            }
        </div>
    );
}

SeaListView.propTypes = {
    params: PropTypes.object,
    requset: PropTypes.func.isRequired,
    slot: PropTypes.func,
}
SeaListView.defaultProps = {
    // height: '80vh'
}
export default SeaListView;
