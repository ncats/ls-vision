import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const area: LsConfig = {
    x: {
        field: 'date',
        timeUnit: 'yearmonth',
    },
    y: {
        field: 'count',
        title: 'total count',
    },
};
