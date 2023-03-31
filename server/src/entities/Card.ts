import { Socket } from "socket.io"

import { Player } from "./Player"

export abstract class Card {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public gameSocket: Socket
  ) {
    this.name = name
    this.description = description
    this.gameSocket = gameSocket
  }

  public abstract execute(fromPlayer: Player, toPlayer: Player): void
}
