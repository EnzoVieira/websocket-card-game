export interface ICardEventEmitDTO {
  cardId: number
  fromPlayerId: string
  toPlayerId?: string
  playersAtt: {
    id: string
    name: string
    coins: number
  }[]
}
