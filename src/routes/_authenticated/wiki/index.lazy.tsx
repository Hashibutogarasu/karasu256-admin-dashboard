import Wiki from '@/features/wiki'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/wiki/')({
  component: Wiki,
})
