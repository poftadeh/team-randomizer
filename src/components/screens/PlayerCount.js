import React, { Component } from 'react';

export default class PlayerCount extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div className="player-count-screen d-flex flex-column">
        <h4 className="text-uppercase mt-4">Number of Players:</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex flex-column align-items-center mt-4">
            <input
              type="number"
              name="countInput"
              className="form-control player-count-screen__input"
              min={2}
              max={20}
              defaultValue={6}
              required
            />
            <button className="btn btn-lg btn-primary mt-4">Next</button>
          </div>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const playerCount = e.target.elements.countInput.value;
    this.props.createPlayers(playerCount);
  }
}
