import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCognito } from '@/hooks/use-cognito'
import { useState } from 'react'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import { Textarea } from '@/components/ui/textarea'
import { useUserProfile } from '@/context/user-profile-context'

const developerSettingsFormSchema = z.object({
  password: z.string().min(8),
  access_token: z.string().optional(),
})

type DeveloperSettingsFormValues = z.infer<typeof developerSettingsFormSchema>

export default function DeveloperSettingsForm() {
  const user = useUserProfile()
  const userPool = useCognito()

  const [access_token, setAccessToken] = useState<string>()
  const [copySuccess, setCopySuccess] = useState(false)

  const form = useForm<DeveloperSettingsFormValues>({
    resolver: zodResolver(developerSettingsFormSchema),
    defaultValues: {
      access_token: ''
    },
    mode: 'onChange',
  })

  function onSubmit(data: DeveloperSettingsFormValues) {
    if (user && user.email) {
      const authDetails = new AuthenticationDetails({
        Username: user.email,
        Password: data.password
      })
      const cognitoUser = new CognitoUser({
        Username: user?.email,
        Pool: userPool!
      })
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken()
          setAccessToken(accessToken)
          form.setValue('access_token', accessToken)
        },
        onFailure: () => {
        }
      })
    }
  }

  function onCopyClick() {
    navigator.clipboard.writeText(access_token!)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='access_token'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Token</FormLabel>
              <FormControl>
                <Textarea placeholder={'access token'} {...field} disabled value={access_token} />
              </FormControl>
              <FormDescription>
                This is the access token for the current user.
              </FormDescription>
              <FormMessage />
              <Button type='button' style={{ backgroundColor: copySuccess ? 'lightgreen' : 'white', color: 'black' }}
                onClick={onCopyClick}>{copySuccess ? 'Copied!' : 'Copy'}</Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='password' {...field} />
              </FormControl>
              <FormDescription>
                Enter your password to get the access token.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Get Access Token</Button>
      </form>
    </Form>
  )
}
