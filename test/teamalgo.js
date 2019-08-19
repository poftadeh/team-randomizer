function getAvailableTeam(player, teams) {
  let teamWithSameVetoAsPlayer;
  let teamWithFewestPlayers;

  const teamsNotVetoingPlayer = teams.filter(
    team => !team.vetos.includes(player.id),
  );

  if (teamsNotVetoingPlayer.length < 1) {
    throw new Error('Found no legal team slot for player');
  } else if (teamsNotVetoingPlayer.length > 1) {
    teamWithFewestPlayers =
      teamsNotVetoingPlayer[0].players.length <
      teamsNotVetoingPlayer[1].players.length
        ? teamsNotVetoingPlayer[0]
        : teamsNotVetoingPlayer[1];

    if (player.veto) {
      teamWithSameVetoAsPlayer = teamsNotVetoingPlayer.find(team =>
        team.vetos.includes(player.veto),
      );
    }
  }

  return (
    teamWithSameVetoAsPlayer || teamWithFewestPlayers || teamsNotVetoingPlayer
  );
}

function constructTeams() {
  const teams = [{ players: [], vetos: [] }, { players: [], vetos: [] }];

  // shuffle players
  //players.sort((a, b) => 0.5 - Math.random());

  players.forEach(player => {
    const availableTeam = getAvailableTeam(player, teams);
    console.log(
      'availbleteam',
      availableTeam,
      'teams',
      teams,
      'player',
      player,
    );
    availableTeam.players.push(player);

    if (player.veto && availableTeam.vetos.indexOf(player.veto) === -1)
      availableTeam.vetos.push(player.veto);
  });
  console.log('t', teams);

  setState({ teams });
}

const players = [
  {
    name: 'Player 1',
    id: 1,
    veto: null,
  },
  {
    name: 'Player 2',
    id: 2,
    veto: null,
  },
  {
    name: 'Player 3',
    id: 3,
    veto: 1,
  },
  {
    name: 'Player 4',
    id: 4,
    veto: 2,
  },
  {
    name: 'Player 5',
    id: 5,
    veto: 2,
  },
  {
    name: 'Player 6',
    id: 6,
    veto: null,
  },
  {
    name: 'Player 7',
    id: 7,
    veto: null,
  },
  {
    name: 'Player 8',
    id: 8,
    veto: null,
  },
  {
    name: 'Player 9',
    id: 9,
    veto: null,
  },
  {
    name: 'Player 10',
    id: 10,
    veto: null,
  },
];

constructTeams();
