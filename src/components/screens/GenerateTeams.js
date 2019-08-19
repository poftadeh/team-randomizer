import React, { Component } from 'react';
import TeamResults from '../utils/TeamResults';

export default class GenerateTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: null,
    };
  }

  render() {
    const { teams } = this.state;
    return (
      <>
        <TeamResults teams={teams} />
        <button
          className="btn btn-lg btn-primary mb-3"
          onClick={this.props.goToPreviousScreen}
        >
          Back
        </button>
      </>
    );
  }

  componentDidMount() {
    try {
      this.constructTeams();
    } catch (e) {
      console.log(e, JSON.stringify(this.state.teams));
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
      console.log('t', teams, player);
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
    let sortedPlayers = [...players].sort((a, b) =>
      a.veto === null ? 1 : 0.5 - Math.random(),
    );

    sortedPlayers.forEach(player => {
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

    if (teams[0].players.length !== teams[1].players.length) {
      console.log('t', teams, sortedPlayers);
      throw new Error('Team player counts are uneven');
    }

    this.setState({ teams });
  }
}
