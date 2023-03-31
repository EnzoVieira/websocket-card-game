import { useSocket } from "../context/SocketContext"

export default function Dashboard() {
  const { socket, userId, players } = useSocket()

  function handleSendCard(cardId: number, toPlayerId?: string) {
    socket?.emit("card", { cardId, fromPlayerId: userId, toPlayerId })
  }

  return (
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
          onClick={() => handleSendCard(2, "outro player")}
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
  )
}
