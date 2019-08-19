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
      console.log(e);
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
    console.log('unsorted', players);
    let sortedPlayers = [...players].sort((a, b) => {
      if (!a.veto) {
        return -1;
      } else if (!b.veto) {
        return 1;
      } else {
        return !a.veto || a.veto > b.veto ? -1 : 1;
      }
    });

    console.log('sorted', sortedPlayers);
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

    this.setState({ teams });
  }
}
