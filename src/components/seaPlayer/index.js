import React, {
  useRef,
  useEffect
} from "react";
import {
  connect
} from "dva";
import PropTypes from "prop-types";
import Hls from "hls.js";
import DPlayer from "react-dplayer";

function SeaNavBar(props) {
  const player = useRef(null);
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
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
        },
      },
    },
  };
  const playering = () => {
  player.current.dp.on('play', () => play && play());
  player.current.dp.on('ended', () => ended && ended());
  player.current.dp.on('error', () => error && error());
}
useEffect(() => {
  playering();
}, [])
return <DPlayer style = {
  {
    height: '6.633333rem'
  }
}
ref = {
  player
}
options = {
  option
}
/>;
}
SeaNavBar.propTypes = {
  url: PropTypes.string.isRequired,
  pic: PropTypes.string,
  play: PropTypes.func,
  ended: PropTypes.func,
  error: PropTypes.func,
};
export default connect()(SeaNavBar);
