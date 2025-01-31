import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import {
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'
import { toast } from '@/hooks/use-toast'
import { useCognito } from '@/hooks/use-cognito'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const userPool = useCognito()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const authDetails = new AuthenticationDetails({
      Username: data.email,
      Password: data.password
    })
    const user = new CognitoUser({
      Username: data.email,
      Pool: userPool!,
      Storage: sessionStorage
    })

    sessionStorage.setItem('username', data.email)
    sessionStorage.setItem('email', data.email)
    sessionStorage.setItem('password', data.password)

    user?.authenticateUser(authDetails, {
      onSuccess: function () {
        toast({
          title: 'Success',
          description: <div>
            <p>{'You have successfully logged in.'}</p>
          </div>,
        })
        router.navigate({ to: '/' })
      },
      onFailure: function () {
        toast({
          title: 'Error',
          description: 'Invalid email or password.',
        })
      }
    });

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className='text-center'>
        Don't have an account?
        <Link to='/sign-up' className='text-sm font-medium text-muted-foreground hover:opacity-75 underline'>
          Sign up
        </Link>
      </div>
    </div>
  )
}
