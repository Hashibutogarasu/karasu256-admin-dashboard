import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { toast } from '@/hooks/use-toast'
import { useCognito } from '@/hooks/use-cognito'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { OtpForm } from '../../otp/components/otp-form'

type ForgotFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const userPool = useCognito()
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [password, setPassword] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const user = new CognitoUser({
      Username: data.email,
      Pool: userPool!,
    })

    setUser(user)
    setPassword(data.password)

    user?.forgotPassword({
      onSuccess: () => {
      },
      onFailure: () => {
        toast({
          title: 'Error',
          description: 'An error occurred. Please try again.',
        })
      },
    })

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  function onEnterCode(code: string) {
    if (user) {
      user.confirmPassword(code, password, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Password updated successfully',
          })
        },
        onFailure: () => {
          toast({
            title: 'Error',
            description: 'An error occurred. Please try again.',
          })
        },
      })
    }
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
      <OtpForm onEnterCode={onEnterCode} />
    </div>
  )
}
