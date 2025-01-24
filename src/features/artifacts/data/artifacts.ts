import { Artifact } from "./schema";

export const artifacts = [
  {
    id: '1',
    name: 'Wanderer\'s Troupe',
    description: 'Increases Elemental Mastery by 80. Gain a 6% Elemental DMG Bonus every 2s. Max 2 stacks. Lasts until the character falls or leaves combat.',
    oneseteffect: 'Elemental Mastery +80',
    twoseteffect: 'Elemental DMG Bonus +6%',
    fourseteffect: 'After using Elemental Skill, increases all party members\' Elemental Mastery by 120 for 8s.',
    version: '1.0'
  },
  {
    id: '2',
    name: 'Gladiator\'s Finale',
    description: 'If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%.',
    oneseteffect: 'ATK +18%',
    twoseteffect: 'ATK +18%',
    fourseteffect: 'If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%.',
    version: '1.0'
  },
  {
    id: '3',
    name: 'Thundering Fury',
    description: 'Increases Electro DMG Bonus by 15%. Using an Elemental Skill increases 2-Piece Set effects by 50% for 10s. Max 3 stacks.',
    oneseteffect: 'Electro DMG Bonus +15%',
    twoseteffect: 'Increases 2-Piece Set effects by 50% for 10s.',
    fourseteffect: 'Increases damage caused by Overloaded, Electro-Charged and Superconduct DMG by 40%. Triggering such effects decreases Elemental Skill CD by 1s. Can only occur once every 0.8s.',
    version: '1.0'
  }
] as Artifact[]
