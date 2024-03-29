import { LsConfig } from '../../../models/ls-vision';

export const pieLabels: LsConfig = {
    description: 'A simple pie chart with labels.',
    circular: {
        outerRadius: 80,
        textRadius: 90,
        text: 'category',
        theta: 'value',
    },
    color: {
        field: 'category',
    },
    textSizeMult: 1.2,
};
