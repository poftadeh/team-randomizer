import React, { Component } from 'react';

export default class GenerateTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };

    this.constructTeams();
  }

  render() {
    const { teams } = this.state;

    return <>{!teams.length && <div>Generating...</div>}</>;
  }

  createVetoGroups(players) {
    const vetoedPlayers = [];
    const vetoGroups = [];

    players.forEach(player => {
      if (!vetoedPlayers.includes(player.veto)) {
        vetoedPlayers.push(player.veto);
      }
    });

    vetoedPlayers.forEach(vetoedPlayer => {
      vetoGroups.push(
        players.filter(player => player.veto === vetoedPlayer),
      );
    });

    console.log(vetoGroups);
    return vetoGroups;
  }

  constructTeams() {
    const { players } = this.props;
    const teams = { teamOne: [], teamTwo: [] };

    const vetoGroups = this.createVetoGroups(players);
  }
}
