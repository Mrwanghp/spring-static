import React, { useState, useEffect } from "react";
import { Icon } from 'antd-mobile';
import SeaPlayer from "@/components/seaPlayer";
import { connect } from "dva";
import styles from "./index.less";
import { videoList } from "@/services/list";
function Detail(props) {
  console.log(props);
  const vodId = props.location.search.split('?')[1].split('=')[1];
  const [urlList, setUrlList] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [detialData, setDetialData] = useState({});
  const initDetailData = async () => {
    const params = { ids: vodId, ac: "detail" };
    const { data } = await videoList(params);
    const url = data.list[0].vod_play_url;
    const list = url.split("$$$")[1].split("#");
    const arr = list.map((item) => {
      const [name, url] = item.split("$");
      return { name, url };
    });
    console.log(arr)
    setDetialData(data.list[0]);
    setUrlList(arr);
  };
  const switchUrl = (index) => {
    setCurIndex(index);
  };
  const ended = () => {
    setCurIndex(curIndex + 1);
  }
  useEffect(() => {
    initDetailData();
  }, []);
  const List = () => {
    return <div className="flex flex-wrap">
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
  }
  return (
    <div>
      {Boolean(urlList.length) && <SeaPlayer url={urlList[curIndex].url} pic={detialData.vod_pic} ended={ended} />}
      {(
        <div>
          <div className={styles.title}>{detialData.vod_name}</div>
          <List/>
        </div>
      )}
    </div>
  );
}

Detail.propTypes = {};

export default connect()(Detail);
