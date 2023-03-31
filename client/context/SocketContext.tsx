import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { io, Socket } from "socket.io-client"

import { useId } from "@/hooks/useId"
import { IPlayer } from "../dtos/types"

interface IContext {
  userId: string | null
  socket?: Socket

  players: IPlayer[]
}

interface ISocketProvider {
  children: ReactNode
}

interface ICardEventDTO {
  cardId: number
  fromPlayerId: string
  toPlayerId?: string
  playersAtt: IPlayer[]
}

const SocketContext = createContext({} as IContext)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }: ISocketProvider) => {
  const userId = useId()
  const [socket, setSocket] = useState<Socket>()
  const [players, setPlayers] = useState<IPlayer[]>([])

  const connectSocket = useCallback(() => {
    const newSocket = io("ws://localhost:3003")

    newSocket.on("connect", () => {
      setSocket(newSocket)
    })

    newSocket.on("send-players", (data: IPlayer[]) => {
      setPlayers(data)
    })

    // Event triggered when some card is used in game
    newSocket.on("card", (data: ICardEventDTO) => {
      setPlayers((prevState) => {
        const newPlayers = prevState.map((player) => {
          if (player.id === data.playersAtt[0].id) {
            return data.playersAtt[0]
          }

          if (data.playersAtt[1] && player.id === data.playersAtt[1].id) {
            return data.playersAtt[1]
          }

          return player
        })

        return newPlayers
      })

      console.log(data)
    })

    if (userId) {
      newSocket.emit("new-player", userId)
    }

    return newSocket
  }, [userId])

  useEffect(() => {
    const newSocket = connectSocket()

    return () => {
      newSocket.disconnect()
    }
  }, [connectSocket])

  const contextValue = useMemo(
    () => ({ socket, userId, players }),
    [socket, userId, players]
  )

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}
