import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const countrySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  sumbnail: z.string().url().optional(),
  version: z.string(),
})

export type Country = z.infer<typeof countrySchema>
