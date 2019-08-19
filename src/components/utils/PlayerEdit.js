import React from 'react';

export default ({
  currentPlayer,
  playerList,
  handleSelect,
  handleInputChange,
}) => {
  return (
    <>
      <input
        type="text"
        className="form-control"
        defaultValue={currentPlayer.name}
        onChange={handleInputChange}
      />
      <div className="input-group-append player-list">
        <select
          className="custom-select"
          onChange={handleSelect}
          defaultValue={currentPlayer.veto || null}
        >
          <option value={null} onChange={handleSelect}>
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
