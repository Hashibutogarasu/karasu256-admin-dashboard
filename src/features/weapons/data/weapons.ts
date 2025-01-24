import { Weapon } from "./schema";

export const artifacts = [
  {
    id: '1',
    name: 'Skyward Harp',
    description: 'CRIT Rate increased by 4%. Gains Skypiercing Might upon using Elemental Burst: Increases Movement SPD by 10%, increases ATK SPD by 10%, and Normal and Aimed Shot hits deal additional DMG equal to 20% of ATK.',
    effect: 'Increases CRIT DMG by 20%. Hits have a 60% chance to inflict a small AoE attack, dealing 125% Physical ATK DMG. Can only occur once every 4s.',
    rarity: 5,
    type: 'Bow',
    mainStat: 'CRIT Rate',
    subStat: 'CRIT DMG',
    version: '1.0',
  },
] satisfies Weapon[]
