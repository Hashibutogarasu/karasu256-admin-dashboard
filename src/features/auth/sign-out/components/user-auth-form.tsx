import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
} from '@/components/ui/form'
import { signOut } from 'aws-amplify/auth'
import { toast } from '@/hooks/use-toast'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit() {
    setIsLoading(true)

    signOut();
    sessionStorage.clear();
    toast({
      title: 'Success',
      description: 'You have successfully signed out.',
    })

    router.navigate({ to: '/sign-in' })

    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <Button className='mt-2' disabled={isLoading}>
              Sign Out
            </Button>
          </div>
        </form>
      </Form>
      <div className='text-center'>
        <Link to='/sign-in' className='text-sm font-medium text-muted-foreground hover:opacity-75 underline'>
          Or change account
        </Link>
      </div>
      <div className='text-center'>
        Don't have an account?
        <Link to='/sign-up' className='text-sm font-medium text-muted-foreground hover:opacity-75 underline'>
          Sign up
        </Link>
      </div>
    </div>
  )
}
