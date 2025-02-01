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
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useUserProfile } from '@/context/user-profile-context'

const profileFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  picture: z.string().url({ message: 'Invalid URL' }).optional(),
  nickname: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  password: z.string()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileForm() {
  const user = useUserProfile()
  const userPool = useCognito()

  const [loading, setLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      picture: user?.picture || '',
      email: user?.email || '',
      nickname: user?.nickname || '',
    },
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    setLoading(true)

    const authDetails = new AuthenticationDetails({
      Username: data.email,
      Password: data.password
    })
    const user = new CognitoUser({
      Username: data.email,
      Pool: userPool!
    })

    toast({
      title: 'Updating profile...',
      description: 'Please wait while we update your profile.',
      duration: 2000,
    })
    user?.authenticateUser(authDetails, {
      onSuccess: () => {
        const attributes = [
          new CognitoUserAttribute({
            Name: 'nickname',
            Value: data.nickname
          }),
          new CognitoUserAttribute({
            Name: 'picture',
            Value: data.picture || ''
          }),
        ]

        user?.updateAttributes(attributes, (err) => {
          setLoading(false)
          if (err) {
            toast({
              title: 'Error',
              description: err.message,
            })
            return
          }

          toast({
            variant: 'default',
            title: 'Success',
            description: 'Profile updated successfully.',
          })
        })
      },
      onFailure: (err) => {
        toast({
          title: 'Error',
          description: err.message,
        })
        setLoading(false)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='nickname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nick name</FormLabel>
              <FormControl>
                <Input type='text' placeholder={'nickname'} {...field} disabled={loading} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='picture'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile picture</FormLabel>
              <FormControl>
                <Input type='url' placeholder={'profile picture'} {...field} disabled={loading} />
              </FormControl>
              <FormDescription>
                A URL to an image that will be used as your profile picture.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder={'email'} {...field} disabled={loading} />
              </FormControl>
              <FormDescription>
                Your email address is used to log in and send you notifications.
              </FormDescription>
              <FormMessage />
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
                <Input type='password' placeholder={'password'} {...field} disabled={loading} />
              </FormControl>
              <FormDescription>
                Enter your password to confirm changes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type='submit'>Update profile</Button>
      </form>
    </Form>
  )
}
