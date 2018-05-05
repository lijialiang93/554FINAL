import React from 'react';
import ReactDOM from 'react-dom';
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
import { Router, Route, IndexRoute, hashHistory } from 'react-router';



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
    </Router>
  </Provider>,
  document.querySelector('.react-container'));