"use strict";
const React = require("react");
class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: ['abc', 'def'], newItem: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        console.log(event);
        let currentItems = this.state.items.slice();
        currentItems.push(event.target.value);
        this.setState({ items: currentItems });
    }
    handleChange(event) {
        console.log(event.target.value);
        this.setState({ newItem: event.target.value });
    }
    render() {
        return (React.createElement("div", null, 
            React.createElement("p", null, "I'm a list of tasks!"), 
            this.state.items.map((item, i) => React.createElement("p", {key: i}, item)), 
            React.createElement("form", {onSubmit: this.handleSubmit}, 
                React.createElement("input", {type: "text", value: this.state.newItem, onChange: this.handleChange}), 
                React.createElement("input", {type: "submit", value: "Add"}))));
    }
}
exports.TaskList = TaskList;
//# sourceMappingURL=TaskList.js.map