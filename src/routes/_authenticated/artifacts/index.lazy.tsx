import { createLazyFileRoute } from '@tanstack/react-router'
import Artifacts from '@/features/artifacts'

export const Route = createLazyFileRoute('/_authenticated/artifacts/')({
  component: Artifacts,
})
