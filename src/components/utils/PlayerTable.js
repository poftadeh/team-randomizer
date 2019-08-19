import React from 'react';

export default props => {
  const { players: team } = props;

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Player</th>
          <th scope="col">Veto</th>
        </tr>
      </thead>
      <tbody>
        {team.map(player => {
          return (
            <tr key={player.id}>
              <th scope="row">{player.id}</th>
              <td>{player.name}</td>
              <td>{player.veto}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
