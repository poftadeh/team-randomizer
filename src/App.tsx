import React, { Component } from 'react';
import './App.css';
import PlayerCount from './screens/PlayerCount';

class App extends Component {
  render(): JSX.Element {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <PlayerCount></PlayerCount>
      </div>
    );
  }
}

export default App;
