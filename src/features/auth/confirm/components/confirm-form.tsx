import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { PinInput, PinInputField } from '@/components/pin-input'
import {
  CognitoUser
} from 'amazon-cognito-identity-js'
import { useCognito } from '@/hooks/use-cognito'

type OtpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  code: z.string().min(1, { message: 'Please enter your code.' }),
})

export function ConfirmForm({ className, ...props }: OtpFormProps) {
  const navigate = useNavigate()
  const userPool = useCognito()

  const [isLoading, setIsLoading] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const user = new CognitoUser({
      Username: data.email,
      Pool: userPool!,
      Storage: sessionStorage,
    })

    user.confirmRegistration(data.code, true, function (err) {
      if (err) {
        toast({
          title: 'Error',
          description: err.message || 'An error occurred.',
        })
        setIsLoading(false)
        return
      }

      toast({
        title: 'Success',
        description: 'Your account has been verified.',
      })
      setTimeout(() => {
        setIsLoading(false)
        navigate({ to: '/sign-in' })
      }, 1000)
    })
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
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Email'
                      className={`${form.getFieldState('email').invalid ? 'border-red-500' : ''}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <PinInput
                      {...field}
                      className='flex h-10 justify-between'
                      onComplete={() => setDisabledBtn(false)}
                      onIncomplete={() => setDisabledBtn(true)}
                    >
                      {Array.from({ length: 7 }, (_, i) => {
                        if (i === 3)
                          return <Separator key={i} orientation='vertical' />
                        return (
                          <PinInputField
                            key={i}
                            component={Input}
                            className={`${form.getFieldState('code').invalid ? 'border-red-500' : ''}`}
                          />
                        )
                      })}
                    </PinInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={disabledBtn || isLoading}>
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
