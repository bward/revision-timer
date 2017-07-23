import * as React from "react";

export interface TaskListProps {
}

export interface TaskListState {
  items: string[];
  newItem: string;
}

export class TaskList extends React.Component<TaskListProps, TaskListState> {

  constructor(props: TaskListProps) {
    super(props);
    this.state = {items: ['Do laundry', 'Empty bins'], newItem: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let currentItems = this.state.items.slice();
    currentItems.push(this.state.newItem);
    this.setState({items: currentItems, newItem: ''});
    event.preventDefault();
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({newItem: event.currentTarget.value});
  }

  handleDelete(event: React.SyntheticEvent<HTMLButtonElement>) {
    let currentItems = this.state.items.slice();
    currentItems.splice(Number(event.currentTarget.value), 1);
    this.setState({items: currentItems});
  }

  render() {
    return(
      <div>
        <p>I'm a list of tasks!</p>
        <ul>
          { this.state.items.map((item: string, i: number) => <li key={i}>{item} <button value={i} onClick={this.handleDelete}>Delete</button></li>) }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newItem} onChange={this.handleChange} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}