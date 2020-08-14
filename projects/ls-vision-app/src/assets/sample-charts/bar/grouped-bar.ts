import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const groupedbar: LsConfig = {
    column: {
        field: 'age',
    },
    y: {
        field: 'people',
        title: 'population',
    },
    x: {
        field: 'sex',
        title: '',
    },
    color: {
        field: 'sex',
        range: ['#675193', '#ca8861'],
    },
};
