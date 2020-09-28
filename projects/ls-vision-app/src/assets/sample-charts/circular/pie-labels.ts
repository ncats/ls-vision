import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const pieLabels: LsConfig = {
    description: 'A simple pie chart with labels.',
    circular: {
        outerRadius: 110,
        /*innerRadius: 100,*/
        textRadius: 120,
        text: 'category',
        theta: 'value',
    },
    color: {
        field: 'category',
    },
    textSizeMult: 1.2,
};
