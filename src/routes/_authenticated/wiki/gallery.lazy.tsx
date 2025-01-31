import Gallery from '@/features/wiki/gallery'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/wiki/gallery')({
  component: Gallery,
})
