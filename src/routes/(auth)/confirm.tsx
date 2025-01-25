import Confirm from '@/features/auth/confirm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/confirm')({
  component: Confirm,
})
