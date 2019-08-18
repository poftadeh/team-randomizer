import React, { Component } from 'react';

export default class PlayerCount extends Component {
  render(): JSX.Element {
    return (
      <>
        <h4 className="text-uppercase mb-4">Number of Players</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex flex-column align-items-center">
            <input
              type="number"
              className="form-control col-4"
              max={20}
              required
            />
            <button className="btn btn-primary mt-4">Next</button>
          </div>
        </form>
      </>
    );
  }

  handleSubmit(e): void {
    e.preventDefault();
    const playerCount: number = e.target.elements.option.value;
    this.props.createPlayers(playerCount);
  }
}
