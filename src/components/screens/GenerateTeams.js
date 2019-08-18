import React, {Component} from 'react';
import { createImmediatelyInvokedFunctionExpression } from 'typescript';

class GenerateTeams extends Component {
  consturctor(props){
    super(props);
    this.state = {
      teams: [],
    }

    this.constructTeams();
  }

  render() {
    const {teams} = this.state;

    return (
      <>
        {!teams && <div>Generating...</div>}
      </>
    );
  }

  createVetoGroups(playerList) {
    const vetoedPlayers = [];
    const vetoGroups = [];

    playerList.forEach(player => {
      if(!vetoedPlayers.includes(player.veto)) {
        vetoedPlayers.push(player.veto);
      }
    })

    vetoedPlayers.forEach(vetoedPlayer => {      
      vetoGroups.push(playerList.filter(player => {
        player.veto === vetoedPlayer;
      }));
    });
    
    console.log(vetoGroups);
    return vetoGroups;
  }

  constructTeams() {
    const { playerList } = this.props;
    const teams = {teamOne: [], teamTwo: []}; 

    const vetoGroups = this.createVetoGroups(playerList);
   

    

  }
}