import React, { Component } from 'react';
import PlayerEdit from '../utils/PlayerEdit';

export default class PlayerList extends Component {
  render() {
    return (
      <div>
        {this.props.players.map(player => (
          <div key={player.name} className="input-group mb-3">
            <PlayerEdit
              currentPlayer={player}
              playerList={this.props.players}
              handleSelect={e => {
                player.setVeto(e.target.value);
                console.log(e.target.value, player);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
