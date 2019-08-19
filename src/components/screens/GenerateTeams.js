import React, { Component } from 'react';
import PlayerTable from '../utils/PlayerTable';
import { get } from 'https';
import { cpus } from 'os';

export default class GenerateTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: null,
    };
  }

  render() {
    const { teams } = this.state;

    if (teams && teams.length > 0) {
      return (
        <>
          {teams.map((team, i) => (
            <>
              <h5>{`Team ${i + 1}`}</h5>
              <PlayerTable team={team} />
            </>
          ))}
        </>
      );
    } else if (teams && teams.length === 0) {
      return (
        <div className="alert alert-danger">
          No teams found with current settings
        </div>
      );
    } else {
      return (
        <>
          <div>Generating...</div>
        </>
      );
    }
  }

  componentDidMount() {
    try {
      this.constructTeams();
    } catch (e) {
      this.setState({ teams: [] });
    }
  }

  findCompatibleTeams(player, teams) {
    return teams.filter(
      team =>
        !team.vetos.includes(player.id) &&
        !team.players.find(teamPlayer => teamPlayer.id === player.veto),
    );
  }

  getAvailableTeam(player, teams) {
    let teamWithSameVetoAsPlayer;
    let teamWithFewestPlayers;

    let compatibleTeams = this.findCompatibleTeams(player, teams);

    if (compatibleTeams.length < 1) {
      throw new Error('Found no compatible teams for player');
    } else if (compatibleTeams.length > 1) {
      teamWithFewestPlayers =
        compatibleTeams[0].players.length < compatibleTeams[1].players.length
          ? compatibleTeams[0]
          : compatibleTeams[1];

      if (player.veto) {
        teamWithSameVetoAsPlayer = compatibleTeams.find(team =>
          team.vetos.includes(player.veto),
        );
      }
    } else {
      // there is only one possible team
      compatibleTeams = compatibleTeams[0];
    }

    return teamWithSameVetoAsPlayer || teamWithFewestPlayers || compatibleTeams;
  }

  constructTeams() {
    const { players } = this.props;
    const teams = [{ players: [], vetos: [] }, { players: [], vetos: [] }];

    // shuffle players
    players.sort((a, b) => 0.5 - Math.random());

    players.forEach(player => {
      const availableTeam = this.getAvailableTeam(player, teams);
      try {
        availableTeam.players.push(player);
      } catch (e) {
        console.log(e);
        console.log(JSON.stringify(availableTeam));
      }

      if (player.veto && availableTeam.vetos.indexOf(player.veto) === -1)
        availableTeam.vetos.push(player.veto);
    });
    console.log('t', teams);

    if (teams[0].players.length !== teams[1].players.length) {
      throw new Error('Team player counts are uneven');
    }

    this.setState({ teams });
  }
}
