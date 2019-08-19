import React from 'react';

export default ({ team, teamNumber }) => {
  return (
    <>
      <h5>{`Team ${teamNumber}`}</h5>
      <table className="table  w-50">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((player, index) => {
            return (
              <tr key={player.id}>
                <td>{player.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
