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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canv');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
var c = canvas.getContext('2d');
var circlesCount = 100;
var circles = [];

function Circle(x, y, dx, dy, radius, color) {
  var _this = this;

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function () {
    c.beginPath();
    c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = color;
    c.fillStyle = color;
    c.fill();
    c.stroke();
  };

  this.animate = function () {
    var accelerator = 1;
    var resistance = 0.9;
    if (_this.x + _this.radius + _this.dx >= canvas.width || _this.x + _this.radius <= 0) {
      _this.dx = -_this.dx * (resistance - 0.4);
    }
    if (_this.y + _this.radius + _this.dy >= canvas.height) {
      _this.dy = -_this.dy * resistance; // change direction + add air resistance
    } else {
      _this.dy += accelerator;
    }
    _this.x += _this.dx;
    _this.y += _this.dy;
    _this.draw();
  };
}

for (var i = 0; i < circlesCount; i++) {
  var radius = _utils2.default.randomIntFromRange(5, 40);
  var x = _utils2.default.randomIntFromRange(radius, canvas.width - radius);
  var y = _utils2.default.randomIntFromRange(radius, canvas.height - radius);
  var dx = _utils2.default.randomIntFromRange(-3, 3);
  var dy = _utils2.default.randomIntFromRange(-3, 4);
  var randomColor = _utils2.default.randomColor();
  circles.push(new Circle(x, y, dx, dy, radius, randomColor));
}
// animating
var animate = function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach(function (circle) {
    return circle.animate();
  });
};

var changeDirection = function changeDirection() {
  circles.forEach(function (circle) {
    circle.dx = -circle.dx + _utils2.default.randomIntFromRange(1, 3);
    circle.dy = -circle.dy + _utils2.default.randomIntFromRange(1, 30);
  });
};
// animate();
window.addEventListener('load', animate);

window.addEventListener('click', changeDirection);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomIntFromRange = function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomColor = function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map