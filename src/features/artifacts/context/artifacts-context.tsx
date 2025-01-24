import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Artifact } from '../data/schema'

type ArtifactsDialogType = 'create' | 'update' | 'delete' | 'import'

interface ArtifactsContextType {
  open: ArtifactsDialogType | null
  setOpen: (str: ArtifactsDialogType | null) => void
  currentRow: Artifact | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Artifact | null>>
}

const ArtifactsContext = React.createContext<ArtifactsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ArtifactsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ArtifactsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Artifact | null>(null)
  return (
    <ArtifactsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ArtifactsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useArtifacts = () => {
  const tasksContext = React.useContext(ArtifactsContext)

  if (!tasksContext) {
    throw new Error('useArtifacts has to be used within <ArtifactsContext>')
  }

  return tasksContext
}
