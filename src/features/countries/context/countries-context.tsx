import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Country } from '../data/schema'

type CountriesDialogType = 'create' | 'update' | 'delete' | 'import'

interface CountriesContextType {
  open: CountriesDialogType | null
  setOpen: (str: CountriesDialogType | null) => void
  currentRow: Country | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Country | null>>
}

const CountriesContext = React.createContext<CountriesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ArtifactsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CountriesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Country | null>(null)
  return (
    <CountriesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CountriesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCountries = () => {
  const countriesContext = React.useContext(CountriesContext)

  if (!countriesContext) {
    throw new Error('useCountries has to be used within <CountriesContext>')
  }

  return countriesContext
}
