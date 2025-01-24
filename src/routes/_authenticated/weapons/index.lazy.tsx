import { createLazyFileRoute } from '@tanstack/react-router'
import Weapons from '@/features/weapons'

export const Route = createLazyFileRoute('/_authenticated/weapons/')({
  component: Weapons,
})
