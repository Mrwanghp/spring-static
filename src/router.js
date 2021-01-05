import React from 'react';
import { Router, Route } from 'dva/router';
import detail from '@/pages/detail';
import tabBar from '@/pages/tabBarPage';
import { CacheSwitch, CacheRoute } from 'react-cache-router';	 //所需包
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <CacheSwitch>
        <CacheRoute path="/" exact component={tabBar} />
        <Route path="/detail" component={detail} />
      </CacheSwitch>
    </Router>
  );
}

export default RouterConfig;
