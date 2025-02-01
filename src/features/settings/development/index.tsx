import { UserData } from '@/components/layout/types'
import ContentSection from '../components/content-section'
import DeveloperSettingsForm from './development-form'

export default function SettingsDevelopment({ user }: { user: UserData }) {
  return (
    <ContentSection
      title='Developer Settings'
      desc='Update your developer settings.'
    >
      <DeveloperSettingsForm user={user} />
    </ContentSection>
  )
}
