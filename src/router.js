import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import index from '@/pages/index';
import tabBar from '@/pages/tabBarPage';;

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={tabBar} />
        <Route path="/index" exact component={index} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
