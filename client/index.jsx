import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
// We will need to import this from redux to create our store and make use of the thunk
import { createStore, applyMiddleware } from 'redux';
// Dont forget to import redux thunk
import thunk from 'redux-thunk';

// Getting our combined reducers
import reducers from './reducers/reducers';
import SearchIndex from './components/search/SearchIndex';
import MovieInfo from './components/movie/MovieInfo';
import App from './components/App';
import Register from './components/user/Register';
import SignIn from './components/user/SignInPage';
import UserInfo from './components/user/UserInfo';
import EditUserInfo from './components/user/EditUserInfo';
import Nav from './components/nav/Nav';



// Define our store
const store = createStore(reducers, applyMiddleware(thunk));


ReactDOM.render(
  // We need to wrap our app in provider to make use of redux
  // Passing our store to the provider
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}></Route>
      <Route path="/movieinfo" component={MovieInfo}></Route>
      <Route path="/user/register" component={Register}></Route>
      <Route path="/user/signin" component={SignIn}></Route>
      <Route path="/user/viewinfo" component={UserInfo}></Route>
      <Route path="/user/editinfo" component={EditUserInfo}></Route>
    </Router>
  </Provider>,
  document.querySelector('.react-container'));