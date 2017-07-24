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
ReactDOM.render(React.createElement(RevisionTimer_1.RevisionTimer, { workSeconds: 1500, breakSeconds: 300 }), document.getElementById("root"));


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
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row justify-content-center mb-2" },
                React.createElement("div", { className: "col-4 text-center" },
                    React.createElement("h2", null, this.formatTime(this.state.secondsRemaining)),
                    React.createElement("button", { type: "button", className: this.state.paused ? "btn btn-success" : "btn btn-secondary", onClick: () => this.setState({ paused: !this.state.paused }) }, this.state.paused ? "Start" : "Pause"))),
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
        let divClass = "list-group-item clearfix";
        return (React.createElement("div", null,
            React.createElement("div", { className: "row mb-2" },
                React.createElement("div", { className: "col" },
                    React.createElement("ul", { className: "list-group" }, this.state.items.map((item, i) => React.createElement("div", { key: i, className: i == this.state.currentItem ? divClass + " active" : divClass },
                        React.createElement("div", { className: "col" }, item),
                        React.createElement("div", { className: "col" },
                            React.createElement("button", { type: "button", className: "close", value: i, onClick: this.handleDelete }, "\u00D7"))))))),
            React.createElement("div", { className: "row align-items-center" },
                React.createElement("div", { className: "col" },
                    React.createElement("form", { className: "form-inline", onSubmit: this.handleSubmit },
                        React.createElement("input", { type: "text", className: "form-control mb-2 mr-sm-2 mb-sm-0", placeholder: "New Item", value: this.state.newItem, onChange: this.handleChange }),
                        React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Add"))))));
    }
}
exports.TaskList = TaskList;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map