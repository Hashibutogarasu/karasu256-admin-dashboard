import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useKarasu256API } from '@/hooks/use-karasu256-api'
import { useEffect, useState } from 'react'
import { GICharacter, Weapon } from '@karasu-lab/karasu256-api-client'
import { Characters } from './components/characters'
import { Weapons } from './components/weapons'

export default function Dashboard() {
  const api = useKarasu256API()

  const [characters, setCharacters] = useState<GICharacter[]>([])
  const [weapons, setWeapons] = useState<Weapon[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadCharacters() {
      const characters = await api.characters.charactersControllerGet({ query: {} })
      setCharacters(characters.sort((a: GICharacter, b: GICharacter) => a.id.toString().localeCompare(b.id)).reverse().slice(0, 5))
    }

    async function loadWeapons() {
      const weapons = await api.weapons.weaponsControllerGet({ query: {} })
      setWeapons(weapons.sort((a: Weapon, b: Weapon) => a.id.toString().localeCompare(b.id)).reverse().slice(0, 5))
    }

    if (!loaded) {
      loadCharacters()
      loadWeapons()
      setLoaded(true)
    }

    return function cleanup() {
    }
  }, [api.characters, api.weapons, loaded])
  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>
                Overview
              </TabsTrigger>
              <TabsTrigger value='characters'>
                Characters
              </TabsTrigger>
              <TabsTrigger value='Weapons'>
                Weapons
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>

          </TabsContent>
          <TabsContent value='characters' className='space-y-4'>
            <Characters characters={characters} />
          </TabsContent>
          <TabsContent value='Weapons' className='space-y-4'>
            <Weapons weapons={weapons} />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Wiki',
    href: 'dashboard/wiki',
    isActive: true,
    disabled: false,
  },
]
