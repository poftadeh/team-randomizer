export class Player {
  constructor({id, name}={}) {
    this.id = id;
    this.name = name;
    this.veto = null;
  }

  setName(name) {
    this.name = name;
  }

  setVeto(playerId) {
    this.veto = Number(playerId) || null;
  }
}