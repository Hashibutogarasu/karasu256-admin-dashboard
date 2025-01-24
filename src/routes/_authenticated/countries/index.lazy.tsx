import { createLazyFileRoute } from '@tanstack/react-router'
import Countries from '@/features/countries'

export const Route = createLazyFileRoute('/_authenticated/countries/')({
  component: Countries,
})
