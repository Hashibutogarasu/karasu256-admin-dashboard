import { UserAuthForm } from './components/user-auth-form'
import AuthLayout from '../auth-layout'
import { Card } from '@/components/ui/card'

export default function SignOut() {
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>Sign Out</h1>
        </div>
        <UserAuthForm />
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          By clicking sign out, you agree to our{' '}
        </p>
      </Card>
    </AuthLayout>
  )
}
