import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import index from '@/pages/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={index} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
