import ContentSection from '../components/ContentSection'
import { NotificationsForm } from './components/NotificationForm'

export default function SettingsNotifications() {
  return (
    <ContentSection
      title="Notifications"
      desc="Configure how you receive notifications."
    >
      <NotificationsForm />
    </ContentSection>
  )
}
