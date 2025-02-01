import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Character } from "@karasu-lab/karasu256-api-client";

export function Characters({ characters }: { characters: Character[] }) {
  return <Card>
    <CardHeader>
      <CardTitle>Recent Updated Characters</CardTitle>
    </CardHeader>
    <CardContent>
      {characters.map((character) => (
        <Card key={character.id}>
          <CardHeader>
            <CardTitle>{character.name}</CardTitle>
            <CardDescription>
              {character.rarity}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {character.weapon_type}
            </CardDescription>
            <CardDescription>
              {character.element}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </CardContent>
  </Card>
}