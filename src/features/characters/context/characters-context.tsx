import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Character } from '../data/schema'

type CharacterDialogType = 'create' | 'update' | 'delete' | 'import'

interface CharactersContextType {
  open: CharacterDialogType | null
  setOpen: (str: CharacterDialogType | null) => void
  currentRow: Character | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Character | null>>
}

const CharactersContext = React.createContext<CharactersContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TasksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CharacterDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Character | null>(null)
  return (
    <CharactersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CharactersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCharacters = () => {
  const charactersContext = React.useContext(CharactersContext)

  if (!charactersContext) {
    throw new Error('useCharacters has to be used within <CharactersContext>')
  }

  return charactersContext
}
