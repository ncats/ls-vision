import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const multiseries: LsConfig = {
    description: 'Stock prices of 5 Tech Companies over Time.',
    title: 'Line Chart',
    x: {
        field: 'date',
    },
    y: {
        field: 'price',
    },
    color: {
        field: 'symbol',
    },
};
