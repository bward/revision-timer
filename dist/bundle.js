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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(2);
const RevisionTimer_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(RevisionTimer_1.RevisionTimer, { workSeconds: 15, breakSeconds: 5 }), document.getElementById("root"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const TaskList_1 = __webpack_require__(4);
class RevisionTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { secondsRemaining: this.props.workSeconds, break: false, paused: true };
    }
    formatTime(secondsRemaining) {
        let minutes = Math.floor(secondsRemaining / 60);
        let seconds = secondsRemaining % 60;
        return ("0" + String(minutes)).slice(-2) + ":" + ("0" + String(seconds)).slice(-2);
    }
    tick() {
        if (!this.state.paused) {
            this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
        }
        if (this.state.secondsRemaining < 0) {
            if (this.state.break) {
                this.setState({ secondsRemaining: this.props.workSeconds, break: false });
            }
            else {
                this.setState({ secondsRemaining: this.props.breakSeconds, break: true });
            }
        }
    }
    componentDidMount() {
        this.intervalId = setInterval(this.tick.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Morwenna's Revision Nerve Centre"),
            React.createElement("p", null, "I'm a timer!"),
            React.createElement("h2", null, this.formatTime(this.state.secondsRemaining)),
            React.createElement("button", { onClick: () => this.setState({ paused: !this.state.paused }) }, this.state.paused ? "Start" : "Pause"),
            React.createElement(TaskList_1.TaskList, { break: this.state.break })));
    }
}
exports.RevisionTimer = RevisionTimer;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: ['Do laundry', 'Empty bins'], newItem: '', currentItem: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleSubmit(event) {
        let currentItems = this.state.items.slice();
        currentItems.push(this.state.newItem);
        this.setState({ items: currentItems, newItem: '' });
        event.preventDefault();
    }
    handleChange(event) {
        this.setState({ newItem: event.currentTarget.value });
    }
    handleDelete(event) {
        let currentItems = this.state.items.slice();
        currentItems.splice(parseInt(event.currentTarget.value), 1);
        this.setState({ items: currentItems });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.break && !nextProps.break) {
            this.setState({ currentItem: null });
        }
        else if (!this.props.break && nextProps.break) {
            this.setState({ currentItem: Math.floor((Math.random() * this.state.items.length)) });
        }
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("p", null, "I'm a list of tasks!"),
            React.createElement("ul", null, this.state.items.map((item, i) => React.createElement("li", { key: i },
                item,
                " ",
                i == this.state.currentItem ? '(Do this!)' : '',
                " ",
                React.createElement("button", { value: i, onClick: this.handleDelete }, "Delete")))),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("input", { type: "text", value: this.state.newItem, onChange: this.handleChange }),
                React.createElement("input", { type: "submit", value: "Add" }))));
    }
}
exports.TaskList = TaskList;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map