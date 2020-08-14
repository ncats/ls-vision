import { LsConfig } from '../../../models/ls-vision';

export const line: LsConfig = {
    title: 'test',
    description: 'Google\'s stock price over time.',
    x: {
      field: 'date',
      grid: false
    },
    y: {
      field: 'price'
    },
    textSizeMult: 1.3
  }