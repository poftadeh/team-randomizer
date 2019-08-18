import React from 'react';

export default props => {
  const { playerName, playerList } = props;
  return (
    <>
      <input type="text" class="form-control" defaultValue={playerName} />
      <div class="input-group-append">
        <select class="custom-select">
          <option value={null} selected>Veto</option>
          {playerList.map(
            player =>
              player.name !== playerName && (
                <option value={player.name}>{player.name}</option>
              ),
          )}
        </select>
      </div>
    </>
  );
};
