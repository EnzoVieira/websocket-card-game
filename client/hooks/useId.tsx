import { useEffect, useState } from "react"
import { parseCookies, setCookie } from "nookies"
import { v4 as uuidv4 } from "uuid"

export function useId() {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const { ["golpinho.id"]: savedId } = parseCookies()

    if (savedId) {
      setId(savedId)
    } else {
      const newId = uuidv4()

      setId(newId)
      setCookie(undefined, "golpinho.id", newId, {
        maxAge: 60 * 60 * 24, // 1 Day
      })
    }
  }, [])

  return id
}
