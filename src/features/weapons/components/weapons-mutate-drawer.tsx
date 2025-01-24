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
import { Weapon } from '../data/schema'
import { versions } from '../data/data'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Weapon
}

const weaponsSchema = z.object({
  id: z.string().min(1, 'id is required.'),
  name: z.string(),
  description: z.string(),
  effect: z.string(),
  rarity: z.number(),
  type: z.string(),
  mainStat: z.string(),
  subStat: z.string(),
  version: z.string(),
})
type WeaponsForm = z.infer<typeof weaponsSchema>

export function WeaponsMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const form = useForm<WeaponsForm>({
    resolver: zodResolver(weaponsSchema),
    defaultValues: currentRow ?? {
      id: '',
      name: '',
      description: '',
      effect: '',
      rarity: 0,
      type: '',
      mainStat: '',
      subStat: '',
      version: '1.0',
    },
  })

  const onSubmit = (data: WeaponsForm) => {
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
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Artifact</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the artifact by providing necessary info.'
              : 'Add a new artifact by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
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
              name='id'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>One set effect</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a One Set Effect' />
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
              name='effect'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Two set effect</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Two Set Effect' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Type' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mainStat'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Main Stat</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Main Stat' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subStat'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Sub Stat</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Sub Stat' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rarity'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Rarity</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a Rarity' />
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
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
