import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const weaponsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  effect: z.string(),
  rarity: z.number(),
  type: z.string(),
  mainStat: z.string(),
  subStat: z.string(),
  version: z.string(),
})

export type Weapon = z.infer<typeof weaponsSchema>
