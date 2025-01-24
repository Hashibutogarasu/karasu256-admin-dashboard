import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { CharactersDialogs } from './components/characters-dialogs'
import { CharatersPrimaryButtons } from './components/characters-primary-buttons'
import CharactersProvider from './context/characters-context'
import { characters } from './data/characters'
import { DataTable } from '@/components/data-table/data-table'

export default function Characters() {
  return (
    <CharactersProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Characters</h2>
            <p className='text-muted-foreground'>
              All of character list. You can manage these items.
            </p>
          </div>
          <CharatersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={characters} columns={columns} />
        </div>
      </Main>

      <CharactersDialogs />
    </CharactersProvider>
  )
}
