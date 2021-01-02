/*
 * @Author: wang
 * @Date: 2020-12-30 16:43:39
 * @LastEditTime: 2020-12-30 17:35:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\pages\tabbar\index.js
 */

import React, { useState } from 'react';
import { TabBar, Toast } from 'antd-mobile';
import { connect } from 'dva';
import mine from '@/assets/mine.png';
import mineActive from '@/assets/mine-active.png';
import index from '@/assets/index.png';
import indexActive from '@/assets/index-active.png';
import IndexPage from '@/pages/index'
function tabBarPage() {
  const [selectedTab, setSelectedTab] = useState('blueTab');
  return (
    <div >
      <img src="" alt="" />
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={false}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={<img style={{ width: '.6rem', height: '.6rem' }} src={index} alt="" />}
            selectedIcon={<img style={{ width: '.6rem', height: '.6rem' }} src={indexActive} alt="" />}
            selected={selectedTab === 'blueTab'}
            onPress={() => {
              setSelectedTab('blueTab')
            }}
            data-seed="logId"
          >
            <IndexPage />
          </TabBar.Item>
          <TabBar.Item
            icon={<img style={{ width: '.6rem', height: '.6rem' }} src={mine} alt="" />}
            selectedIcon={<img style={{ width: '.6rem', height: '.6rem' }} src={mineActive} alt="" />}
            title="我的"
            key="Koubei"
            selected={selectedTab === 'redTab'}
            onPress={() => {
              Toast.fail('功能暂未开放！', 1);
              return;
              setSelectedTab('redTab')
            }}
            data-seed="logId1"
          >
            18188484484884
          </TabBar.Item>
        </TabBar>
      </div>
    </div>
  );
}

tabBarPage.propTypes = {
};

export default connect()(tabBarPage);
