import { LsConfig } from '@labshare/ls-vision';

export const linePoints: LsConfig = {
    description: 'Stock prices of 5 Tech Companies over Time.',
    x: {
        timeUnit: 'year',
        field: 'date',
    },
    point: {
        fill: 'white',
        filled: false,
    },
    y: {
        field: 'price',
    },
    color: {
        field: 'symbol',
    },
};
