import { createFileRoute } from '@tanstack/react-router'
import WikiAPI from '@/features/wiki'

export const Route = createFileRoute('/_authenticated/wiki/route/lazt')({
  component: WikiAPI,
})
