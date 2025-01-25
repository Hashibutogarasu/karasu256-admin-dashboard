import SignOut from '@/features/auth/sign-out/sign-out'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-out')({
  component: SignOut,
})
