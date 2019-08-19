import React, { Component } from 'react';
import PlayerTable from '../utils/PlayerTable';
import { get } from 'https';

export default class GenerateTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: null,
    };

    this.constructTeams();
  }

  render() {
    const { teams } = this.state;

    if (teams.length) {
      return (
        <>
          {teams.map(team => (
            <PlayerTable team={team} />
          ))}
        </>
      );
    } else {
      return <>{!teams.length && <div>Generating...</div>}</>;
    }
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
      const vetoGroup = { players: [], vetoedPlayer };
      vetoGroup.players.push(
        players.filter(player => player.veto === vetoedPlayer),
      );
      vetoGroups.push(vetoGroup);
    });

    console.log(vetoGroups);
    return vetoGroups;
  }

  getRandomTeamIndex(numberOfTeams) {
    return Math.floor(Math.random() * numberOfTeams + 1) - 1;
  }

  hasTeamVetoedAnyPlayers(players, team) {
    return players.some(player => {
      team.vetos.includes(player.id);
    })
  }

  constructTeams() {
    const { players } = this.props;
    const teams = [{players: [], vetos: []}, {players: [], vetos: []}];
    const vetoGroups = this.createVetoGroups(players);
    
    for (let i = 0; i < vetoGroups.length; i++){
      const index = this.getRandomTeamIndex(teams);
      const chosenTeam = teams[index];

      if (!this.hasTeamVetoedAnyPlayers(vetoGroups.players, chosenTeam)) {
        chosenTeam.players = [...chosenTeam.players]
      }
    }
}
