import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Index from './Pages/Index';
import Hiring from './Pages/Hiring';
import Layout from './components/Layout';

import threadsListStore from './stores/threadsListStore';
import hiringStore from './stores/hiringStore';
import commonStore from './stores/commonStore';

const stores = {
  commonStore,
  threadsListStore,
  hiringStore,
};

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Layout>
          <Router>
            <Switch>
              <Route path="/" exact component={Index}/>
              <Route path="/hiring/:threadId" exact component={Hiring}/>
            </Switch>
          </Router>
        </Layout>
      </Provider>
    );
  }
}

export default App;
