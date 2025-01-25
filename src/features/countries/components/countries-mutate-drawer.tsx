import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
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
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { Country } from '../data/schema'
import { versions } from '@/components/data-table/data'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Country
}

const countriesSchema = z.object({
  name: z.string(),
  description: z.string(),
  sumbnail: z.string().url().optional(),
  version: z.string(),
})
type CountriesForm = z.infer<typeof countriesSchema>

export function CountriesMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const form = useForm<CountriesForm>({
    resolver: zodResolver(countriesSchema),
    defaultValues: currentRow ?? {
      name: '',
      description: '',
      sumbnail: '',
      version: '',
    },
  })

  const onSubmit = (data: CountriesForm) => {
    // do something with the form data
    onOpenChange(false)
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Country</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the artifact by providing necessary info.'
              : 'Add a new artifact by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='countries-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex-1'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Description' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sumbnail'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Sumbnail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Sumbnail' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='version'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Version</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select dropdown'
                    items={versions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='countries-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
