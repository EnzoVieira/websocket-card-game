import express from "express"
import http from "http"
import { Socket } from "socket.io"

import { Game } from "./entities/game"
import { Player } from "./entities/Player"

interface ICardEvent {
  cardId: number
  fromPlayerId: string
  toPlayerId?: string
}

const app = express()
const httpServer = http.createServer(app)
const io: Socket = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
})

const game = new Game(io)

io.on("connection", (socket: Socket) => {
  socket.on("new-player", (id) => {
    const newPlayer = new Player(id, "Novo jogador", socket)
    game.addPlayer(newPlayer)

    const players = game.players.map((p) => ({
      id: p.id,
      name: p.name,
      coins: p.coins,
    }))

    io.emit("send-players", players)
  })

  socket.on("card", ({ cardId, fromPlayerId, toPlayerId }: ICardEvent) => {
    game.executeCard(cardId, fromPlayerId, toPlayerId)

    const players = game.players.map((p) => ({
      id: p.id,
      socketId: p.socket.id,
      name: p.name,
      coins: p.coins,
    }))
    console.log(players)
  })
})

httpServer.listen(3003)
