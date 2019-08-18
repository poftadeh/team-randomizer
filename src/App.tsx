import React, { Component } from 'react';
import './App.css';
import PlayerCount from './screens/PlayerCount';
import PlayerList from './screens/PlayerList';

enum Views {
  PlayerCount,
  PlayerList,
}

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
  render(): JSX.Element {
    const { activeView } = this.state;
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        {activeView === Views.PlayerCount && (
          <PlayerCount setPlayers={this.createPlayers} />
        )}
        {activeView === Views.PlayerList && <PlayerList />}
      </div>
    );
  }

  createPlayers(number): void {
    const players = [];

    for (let i = 0; i < number; i++) {
      players.push({ name: `Player ${i}`, veto: '' });
    }

    this.setState({ players });
    this.changeView(Views.PlayerList);
  }

  changeView(view): void {
    this.setState({ activeView: view });
  }
}

export default App;
