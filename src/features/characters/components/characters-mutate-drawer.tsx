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
import { Character } from '../data/schema'
import { versions } from '@/components/data-table/data'
import { ScrollArea } from '@/components/ui/scroll-area'
import { elements, weapons } from '../data/data'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Character
}

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  weapontype: z.string(),
  element: z.string(),
  country: z.string(),
  icon_url: z.string().url().optional(),
  version: z.string(),
})
type CharactersForm = z.infer<typeof formSchema>

export function CharacterMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const form = useForm<CharactersForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      name: '',
      description: '',
      weapontype: 'Sword',
      element: 'Anemo',
      country: '',
      icon_url: '',
      version: '1.0',
    },
  })

  const onSubmit = (data: CharactersForm) => {
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
        <ScrollArea type='hover' className='h-100 pr-1'>
          <SheetHeader className='text-left'>
            <SheetTitle>{isUpdate ? 'Update' : 'Create'} Character</SheetTitle>
            <SheetDescription>
              {isUpdate
                ? 'Update the task by providing necessary info.'
                : 'Add a new task by providing necessary info.'}
              Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              id='characters-form'
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
                      <Input {...field} placeholder='Enter a title' />
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
                      <Input {...field} placeholder='Enter a description' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='icon_url'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Icon URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter a Icon URL' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='weapontype'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Weapon Type</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select dropdown'
                      items={weapons}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='element'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Element</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select dropdown'
                      items={elements}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter a country' />
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
            <Button form='characters-form' type='submit'>
              Save changes
            </Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
