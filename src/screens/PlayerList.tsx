import React, { Component } from 'react';

export default class PlayerList extends Component {
  render(): JSX.Element {
    return (
      <>
        {this.players.map(player => (
          <div key={player.name}>{player.name}</div>
        ))}
      </>
    );
  }
}
