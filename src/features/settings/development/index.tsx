import { UserProfileLayout } from '@/components/layout/user-profile'
import ContentSection from '../components/content-section'
import DeveloperSettingsForm from './development-form'

export default function SettingsDevelopment() {
  return (
    <ContentSection
      title='Developer Settings'
      desc='Update your developer settings.'
    >
      <UserProfileLayout>
        <DeveloperSettingsForm />
      </UserProfileLayout>
    </ContentSection>
  )
}
