import { LsConfig } from '../../../models/ls-vision';

export const stream: LsConfig = {
    width: 300,
    height: 200,
    x: {
        timeUnit: 'yearmonth',
        field: 'date',
        titleFormat: '%Y',
    },
    y: {
        field: 'count',
    },
    color: {
        field: 'series',
    },
};
