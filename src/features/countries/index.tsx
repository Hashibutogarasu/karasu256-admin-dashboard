import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { CountriesDialogs } from './components/countries-dialogs'
import { CountriesPrimaryButtons } from './components/countries-primary-buttons'
import CountriesDialogType from './context/countries-context'
import { DataTable } from '@/components/data-table/data-table'
import { countries } from './data/countries'

export default function Countries() {
  return (
    <CountriesDialogType>
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
            <h2 className='text-2xl font-bold tracking-tight'>Countries</h2>
            <p className='text-muted-foreground'>
              All of artifact list. You can manage these items.
            </p>
          </div>
          <CountriesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={countries} columns={columns} />
        </div>
      </Main>

      <CountriesDialogs />
    </CountriesDialogType>
  )
}
