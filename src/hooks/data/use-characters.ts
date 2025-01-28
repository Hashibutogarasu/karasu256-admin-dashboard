/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { useKarasu256API } from "../use-karasu256-api"
import { Character } from "@karasu-lab/karasu256-api-client"

export function useCharacters() {
  const api = useKarasu256API()
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setIsLoading] = useState(true)
  const [__, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (loading && api.characters) {
      api.characters.charactersControllerGet({
        query: {}
      })
        .then((characters) => {
          setCharacters(characters)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    }
  }, [api.characters, loading])

  return characters;
}