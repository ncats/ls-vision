import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const pie: LsConfig = {
    width: 275,
    description: 'A simple pie chart with embedded data.',
    circular: {
        outerRadius: 150,
        theta: 'value',
    },
    color: {
        field: 'category',
    },
    textSizeMult: 1,
};
