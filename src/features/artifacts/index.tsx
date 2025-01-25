import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { ArtifactsDialogs } from './components/artifacts-dialogs'
import { TasksPrimaryButtons } from './components/artifacts-primary-buttons'
import ArtifactsProvider from './context/artifacts-context'
import { artifacts } from './data/artifacts'
import { DataTable } from '@/components/data-table/data-table'

export default function Artifacts() {
  return (
    <ArtifactsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Artifacts</h2>
            <p className='text-muted-foreground'>
              All of artifact list. You can manage these items.
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={artifacts} columns={columns} />
        </div>
      </Main>

      <ArtifactsDialogs />
    </ArtifactsProvider>
  )
}
