import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const characterSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  weapontype: z.string(),
  element: z.string(),
  country: z.string(),
  version: z.string(),
})

export type Character = z.infer<typeof characterSchema>
