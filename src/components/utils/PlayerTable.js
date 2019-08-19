import React from 'react';

export default ({ team, teamNumber }) => {
  return (
    <>
      <h5>{`Team ${teamNumber}`}</h5>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Player</th>
            <th scope="col">Veto</th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((player, index) => {
            return (
              <tr key={player.id}>
                <th scope="row">{index + 1}</th>
                <td>{player.name}</td>
                <td>{player.veto || 'None'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
