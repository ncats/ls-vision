import { LsConfig } from '@labshare/ls-vision';

export const donut: LsConfig = {
    description: 'A simple donut chart with embedded data.',
    circular: {
        innerRadius: 50,
        theta: 'value',
    },
    color: {
        field: 'category',
    },
};
