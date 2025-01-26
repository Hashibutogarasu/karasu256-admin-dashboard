import { createLazyFileRoute } from '@tanstack/react-router'
import Countries from '@/features/countries'

export const Route = createLazyFileRoute(
  '/_authenticated/wiki/genshin/countries/',
)({
  component: Countries,
})
