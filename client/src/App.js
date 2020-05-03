import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './config/theme'
import './app.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import Login from './authentication/Login'
import Register from './authentication/Register'
import HomePage from './home/HomePage'
import { PrivateRoute } from './reusableComponents/PrivateRoute'
import { history } from './config/history'
import CreateChatGroup from './createChatGroup/CreateChatGroup';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute exact path='/create-chat-group' component={CreateChatGroup} />
              <PrivateRoute exact path='/' component={HomePage} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
