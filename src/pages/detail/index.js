import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import NavBar from '@/components/seaNavBar';
import { connect } from 'dva';
import styles from './index.less';
import { videoList } from '@/services/list';
function Detail(props) {
    console.log(props)
    // props.location.state.id ||
    const vodId = props.location.state.id;
    const [urlList, setUrlList] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [detialData, setDetialData] = useState({});
    const iframeDom = useRef(null);
    const backPage = () => {
        props.history.push('/')
    }
    const initDetailData = async () => {
        const params = { ids: vodId, ac: 'detail' }
        const { data } = await videoList(params);
        const url = data.list[0].vod_play_url;
        const list = ((url).split('$$$')[0]).split('#');
        const arr = list.map(item => {
            const [name, url] = item.split('$');
            return { name: name.substring(1, 3), url }
        })
        setDetialData(data.list[0]);
        setUrlList(arr);
        iframeOnload();
    }
    const switchUrl = (item, index) => {
        setCurIndex(index);
    }
    const iframeOnload = () => {
        iframeDom.current.onload = () => {
            setLoading(false)
        }
    }
    useEffect(() => {
        initDetailData();
    }, [])
    return (
        <div >
            <NavBar title="详情" icon="left" navbarClick={backPage}></NavBar>
            <ActivityIndicator toast={true} text="加载中..." animating={loading} />

            {urlList.length &&
                <iframe
                    ref={iframeDom}
                    className={styles.iframeV}
                    src={urlList[curIndex].url}
                    frameBorder="0"
                />}

            {
                !loading && <div >
                    <div className={styles.title}>{detialData.vod_name}</div>
                    {([2,4].includes(detialData.type_id_1)) &&
                        <div className="flex flex-wrap">
                            {
                                urlList.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.tvlist} ${index === curIndex ? styles.active : ''}`}
                                        onClick={() => switchUrl(item, index)}
                                    >
                                        {(item.name)}
                                    </div>
                                ))
                            }
                        </div>}

                </div>
            }

        </div>
    );
}

Detail.propTypes = {
};

export default connect()(Detail);
