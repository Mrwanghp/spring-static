import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "antd-mobile";
import SeaPlayer from "@/components/seaPlayer";
import SeaDrawer from "@/components/seaDrawer";
import { connect } from "dva";
import styles from "./index.less";
import { videoList } from "@/services/list";
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
    const params = { ids: vodId, ac: "detail" };
    const { data } = await videoList(params);
    const url = data.list[0].vod_play_url;
    const list = url.split("$$$")[1].split("#");
    const arr = list.map((item) => {
      const [name, url] = item.split("$");
      return { name, url };
    });
    setDetialData(data.list[0]);
    setLoading(false);
    setUrlList(arr);
  };
  const switchUrl = (index) => {
    setCurIndex(index);
  };
  const ended = () => {
    setCurIndex(curIndex + 1);
  };
  //open弹框
  const drawerTab = () => {
    setOpen(true);
  };
  useEffect(() => {
    initDetailData();
  }, []);
  const slot = () => {
    return (
      <div className={styles.content}>
        <div>
          <img src={detialData.vod_pic} alt="" />
          <div className={styles.content_right}>
            <div className={styles.titleName}>{detialData.vod_name}</div>
            <div className={styles.text}>主演：{detialData.vod_actor}</div>
            <div className={styles.text}>类型：{detialData.type_name}</div>
            <div className={styles.text}>
              <span>导演：{detialData.vod_director}</span>
              <span style={{ float: "right" }}>
                地区：{detialData.vod_area}
              </span>
            </div>
            <div className={styles.text}>
              <span>年份：{detialData.vod_year}</span>
              <span style={{ float: "right" }}>
                语言：{detialData.vod_lang}
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
  const List = () => {
    return (
      <div className="flex flex-wrap">
        {urlList.map((item, index) => (
          <div
            key={index}
            onClick={() => switchUrl(index)}
            className={`${styles.tvlist} ${
              index === curIndex ? styles.active : ""}`}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <ActivityIndicator toast={true} text="拼命加载中..." animating={loading} />
      {Boolean(urlList.length) && (
        <SeaPlayer
          url={urlList[curIndex].url}
          pic={detialData.vod_pic}
          ended={ended}
        />
      )}
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
        <List />
      </div>
    </div>
  );
}

Detail.propTypes = {};

export default connect()(Detail);
