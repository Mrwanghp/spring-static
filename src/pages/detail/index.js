import React, { useState, useEffect } from "react";
import { ActivityIndicator, Toast } from "antd-mobile";
import SeaPlayer from "@/components/seaPlayer";
import SeaDrawer from "@/components/seaDrawer";
import { connect } from "dva";
import styles from "./index.less";
import { listDetail } from "@/services/list";
function Detail(props) {
  console.log(props);
  const vodId = props.location.search.split("?")[1].split("=")[1];
  const [loading, setLoading] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [detialData, setDetialData] = useState({});
  const [open, setOpen] = useState(false);
  // init
  const initDetailData = async () => {
    setLoading(true);
    const params = { vod_id: vodId };
    const { data } = await listDetail(params);
    setDetialData(data.details)
    setUrlList(data.playList)
    // setUrlList(data.downloadList)
    setLoading(false);
  };
  //open弹框
  const drawerTab = () => {
    setOpen(true);
  };
  const switchUrl = (index) => {
    setCurIndex(index);
  };
  const ended = () => {
    setCurIndex(curIndex + 1);
  };
  useEffect(() => {
    initDetailData();
  }, []);
  //简介
  const slot = () => {
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
  return (
    <div>
      <ActivityIndicator toast={true} text="拼命加载中..." animating={loading} />
      { !loading && (urlList.length ?  
        <SeaPlayer
          url={urlList[curIndex].url}
          pic={detialData.vod_pic}
          ended={ended}
        />
      : <div className={styles['error-log']}>暂无视频资源，抱歉！</div>)}
      <div>
        <div className={styles.title}>
          <span>{detialData.vod_name}</span>
          <span onClick={drawerTab} className={styles.introduction}>
            {detialData.vod_name && '简介>'}
          </span>
        </div>
        <SeaDrawer
          height="60%"
          open={open}
          Slot={slot}
          callback={() => {
            setOpen(false);
          }}
        />
        <div className="flex flex-wrap">
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
  );
}

Detail.propTypes = {};

export default connect()(Detail);
