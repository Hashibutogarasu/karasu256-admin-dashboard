import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useCharacters } from '../context/characters-context'
import { CharactersImportDialog } from './characters-import-dialog'
import { CharacterMutateDrawer } from './characters-mutate-drawer'

export function CharactersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCharacters()
  return (
    <>
      <CharacterMutateDrawer
        key='character-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <CharactersImportDialog
        key='character-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <CharacterMutateDrawer
            key={`character-update-${currentRow.id}`}
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
            key='character-delete'
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
                title: 'The following character has been deleted:',
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
            title={`Delete this character: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a character with the ID{' '}
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
