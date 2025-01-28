import ContentSection from '../components/content-section'
import DeveloperSettingsForm from './development-form'

export default function SettingsDevelopment() {
  return (
    <ContentSection
      title='Developer Settings'
      desc='Update your developer settings.'
    >
      <DeveloperSettingsForm />
    </ContentSection>
  )
}
