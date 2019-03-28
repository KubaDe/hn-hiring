import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Hiring from './Pages/Hiring';
import Index from './Pages/Index';

import commonStore from './stores/commonStore';
import hiringStore from './stores/hiringStore';
import threadsListStore from './stores/threadsListStore';

const stores = {
  commonStore,
  threadsListStore,
  hiringStore,
};

class App extends Component {
  public render() {
    return (
      <Provider {...stores}>
        <Layout>
          <Router>
            <Switch>
              <Route path="/" exact={true} component={Index} />
              <Route path="/hiring/:threadId" exact={true} component={Hiring} />
            </Switch>
          </Router>
        </Layout>
      </Provider>
    );
  }
}

export default App;
