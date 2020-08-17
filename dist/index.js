(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@schirrel/request/Request.js":
/*!***************************************************!*\
  !*** ./node_modules/@schirrel/request/Request.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Request; });\n//! Request.js\n//! authors : Alan Balen Schio - @schirrel\n//! license : MIT\n\nconst merge = (first, second) => Object.assign({}, first, second);\n\nconst GET = { method: \"GET\" };\nconst PUT = { method: \"PUT\" };\nconst POST = {\n  method: \"POST\",\n  headers: {\n    \"Content-type\": \"application/json; charset=UTF-8\",\n  },\n};\nconst DELETE = { method: \"DELETE\" };\n\nclass Request {\n\n   /**\n   * Method to convert object into search params into the URL\n   * @param {String} url\n   * @param {Object} params\n   * @returns the url with query params\n   */\n  static QueryURL(uri, params) {\n    let url = new URL(uri);\n    let urlParams = new URLSearchParams(params).toString();\n    url.search = urlParams;\n    return url;\n  }\n\n  static getResponseByType(response) {\n    \n    switch (response.type) {\n      case \"basic\":\n      case \"text\":\n        return response.text();\n      case \"json\":\n      case \"cors\":\n        return response.json();\n      default:\n        return response.body();\n    }\n  }\n  static getResponseByContentType(response) {\n    if (/(application\\/json)/.test(response.headers.get('content-type'))) {\n      return response.json();\n    } else if (/(text)/.test(response.headers.get('content-type'))) {\n      return response.text();\n    }\n    return response.body();   \n  }\n  \n   /**\n   * Method that valide response type to return the correct method\n   * @param {String} url\n   * @param {Object} options\n   * @returns the response body\n   */\n  static getResponse(response, resolve, reject) {\n    if (!!response.headers.get('content-type')) {\n      return this.getResponseByContentType(response)\n    }   \n      return this.getResponseByType(response)\n  };\n   /**\n   * Method that perform the request\n   * @param {String} url\n   * @param {Object} options\n   * @returns the request promisse\n   */\n  static async request(url, options) {\n    return new Promise(async (resolve, reject) => {\n      try {\n        if (options && options.body && typeof options.body !== \"string\") {\n          options.body = JSON.stringify(options.body);\n        }\n        // TODO Implements here interceptor before request\n        let response = await fetch(url, options);\n        if (response.status > 400) {\n          throw new Error(\n            JSON.stringify({\n              status: response.status,\n              statusText: response.statusText,\n            })\n          );\n        } else {\n          resolve(this.getResponse(response));\n        }\n      } catch (err) {\n        reject(err);\n      } finally {\n        // TODO Implements here interceptor after request done\n      }\n    });\n  }\n  /**\n   * Method to mount URL to request\n   * @param {String} url\n   * @param {Object} params\n   * @returns the url with query params\n   */\n  static mountURL(url, params) {\n    if (params && Object.keys(params).length) {\n      url = this.QueryURL(url, params);\n    }\n    return url;\n  }\n  /**\n   * Fetch API wrapper for GET method\n   * @param {String} url\n   * @param {Object} params\n   * @param {Object} options\n   * @returns Promise\n   */\n  static get(url, params = {}, options = {}) {\n    return this.request(this.mountURL(url, params), merge(GET, options));\n  }\n  /**\n   * Fetch API wrapper for POST method\n   * @param {String} url\n   * @param {Object} options\n   * @returns Promise\n   */\n  static post(url, options = {}) {\n    return this.request(url, merge(POST, options));\n  }\n  /**\n   * Fetch API wrapper for PUT method\n   * @param {String} url\n   * @param {Object} options\n   * @returns Promise\n   */\n  static put(url, options = {}) {\n    return this.request(url, merge(PUT, options));\n  }\n  /**\n   * Fetch API wrapper for DELETE method\n   * @param {String} url\n   * @param {Object} options\n   * @returns Promise\n   */\n  static delete(url, options = {}) {\n    return this.request(url, merge(DELETE, options));\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/@schirrel/request/Request.js?");

/***/ }),

