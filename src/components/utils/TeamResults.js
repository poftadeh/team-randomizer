import React from 'react';
import PlayerTable from './PlayerTable';

export default ({ teams }) => {
  if (teams && teams.length > 0) {
    return (
      <>
        {teams.map((team, i) => (
            <PlayerTable key={i} team={team} teamNumber={i + 1}/>
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
    return <div>Generating...</div>;
  }
};
