import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsDevelopment from '@/features/settings/development'

export const Route = createLazyFileRoute('/_authenticated/settings/developer')({
  component: SettingsDevelopment,
})
