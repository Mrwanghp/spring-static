import React,{ Suspense, lazy } from 'react';
import { Router, Route } from 'dva/router';
import { CacheSwitch, CacheRoute } from 'react-cache-router';	 //所需包
const tabBar = lazy(()=> import('@/pages/tabBarPage'));
const detail = lazy(()=> import('@/pages/detail'));
function waitingComponent(Component) {
  return (props) => (
      <Suspense fallback={<div></div>}>
          <Component {...props} />
      </Suspense>
  );
}
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <CacheSwitch>
        <CacheRoute path="/" exact component={waitingComponent(tabBar)} />
        <Route path="/detail" component={waitingComponent(detail)} />
      </CacheSwitch>
    </Router>
  );
}

export default RouterConfig;
