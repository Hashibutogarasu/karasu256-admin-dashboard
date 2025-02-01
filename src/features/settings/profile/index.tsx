import { UserData } from '@/components/layout/types'
import ContentSection from '../components/content-section'
import ProfileForm from './profile-form'

export default function SettingsProfile({ user }: { user: UserData }) {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm user={user} />
    </ContentSection>
  )
}
