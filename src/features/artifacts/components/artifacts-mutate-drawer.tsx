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
import { Artifact } from '../data/schema'
import { versions } from '@/components/data-table/data'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Artifact
}

const artifactsSchema = z.object({
  id: z.string().min(1, 'id is required.'),
  name: z.string().min(1, 'Please select a status.'),
  description: z.string(),
  oneseteffect: z.string(),
  twoseteffect: z.string(),
  fourseteffect: z.string(),
  icon_url: z.string().url().optional(),
  version: z.string(),
})
type ArtifactsForm = z.infer<typeof artifactsSchema>

export function ArtifactsMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const form = useForm<ArtifactsForm>({
    resolver: zodResolver(artifactsSchema),
    defaultValues: currentRow ?? {
      id: '',
      name: '',
      oneseteffect: '',
      twoseteffect: '',
      fourseteffect: '',
      description: '',
      icon_url: '',
      version: '1.0',
    },
  })

  const onSubmit = (data: ArtifactsForm) => {
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
              id='artifacts-form'
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
                name='oneseteffect'
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
                name='twoseteffect'
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
                name='fourseteffect'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Four set effect</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter a Four Set Effect' />
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
            <Button form='artifacts-form' type='submit'>
              Save changes
            </Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
