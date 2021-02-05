import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Toast } from "antd-mobile";
import SeaPlayer from "@/components/seaPlayer";
import SeaDrawer from "@/components/seaDrawer";
import { connect } from "dva";
import styles from "./index.less";
import { listDetail } from "@/services/list";
import { separation } from '@/utils/common'; // 分割数组
function Detail(props) {
  const vodId = props.location.search.split("?")[1].split("=")[1];
  const scrollDom = useRef(null);
  const scrollMoreDom = useRef(null);
  const [open, setOpen] = useState(false); // 简介
  const [loading, setLoading] = useState(true); //initloading
  const [urlList, setUrlList] = useState([]); // 选集
  const [curIndex, setCurIndex] = useState(0); //
  const [urlMore, setUrlMore] = useState(false); // 查看更多And下载
  const [isDownLoad, setIsDownLoad] = useState(0); // 是否下载弹框
  const [downLoadList, setDownLoadList] = useState([]); //下载列表
  const [detialData, setDetialData] = useState({});
  // init
  const initDetailData = async () => {
    setLoading(true);
    const params = { vod_id: vodId };
    const { data } = await listDetail(params);
    setDetialData(data.details)
    setUrlList(data.playList)
    setDownLoadList(data.downloadList)
    setLoading(false);
  };
  //open弹框
  const drawerTab = () => {
    setOpen(true);
  };
  // 打开更多and下载弹框
  const openMoreDrawer =(type) => {
    setIsDownLoad(type)
    setUrlMore(true);
    scroll('separationActive', scrollMoreDom);
  }
  // 选集切换
  const switchUrl = (index) => {
    setCurIndex(index);
  };
  // 下载or选集
  const moreVideoUrl = (index) => {
    if (isDownLoad) {
      window.location.href = downLoadList[index].url;
    } else {
      setCurIndex(index);
      scroll('active', scrollDom);
    }
    setUrlMore(false);
  }
  // 播放结束自动++
  const ended = () => {
    setCurIndex(curIndex + 1);
  };
  const scroll = (className, Dom) => {
    setTimeout(()=>{
      const [ active ] = document.getElementsByClassName(styles[className]);
      const left = active.offsetLeft - (className === 'active' ? 13 : 0);
      Dom.current.scroll(left,0)
    })
  }
  // initdata
  useEffect(() => {
    initDetailData();
  }, []);
  //简介
  const introduction = () => {
    return (
      <div className={styles.content}>
        <div>
          <img src={detialData.vod_pic||'-'} alt="" />
          <div className={styles.content_right}>
            <div className={styles.titleName}>{detialData.vod_name||'-'}</div>
            <div className={styles.text}>主演：{detialData.vod_actor||'-'}</div>
            <div className={styles.text}>类型：{detialData.type_name||'-'}</div>
            <div className={styles.text}>
              <span>导演：{detialData.vod_director||'-'}</span>
              <span style={{ float: "right" }}>
                地区：{detialData.vod_area||'-'}
              </span>
            </div>
            <div className={styles.text}>
              <span>年份：{detialData.vod_year||'-'}</span>
              <span style={{ float: "right" }}>
                语言：{detialData.vod_lang||'-'}
              </span>
            </div>
          </div>
        </div>
        <div className={`clear ${styles.inner}`}>
          <div className={styles.inner_text}>{detialData.vod_content}</div>
        </div>
      </div>
    );
  };
  // 更多And下载
  const more = () =>{
    const [separaIdx, setSeparaIdx] = useState(0);
    const list = separation((urlList).map((v,i)=>({...v,i:i+1})), 50);
    const searchIdx = () => {
      let idx = 0;
      list.forEach((item, index) => {
      item.forEach((item)=> {
          if(item.i === curIndex+1) {
            idx = index 
          }
        })
      })
      setSeparaIdx(idx);
    }
    useEffect(() => {
      searchIdx();
    }, []);
      return (
        <div>
        <div className={styles.moreTitle}>{ isDownLoad ? '下载': '选集'}</div>
        <div ref={scrollMoreDom} className={styles.tag} >
              <div className={styles.tagInner}>
                {
                  list.map((item,index) => (
                    <div 
                      key={index}
                      onClick={() => setSeparaIdx(index)}
                      className={`${styles.separation} ${
                      index === separaIdx ? styles.separationActive : ""}`}
                      >
                      {item[0].i}-{item[item.length-1].i}
                    </div>
                  ))
                }
              </div>
        </div>
        <div className="flex flex-wrap">
          {list.length && list[separaIdx].map((item, index) => (
              <div
                style={{padding: 0, width: '16.5%'}}
                key={index}
                onClick={() => moreVideoUrl(item.i-1)}
                className={`${styles.tvlist} ${
                  item.i-1 === curIndex ? styles.active : ""}`}
              >
                {item.title}
              </div>
          ))}
        </div>
      </div>
      )
  }
  return (
    <div>
      <ActivityIndicator toast={true} text="拼命加载中..." animating={loading} />
      {!loading && <div>
        {(urlList.length ?  
          <SeaPlayer
            url={urlList[curIndex].url}
            pic={detialData.vod_pic}
            ended={ended}
          />
        : <div className={styles['error-log']}>暂无视频资源，抱歉！</div>)}
        <div>
          <div className={styles.title}>
            <span>{detialData.vod_name}</span>
            <span onClick={drawerTab} className={styles.introduction}> 简介</span>
            {urlList.length && <span onClick={()=>{openMoreDrawer(1)}} className={`mar-right-20 ${styles.introduction}`}>下载</span>}
          </div>
          {/* {detialData.vod_remarks} */}
          <div style={{height: '.5rem'}}></div>
          <div className={styles.collect}>
            <span className={styles.collectTitle}>选集</span>
            {urlList.length > 6 && <span onClick={()=>{openMoreDrawer(0)}} className={styles.collectMore}>查看更多</span>}
          </div>
          <div ref={scrollDom} className={styles.tag}>
              <div className={styles.tagInner}>
                {urlList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => switchUrl(index)}
                    className={`${styles.tvlist} ${
                      index === curIndex ? styles.active : ""}`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div> }
      <SeaDrawer
          height="60%"
          open={open}
          Slot={introduction}
          callback={() => {
            setOpen(false);
          }}
        />
      <SeaDrawer
          height="60%"
          open={urlMore}
          Slot={more}
          callback={() => {
            setUrlMore(false);
          }}
        />
    </div>
  );
}

Detail.propTypes = {};

export default connect()(Detail);
