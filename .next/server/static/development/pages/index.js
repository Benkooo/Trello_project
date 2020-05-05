module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/login/Login.tsx":
/*!************************************!*\
  !*** ./components/login/Login.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-sha256 */ "js-sha256");
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_sha256__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/benko/delivery/Tek3/Trello_project/components/login/Login.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const requestLogin = async (username, password) => {
  console.log("TEST");
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    username: username,
    password: password
  });

  try {
    var response = await (await fetch("http://localhost:8080/login", {
      method: "POST",
      body: raw,
      headers,
      redirect: "follow"
    })).json();

    if (response.success) {// SUCCESS
    } else {// ERROR
      }
  } catch (error) {
    // ERROR
    console.log(error);
  }
};

const Login = props => {
  const {
    0: username,
    1: setUsername
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const {
    0: password,
    1: setPassword
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  return __jsx("div", {
    style: {
      width: "100vh"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 9
    }
  }, __jsx("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h4",
    gutterBottom: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }, "Login"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    id: "standard-basic",
    label: "Username or email",
    autoFocus: true,
    value: username,
    onChange: sender => setUsername(sender.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 17
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    id: "standard-password-input",
    type: "password",
    label: "Password",
    style: {
      marginTop: "40px"
    },
    value: password,
    onChange: sender => setPassword(sender.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    color: "primary",
    style: {
      marginTop: "40px",
      justifyContent: "center"
    },
    onClick: () => requestLogin(username, Object(js_sha256__WEBPACK_IMPORTED_MODULE_2__["sha256"])(password)),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 21
    }
  }, "Login"), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    color: "primary",
    style: {
      marginTop: "10px"
    },
    onClick: () => props.setDisplayRegister(true),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 25
    }
  }, "Register >")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "./components/login/LoginController.tsx":
/*!**********************************************!*\
  !*** ./components/login/LoginController.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login */ "./components/login/Login.tsx");
/* harmony import */ var _Register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Register */ "./components/login/Register.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/benko/delivery/Tek3/Trello_project/components/login/LoginController.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const LoginController = () => {
  const {
    0: displayRegister,
    1: setDisplayRegister
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  return (//     {!displayRegister && (
    //     <Login setDisplayRegister={setDisplayRegister} />
    // )}
    __jsx("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        marginTop: "170px"
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }
    }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Card"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 13
      }
    }, !displayRegister && __jsx(_Login__WEBPACK_IMPORTED_MODULE_1__["default"], {
      setDisplayRegister: setDisplayRegister,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 21
      }
    }), displayRegister && __jsx(_Register__WEBPACK_IMPORTED_MODULE_2__["default"], {
      setDisplayRegister: setDisplayRegister,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 21
      }
    })))
  );
};

/* harmony default export */ __webpack_exports__["default"] = (LoginController);

/***/ }),

/***/ "./components/login/Register.tsx":
/*!***************************************!*\
  !*** ./components/login/Register.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-sha256 */ "js-sha256");
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_sha256__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/benko/delivery/Tek3/Trello_project/components/login/Register.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




const requestRegister = async (username, password, cPassword) => {
  if (username === "" || password === "" || cPassword === "" || password != cPassword) {
    // PROBLEME
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    username: username,
    password: password
  });

  try {
    const response = await (await fetch("http://localhost:8080/register", {
      method: "POST",
      body: raw,
      headers
    })).json();

    if (response.success) {// SUCCESS;
    } else {// ERROR;
      }
  } catch (error) {
    // ERROR;
    console.log(error);
  }
};

const Register = props => {
  const {
    0: username,
    1: setUsername
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const {
    0: password,
    1: setPassword
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const {
    0: cPassword,
    1: setCPassword
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  return __jsx("div", {
    style: {
      width: "100vh"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  }, __jsx("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Typography"], {
    variant: "h4",
    gutterBottom: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 17
    }
  }, "Register"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["TextField"], {
    id: "standard-basic",
    label: "Username or email",
    autoFocus: true,
    value: username,
    onChange: sender => setUsername(sender.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 17
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["TextField"], {
    id: "standard-password-input",
    type: "password",
    label: "Password",
    style: {
      marginTop: "40px"
    },
    value: password,
    onChange: sender => setPassword(sender.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 17
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["TextField"], {
    id: "standard-password-input",
    type: "password",
    label: "Password",
    style: {
      marginTop: "40px"
    },
    value: cPassword,
    onChange: sender => setCPassword(sender.target.value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 17
    }
  }), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    color: "primary",
    style: {
      marginTop: "40px",
      justifyContent: "center"
    },
    onClick: () => {
      requestRegister(username, Object(js_sha256__WEBPACK_IMPORTED_MODULE_2__["sha256"])(password), Object(js_sha256__WEBPACK_IMPORTED_MODULE_2__["sha256"])(cPassword));
      props.setDisplayRegister(false);
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 21
    }
  }, "Register"), __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    color: "primary",
    style: {
      marginTop: "10px"
    },
    onClick: () => props.setDisplayRegister(false),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 25
    }
  }, "<", " Back to login")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Register);

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_login_LoginController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/login/LoginController */ "./components/login/LoginController.tsx");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ "@material-ui/styles");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/benko/delivery/Tek3/Trello_project/pages/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["createStyles"])({
  root: {
    '& > *': {
      background: "red",
      height: "100%"
    }
  }
}));

const IndexPage = () => {
  const classes = useStyles();
  return __jsx("div", {
    className: classes.root,
    style: {
      height: "100%",
      textAlign: "center"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 5
    }
  }, __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }, __jsx(_components_login_LoginController__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 13
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);

/***/ }),

/***/ 4:
/*!*******************************!*\
  !*** multi ./pages/index.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/benko/delivery/Tek3/Trello_project/pages/index.tsx */"./pages/index.tsx");


/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/styles":
/*!**************************************!*\
  !*** external "@material-ui/styles" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ "js-sha256":
/*!****************************!*\
  !*** external "js-sha256" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-sha256");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map