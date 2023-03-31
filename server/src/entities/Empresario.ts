import { Socket } from "socket.io"

import { Card } from "./Card"
import { Player } from "./Player"

import { ICardEventEmitDTO } from "../dtos/types"

export class Empresario extends Card {
  constructor(gameSocket: Socket) {
    super(1, "Empresário", "Ganhe 3 moedas ou impeça um ladrão", gameSocket)
  }

  public execute(player: Player) {
    player.addCoins(3)

    const data: ICardEventEmitDTO = {
      cardId: this.id,
      fromPlayerId: player.id,

      playersAtt: [
        {
          id: player.id,
          name: player.name,
          coins: player.coins,
        },
      ],
    }

    this.gameSocket.emit("card", data)
  }
}
