import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Artifact } from '../data/schema'
import { DataTableColumnHeader } from '../../../components/data-table/data-table-column-header'
import { versions } from '@/components/data-table/data'
// import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Artifact>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Artifact' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('description')}
      </span>
    ),
  },
  {
    accessorKey: 'icon_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Icon URL' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('icon_url')}
      </span>
    ),
  },
  {
    accessorKey: 'oneseteffect',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='One set effect' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('oneseteffect')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'twoseteffect',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Two set effect' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('twoseteffect')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'fourseteffect',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Four set effect' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('fourseteffect')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'version',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Version' />
    ),
    cell: ({ row }) => {
      const version = versions.find((version) => version.value === row.original.version)

      return (
        <div className='flex space-x-2'>
          {version && <Badge variant='outline'>{version.label}</Badge>}
          {/* <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('version')}
          </span> */}
        </div>
      )
    },
  },
]
