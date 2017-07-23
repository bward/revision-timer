"use strict";
const React = require("react");
const TaskList_1 = require("./TaskList");
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
class RevisionTimer extends React.Component {
    render() {
        return (React.createElement("div", null, 
            React.createElement("h1", null, "Morwenna's Revision Nerve Centre"), 
            React.createElement("p", null, "What's up"), 
            React.createElement(TaskList_1.TaskList, null)));
    }
}
exports.RevisionTimer = RevisionTimer;
//# sourceMappingURL=RevisionTimer.js.map