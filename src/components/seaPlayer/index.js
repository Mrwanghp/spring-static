import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Hls from "hls.js";
import DPlayer from "react-dplayer";

function SeaNavBar(props) {
  const hls = new Hls();
  const player = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const {
    url,
    pic,
    play,
    ended,
    error
  } = props;
  const option = {
    video: {
      url,
      pic,
      type: "customHls",
      customType: {
        customHls: function (video, player) {
          hls.loadSource(video.src);
          hls.attachMedia(video);
        },
      },
    },
  };
  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false))
  }, [refresh]);
  useEffect(() => {
    setRefresh(true)
  }, [url]);
  const playering = () => {
    player.current.dp.on('play', () => play && play());
    player.current.dp.on('ended', () => ended && ended());
    player.current.dp.on('error', () => error && error());
  }
  useEffect(() => {
    playering();
    return ()=>{
      hls.destroy();
      player.current.dp.destroy();
     }
  }, [])
  return <div style={{ height: '6.633333rem' }}>
    {!refresh && <DPlayer
      style={{ height: '6.633333rem' }}
      ref={player}
      options={option}
    />}
  </div>;
}
SeaNavBar.propTypes = {
  url: PropTypes.string.isRequired,
  pic: PropTypes.string,
  play: PropTypes.func,
  ended: PropTypes.func,
  error: PropTypes.func,
};
export default SeaNavBar;
