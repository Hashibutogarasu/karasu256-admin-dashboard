import { createFileRoute } from '@tanstack/react-router'
import Characters from '@/features/characters'

export const Route = createFileRoute('/_authenticated/wiki/route/lazt')({
  component: Characters,
})
