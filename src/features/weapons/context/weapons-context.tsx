import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Weapon } from '../data/schema'

type WeaponssDialogType = 'create' | 'update' | 'delete' | 'import'

interface WeaponsContextType {
  open: WeaponssDialogType | null
  setOpen: (str: WeaponssDialogType | null) => void
  currentRow: Weapon | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Weapon | null>>
}

const WeaponsContext = React.createContext<WeaponsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function WeaponsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<WeaponssDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Weapon | null>(null)
  return (
    <WeaponsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </WeaponsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWeapons = () => {
  const weaponsContext = React.useContext(WeaponsContext)

  if (!weaponsContext) {
    throw new Error('useWeapons has to be used within <WeaponsContext>')
  }

  return weaponsContext
}
