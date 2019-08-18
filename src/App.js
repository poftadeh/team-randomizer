import React, { Component } from 'react';
import './App.css';
import PlayerCount from './components/screens/PlayerCount';
import PlayerList from './components/screens/PlayerList';
import { Player } from './types.js';

const Views = {
  PlayerCount,
  PlayerList,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      lineups: [],
      activeView: Views.PlayerCount,
    };

    this.createPlayers = this.createPlayers.bind(this);
  }
  render() {
    const { activeView } = this.state;
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        {activeView === Views.PlayerCount && (
          <PlayerCount createPlayers={this.createPlayers} />
        )}
        {activeView === Views.PlayerList && (
          <PlayerList players={this.state.players} />
        )}
      </div>
    );
  }

  createPlayers(number) {
    const players = [];
    for (let i = 1; i <= number; i++) {
      players.push(new Player({ id: i, name: `Player ${i}` }));
    }
    this.setState({ players });
    this.changeView(Views.PlayerList);
  }

  changeView(view) {
    this.setState({ activeView: view });
  }
}

export default App;
