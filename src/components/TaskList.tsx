import * as React from "react";

export interface TaskListProps {
  break: boolean;
}

export interface TaskListState {
  items: string[];
  newItem: string;
  currentItem: number | null;
}

export class TaskList extends React.Component<TaskListProps, TaskListState> {

  constructor(props: TaskListProps) {
    super(props);
    this.state = {items: ['Do laundry', 'Empty bins'], newItem: '', currentItem: null};
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
    currentItems.splice(parseInt(event.currentTarget.value), 1);
    this.setState({items: currentItems});
  }

  componentWillReceiveProps(nextProps: TaskListProps) {
    if (this.props.break && !nextProps.break) {
      this.setState({currentItem: null});
    } else if (!this.props.break && nextProps.break) {
      this.setState({currentItem: Math.floor((Math.random() * this.state.items.length))});
    }
  }

  render() {
    let divClass = "list-group-item clearfix";
    return(
      <div>
        <div className="row mb-2">
          <div className="col">
            <ul className="list-group">
              { this.state.items.map((item: string, i: number) =>
                <div key={i} className={i == this.state.currentItem ? divClass + " active" : divClass}>
                  <div className="col">
                    {item}
                  </div>
                  <div className="col">
                    <button type="button" className="close" value={i} onClick={this.handleDelete}>&times;</button>
                  </div>
                </div>) }
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