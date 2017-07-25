import * as React from "react";

export interface TaskListProps {
  break: boolean;
}

export interface TaskListState {
  tasks: string[];
  newItem: string;
  currentItem: number | null;
}

export class TaskList extends React.Component<TaskListProps, TaskListState> {

  constructor(props: TaskListProps) {
    super(props);
    this.state = {tasks: this.getInitialTasks(), newItem: '', currentItem: null};
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderTask = this.renderTask.bind(this);
  }

  getInitialTasks(): string[] {
    let taskString = localStorage.getItem('tasks');
    let tasks: string[];
    if(taskString == undefined) {
      tasks = ['Do laundry', 'Empty bins'];
    } else {
      tasks = JSON.parse(taskString);
    }
    return tasks;
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let newTasks = this.state.tasks.slice();
    newTasks.push(this.state.newItem);
    this.setState({tasks: newTasks, newItem: ''});
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    event.preventDefault();
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({newItem: event.currentTarget.value});
  }

  handleDelete(event: React.SyntheticEvent<HTMLButtonElement>) {
    let newTasks = this.state.tasks.slice();
    newTasks.splice(parseInt(event.currentTarget.value), 1);
    this.setState({tasks: newTasks});
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  componentWillReceiveProps(nextProps: TaskListProps) {
    if (this.props.break && !nextProps.break) {
      this.setState({currentItem: null});
    } else if (!this.props.break && nextProps.break) {
      this.setState({currentItem: Math.floor((Math.random() * this.state.tasks.length))});
    }
  }

  renderTask(item: string, key: number) {
    let divClass = "list-group-item clearfix";
    return(
      <div key={key} className={key == this.state.currentItem ? divClass + " active" : divClass}>
        <div className="col">
          {item}
        </div>
        <div className="col">
          <button type="button" className="close" value={key} onClick={this.handleDelete}>&times;</button>
        </div>
      </div>
    )
  }


  render() {
    return(
      <div>
        <div className="row mb-2">
          <div className="col">
            <ul className="list-group">
              { this.state.tasks.map(this.renderTask) }
            </ul>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="New Item" value={this.state.newItem} onChange={this.handleChange} />
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}