import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useWeapons } from '../context/weapons-context'
import { WeaponsImportDialog } from './weapons-import-dialog'
import { WeaponsMutateDrawer } from './weapons-mutate-drawer'

export function WeaponsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useWeapons()
  return (
    <>
      <WeaponsMutateDrawer
        key='weapon-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <WeaponsImportDialog
        key='weapon-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <WeaponsMutateDrawer
            key={`weapon-update-${currentRow.id}`}
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
            key='weapon-delete'
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
                title: 'The following weapon has been deleted:',
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
            title={`Delete this weapon: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a weapon with the ID{' '}
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
