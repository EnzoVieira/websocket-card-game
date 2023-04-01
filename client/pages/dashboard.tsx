import { useState } from "react"

import { useSocket } from "../context/SocketContext"

import { Modal } from "@/components/Modal"

import { IPlayer } from "@/dtos/types"

export default function Dashboard() {
  const { socket, userId, players } = useSocket()
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleSendCard(cardId: number, toPlayerId?: string) {
    socket?.emit("card", { cardId, fromPlayerId: userId, toPlayerId })
  }

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  function handleSelectModalOption(selected: IPlayer) {
    setIsModalOpen(false)
    handleSendCard(2, selected.id)
  }

  return (
    <>
      <Modal
        data={players.filter((p) => p.id !== userId)}
        renderKey="id"
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSelect={handleSelectModalOption}
      />

      <div>
        <h2>Ações</h2>

        <div>
          <button
            className="block bg-red-500 px-4 py-2 my-2"
            onClick={() => handleSendCard(1)}
          >
            Empresário
          </button>

          <button
            className="block bg-red-500 px-4 py-2 my-2"
            // onClick={() => handleSendCard(2, "outro player")}
            onClick={handleOpenModal}
          >
            Ladrão
          </button>
        </div>

        <h2>Jogadores</h2>

        <div>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                <p>{player.id}</p>
                <strong>{player.name}</strong> <span>{player.coins}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
