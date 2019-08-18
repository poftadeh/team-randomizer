import React from 'react';

export default props => {
  const { currentPlayer, playerList, handleSelect } = props;
  return (
    <>
      <input
        type="text"
        className="form-control"
        defaultValue={currentPlayer.name}
      />
      <div className="input-group-append">
        <select className="custom-select" onChange={handleSelect}>
          <option value={-1}  onChange={handleSelect}>
            No Veto
          </option>
          {playerList
            .filter(player => player !== currentPlayer)
            .map(player => {
              return (
                <option
                  key={player.id}
                  value={player.id}
                  onChange={handleSelect}
                >
                  {player.name}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
};
