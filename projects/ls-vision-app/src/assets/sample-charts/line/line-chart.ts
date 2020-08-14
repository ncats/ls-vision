import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const line: LsConfig = {
    title: 'test',
    description: 'Googles stock price over time.',
    x: {
        field: 'date',
        grid: false,
    },
    y: {
        field: 'price',
    },
    textSizeMult: 1.3,
};
