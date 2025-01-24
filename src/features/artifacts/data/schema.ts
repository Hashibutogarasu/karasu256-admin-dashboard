import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const artifactSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  oneseteffect: z.string(),
  twoseteffect: z.string(),
  fourseteffect: z.string(),
  icon_url: z.string().url().optional(),
  version: z.string(),
})

export type Artifact = z.infer<typeof artifactSchema>
