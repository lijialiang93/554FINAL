/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "server/public/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/movie.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/movie.jsx":
/*!**************************!*\
  !*** ./client/movie.jsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// import React from 'react';\n// import ReactDOM from 'react-dom';\n// import { Provider } from 'react-redux';\n// // We will need to import this from redux to create our store and make use of the thunk\n// import { createStore, applyMiddleware } from 'redux';\n// // Dont forget to import redux thunk\n// import thunk from 'redux-thunk';\n// // Getting our combined reducers\n// import reducers from './reducers/reducers';\n// // And our Recipe component\n// import Movie from './containers/Movie';\n\n// // Define our store\n// const store = createStore(reducers, applyMiddleware(thunk));\n\n// // This will be the entry point of our app\n// const App = () => {\n// \treturn (\n// \t// We will add our components here\n// \t\t<div>\n// \t\t\t<Movie />\n// \t\t</div>\n// \t);\n// };\n\n// ReactDOM.render(\n// \t// We need to wrap our app in provider to make use of redux\n// \t// Passing our store to the provider\n// \t<Provider store={store}>\n// \t\t<App />\n// \t</Provider>,\n// \tdocument.querySelector('.react-container'));\n\n\n//# sourceURL=webpack:///./client/movie.jsx?");

/***/ })

/******/ });