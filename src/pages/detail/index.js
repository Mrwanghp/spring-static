import React, { useState, useEffect } from "react";
import { Icon } from "antd-mobile";
import SeaPlayer from "@/components/seaPlayer";
import SeaDrawer from "@/components/seaDrawer";
import { connect } from "dva";
import styles from "./index.less";
import { videoList } from "@/services/list";
function Detail(props) {
  console.log(props);
  const vodId = props.location.search.split("?")[1].split("=")[1];
  const [urlList, setUrlList] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [detialData, setDetialData] = useState({});
  const [open, setOpen] = useState(false);
  const initDetailData = async () => {
    const params = { ids: vodId, ac: "detail" };
    const { data } = await videoList(params);
    const url = data.list[0].vod_play_url;
    const list = url.split("$$$")[1].split("#");
    const arr = list.map((item) => {
      const [name, url] = item.split("$");
      return { name, url };
    });
    console.log(arr);
    setDetialData(data.list[0]);
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
            <div className={styles.titleName}>神奇女侠</div>
            <div className={styles.text}>主演：陈家华</div>
            <div className={styles.text}>类型：陈家华</div>
            <div className={styles.text}>
              <span>导演：王海朋</span>
              <span style={{float: "right" }}>
                地区：日本
              </span>
            </div>
            <div className={styles.text}>
              <span>年份：2023</span>
              <span style={{float: "right" }}>
                语言：英语
              </span>
            </div>
          </div>
        </div>
        <div className="clear">
          <div className={styles.content_text}>内容介绍</div>
          <div className={styles.inner}>内容</div>
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
            className={`${styles.tvlist} ${
              index === curIndex ? styles.active : ""
            }`}
            onClick={() => switchUrl(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      {Boolean(urlList.length) && (
        <SeaPlayer
          url={urlList[curIndex].url}
          pic={detialData.vod_pic}
          ended={ended}
        />
      )}
      <div>
        <div className={styles.title}>
          {detialData.vod_name}
          <span onClick={drawerTab} className={styles.introduction}>
            简介>
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
