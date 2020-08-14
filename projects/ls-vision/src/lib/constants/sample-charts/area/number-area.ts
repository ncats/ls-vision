import { LsConfig } from '../../../models/ls-vision';

export const areaNumber: LsConfig = {
    x: {
        field: 'count',
        type: 'quantitative',
        title: 'test for numbers',
    },
    y: {
        field: 'count',
        title: 'total count',
    },
};
