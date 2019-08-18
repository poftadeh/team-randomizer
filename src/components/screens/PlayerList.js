import React, { Component } from 'react';
import PlayerEdit from '../utils/PlayerEdit';

export default class PlayerList extends Component {
  render() {
    return (
      <div>
        {this.props.players.map(player => (
          <div key={player.name} class="input-group mb-3">
            <PlayerEdit playerName={player.name} playerList={this.props.players} />
          </div>
        ))}
      </div>
    );
  }
}
