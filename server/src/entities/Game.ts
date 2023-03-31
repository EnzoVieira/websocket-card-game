import { Socket } from "socket.io"

import { Player } from "./Player"

import { Empresario } from "./Empresario"
import { Ladrao } from "./Ladrao"

interface ICard {
  name: string
}

export class Game {
  public players: Player[]
  private cards: ICard[]
  private gameSocket: Socket

  constructor(socket: Socket) {
    this.players = []
    this.cards = []
    this.gameSocket = socket
  }

  private searchPlayer(newPlayer: Player) {
    const playerFinded = this.players.find(
      (player) => player.id === newPlayer.id
    )

    return playerFinded
  }

  // Updates playerInMemory socket and reassign reference of newPlayer
  private updateSocket(newPlayer: Player, playerInMemory: Player) {
    playerInMemory.socket = newPlayer.socket
    newPlayer = playerInMemory
  }

  addPlayer(player: Player) {
    if (!player.id) return

    const playerAlreadyExists = this.searchPlayer(player)
    if (playerAlreadyExists) {
      this.updateSocket(player, playerAlreadyExists)
      return
    }

    this.players.push(player)
  }

  executeCard(cardId: number, fromPlayerId: string, toPlayerId?: string) {
    const fromPlayerFinded = this.players.find((p) => p.id === fromPlayerId)
    const toPlayerFinded = this.players.find((p) => p.id === toPlayerId)

    if (!fromPlayerFinded) {
      return
    }

    switch (cardId) {
      case 1:
        const empresario = new Empresario(this.gameSocket)

        empresario.execute(fromPlayerFinded)
        break

      case 2:
        const ladrao = new Ladrao(this.gameSocket)

        ladrao.execute(fromPlayerFinded, toPlayerFinded)

      default:
        break
    }
  }
}
