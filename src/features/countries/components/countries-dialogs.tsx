import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useCountries } from '../context/countries-context'
import { CountriesImportDialog } from './countries-import-dialog'
import { CountriesMutateDrawer } from './countries-mutate-drawer'

export function CountriesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCountries()
  return (
    <>
      <CountriesMutateDrawer
        key='country-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <CountriesImportDialog
        key='country-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <CountriesMutateDrawer
            key={`country-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='country-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
              toast({
                title: 'The following country has been deleted:',
                description: (
                  <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              })
            }}
            className='max-w-md'
            title={`Delete this country: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a country with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
