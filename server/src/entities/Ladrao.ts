import { Socket } from "socket.io"

import { Card } from "./Card"
import { Player } from "./Player"

import { ICardEventEmitDTO } from "../dtos/types"

export class Ladrao extends Card {
  constructor(gameSocket: Socket) {
    super(
      2,
      "Ladrão",
      "Roube duas moedas de alguém ou impeça outro ladrão",
      gameSocket
    )
  }

  public execute(fromPlayer: Player, toPlayer?: Player): void {
    if (!toPlayer) return

    const coinsStolen = toPlayer.removeCoins(2)

    fromPlayer.addCoins(coinsStolen)

    const data: ICardEventEmitDTO = {
      cardId: this.id,
      fromPlayerId: fromPlayer.id,
      toPlayerId: toPlayer.id,

      playersAtt: [
        {
          id: fromPlayer.id,
          name: fromPlayer.name,
          coins: fromPlayer.coins,
        },
        {
          id: toPlayer.id,
          name: toPlayer.name,
          coins: toPlayer.coins,
        },
      ],
    }

    this.gameSocket.emit("card", data)
  }
}
