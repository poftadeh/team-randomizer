import React, { Component } from 'react';
import './App.css';
import PlayerCount from './components/screens/PlayerCount';
import PlayerList from './components/screens/PlayerList';

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

    for (let i = 0; i < number; i++) {
      players.push({ id: i, name: `Player ${i + 1}`, veto: null });
    }

    this.setState({ players });
    this.changeView(Views.PlayerList);
  }

  changeView(view) {
    this.setState({ activeView: view });
  }

  setPlayerAttribute({ playerId, attribute, value }) {
    const foundPlayer = this.state.players.find(
      player => player.id === playerId,
    );
    foundPlayer[attribute] = value;
  }
}

export default App;
