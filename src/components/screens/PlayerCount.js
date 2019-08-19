import React, { Component } from 'react';

export default class PlayerCount extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <>
        <h4 className="text-uppercase mb-4">Number of Players</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex flex-column align-items-center">
            <input
              type="number"
              name="countInput"
              className="form-control"
              min={2}
              max={20}
              defaultValue={6}
              required
            />
            <button className="btn btn-primary mt-4">Next</button>
          </div>
        </form>
      </>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const playerCount = e.target.elements.countInput.value;
    this.props.createPlayers(playerCount);
  }
}