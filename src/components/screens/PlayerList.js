import React, { Component } from 'react';
import PlayerEdit from '../utils/PlayerEdit';

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players,
    }
  }

  render() {
    const { goToPreviousScreen, changeView } = this.props;
    return (
      <div className="d-flex flex-column align-items-center container">
        <h4 className="mb-4 text-uppercase">Configure Players</h4>
        {this.props.players.map(player => (
          <div key={player.id} className="input-group mb-3 col-sm-12">
            <PlayerEdit
              currentPlayer={player}
              playerList={this.props.players}
              handleSelect={e => {
                player.setVeto(e.target.value);
              }}
              handleInputChange={e => {
                player.setName(e.target.value);
                this.setState({players: this.props.players})
              }}
            />
          </div>
        ))}
        <div className="d-flex justify-content-around mt-3">
          <button
            className="btn btn-lg btn-primary m-3"
            onClick={goToPreviousScreen}
          >
            Back
          </button>
          <button className="btn btn-lg btn-primary m-3" onClick={changeView}>
            Generate
          </button>
        </div>
      </div>
    );
  }
}