/***/ "./src/ApiRequest.js":
/*!***************************!*\
  !*** ./src/ApiRequest.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return APIRequest; });\n/* harmony import */ var _schirrel_request_Request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schirrel/request/Request.js */ \"./node_modules/@schirrel/request/Request.js\");\n/* harmony import */ var _RequestObservable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RequestObservable.js */ \"./src/RequestObservable.js\");\n/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Util.js */ \"./src/Util.js\");\n\r\n\r\n\r\nclass APIRequest {\r\n\r\n    constructor(_url, globalRequests) {\r\n        this.uri = _url;\r\n        this._observable = new _RequestObservable_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](globalRequests);\r\n    }\r\n\r\n    loading(observable) {\r\n        this._observable.watch(observable)\r\n    }\r\n\r\n    perform(request) {\r\n        let id = Object(_Util_js__WEBPACK_IMPORTED_MODULE_2__[\"uniqueId\"])();\r\n        this._observable.updateRequests(id);\r\n        return new Promise((resolve, reject) => {\r\n            request.then((res => {\r\n                resolve(res);\r\n            })).catch(err => {\r\n                reject(err);\r\n            }).finally(() => {\r\n                this._observable.updateRequests(id, true);\r\n            });\r\n        })\r\n    }\r\n\r\n    /**\r\n     * @param {String} id\r\n     * @returns {Function} Promise\r\n     */\r\n    get(id) {\r\n        return this.perform(_schirrel_request_Request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(this.uri + '/' + id))\r\n    }\r\n    /**\r\n     * @returns {Function} Promise\r\n     */\r\n    all() {\r\n        return this.perform(_schirrel_request_Request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(this.uri));\r\n    }\r\n    /**\r\n * @param {Object} model\r\n * @returns {Function} Promise\r\n */\r\n\r\n    save(model) {\r\n        if (model.id) {\r\n            return this.perform(_schirrel_request_Request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].put(this.uri + '/' + model.id, { body: JSON.stringify(model) }));\r\n        } else\r\n            return this.perform(_schirrel_request_Request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(this.uri, { body: JSON.stringify(model) }));\r\n    }\r\n    /**\r\n     * \r\n     * @param {Object} params \r\n     * @returns Promise\r\n     */\r\n    pagination(params) {\r\n        params.page = params.page || 1;\r\n        params.limit = params.limit || 10;\r\n        return this.perform(_schirrel_request_Request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(`${this.uri}/pagination`, params));\r\n    }\r\n    /**\r\n     * \r\n     * @param {Object} params \r\n     * @returns Promise\r\n     */\r\n    search(params) {\r\n        return this.perform(_schirrel_request_Request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(this.uri + '/search', params))\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/ApiRequest.js?");

/***/ }),

/***/ "./src/RequestObservable.js":
/*!**********************************!*\
  !*** ./src/RequestObservable.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RequestObservable; });\n/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ \"./src/Util.js\");\n\r\n\r\nclass RequestObservable {\r\n\r\n    constructor(parent) {\r\n        this.requests = new Set();\r\n        this.observables = new Map();\r\n        this.parent = parent;\r\n        this._identifier = `RequestObservable-${Object(_Util_js__WEBPACK_IMPORTED_MODULE_0__[\"uniqueId\"])()}`;\r\n    }\r\n\r\n    watch(observable) {\r\n        let id = Object(_Util_js__WEBPACK_IMPORTED_MODULE_0__[\"uniqueId\"])();\r\n        this.observables.set(id, observable)\r\n        return id;\r\n    }\r\n    callObservables() {\r\n        for (var [key, value] of this.observables) {\r\n            value(!!this.requests.size);\r\n        }\r\n    }\r\n\r\n    updateRequests(id, remove) {\r\n        this.parent && this.parent.updateRequests && this.parent.updateRequests(id, remove)\r\n        if (remove) {\r\n            this.requests.delete(id);\r\n        } else {\r\n            this.requests.add(id);\r\n        }\r\n        this.callObservables();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/RequestObservable.js?");

/***/ }),

/***/ "./src/Util.js":
/*!*********************!*\
  !*** ./src/Util.js ***!
  \*********************/
/*! exports provided: uniqueId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uniqueId\", function() { return uniqueId; });\n\r\nconst uniqueId  = () =>'_' + Math.random().toString(36).substr(2, 9);\n\n//# sourceURL=webpack:///./src/Util.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ApiRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiRequest.js */ \"./src/ApiRequest.js\");\n\r\n /* harmony default export */ __webpack_exports__[\"default\"] = (_ApiRequest_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
});