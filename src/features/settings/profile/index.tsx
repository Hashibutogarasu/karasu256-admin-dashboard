import ContentSection from '../components/content-section'
import ProfileForm from './profile-form'
import { UserProfileLayout } from '@/components/layout/user-profile'

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <UserProfileLayout>
        <ProfileForm />
      </UserProfileLayout>
    </ContentSection>
  )
}
