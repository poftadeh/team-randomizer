import React, { Component } from 'react';
import PlayerEdit from '../utils/PlayerEdit';

export default class PlayerList extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center container">
        <h4 className="mb-4">Configure Players</h4>
        {this.props.players.map(player => (
          <row>
            <div key={player.name} className="input-group mb-3 col-sm-12">
              <PlayerEdit
                currentPlayer={player}
                playerList={this.props.players}
                handleSelect={e => {
                  player.setVeto(e.target.value);
                  console.log(e.target.value, player);
                }}
              />
            </div>
          </row>
        ))}
        <div className="row justify-content-around mt-3">
          <button className="btn btn-primary">Back</button>
          <button className="btn btn-primary">Generate</button>
        </div>
      </div>
    );
  }
}
