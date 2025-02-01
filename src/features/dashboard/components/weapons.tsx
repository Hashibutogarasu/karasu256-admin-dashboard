import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Weapon } from "@karasu-lab/karasu256-api-client";

export function Weapons({ weapons }: { weapons: Weapon[] }) {
  return <Card>
    <CardHeader>
      <CardTitle>Recent Updated Weapons</CardTitle>
    </CardHeader>
    <CardContent>
      {weapons.map((weapon) => (
        <Card key={weapon.id}>
          <CardHeader>
            <CardTitle>{weapon.name}</CardTitle>
            <CardDescription>
              {weapon.rarity}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {weapon.type}
            </CardDescription>
            <CardDescription>
              {weapon.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </CardContent>
  </Card>
}