import React, { Component } from 'react';
import './App.css';
import PlayerCount from './components/screens/PlayerCount';
import PlayerList from './components/screens/PlayerList';
import GenerateTeams from './components/screens/GenerateTeams';
import { Player } from './types.js';

const Views = {
  PlayerCount: Symbol('PlayerCount'),
  PlayerList: Symbol('PlayerList'),
  GenerateTeams: Symbol('GenerateTeams'),
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      lineups: [],
      activeView: Views.PlayerCount,
    };
    this.previousScreen = this.state.activeView;
    this.createPlayers = this.createPlayers.bind(this);
  }
  render() {
    const { activeView, players } = this.state;
    return (
      <div className="d-flex flex-column align-items-center mt-5 mx-auto col-lg-6">
        <h1 className="text-uppercase text-center mb-4">Team Randomizer</h1>
        {activeView === Views.PlayerCount && (
          <PlayerCount createPlayers={this.createPlayers} />
        )}
        {activeView === Views.PlayerList && (
          <PlayerList
            players={players}
            goToPreviousScreen={this.changeView.bind(this, Views.PlayerCount)}
            changeView={this.changeView.bind(this, Views.GenerateTeams)}
          />
        )}
        {activeView === Views.GenerateTeams && (
          <GenerateTeams
            players={players}
            goToPreviousScreen={this.changeView.bind(this, Views.PlayerList)}
          />
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
