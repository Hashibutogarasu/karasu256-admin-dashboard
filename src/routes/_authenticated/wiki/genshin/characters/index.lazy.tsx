import { createLazyFileRoute } from '@tanstack/react-router'
import Characters from '@/features/characters'

export const Route = createLazyFileRoute(
  '/_authenticated/wiki/genshin/characters/',
)({
  component: Characters,
})
