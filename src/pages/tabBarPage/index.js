/*
 * @Author: wang
 * @Date: 2020-12-30 16:43:39
 * @LastEditTime: 2020-12-30 17:35:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\pages\tabbar\index.js
 */

import React, { useState } from 'react';
import { TabBar } from 'antd-mobile';
import { connect } from 'dva';
function tabBarPage() {
  const [selectedTab, setSelectedTab] = useState('redTab');
  return (
    <div >
    <div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={false}
        >
          <TabBar.Item
            title="Life"
            key="Life"
            // icon={}
            // selectedIcon={}
            selected={selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
                setSelectedTab('blueTab')
            }}
            data-seed="logId"
          >
            133223321
          </TabBar.Item>
          <TabBar.Item
            // icon={ }
            // selectedIcon={ }
            title="Koubei"
            key="Koubei"
            badge={'new'}
            selected={selectedTab === 'redTab'}
            onPress={() => {
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
