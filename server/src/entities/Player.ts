import { Socket } from "socket.io"

export class Player {
  public coins: number

  constructor(public id: string, public name: string, public socket: Socket) {
    this.coins = 0
    this.id = id
    this.name = name
    this.socket = socket
  }

  addCoins(coins: number) {
    this.coins += coins
  }

  // Remove coins from player and
  // returns the quantity that was successfully removed
  removeCoins(coins: number) {
    if (this.coins - coins < 0) {
      const coinsToLose = this.coins
      this.coins = 0

      return coinsToLose
    }

    this.coins -= coins

    return 2
  }
}
