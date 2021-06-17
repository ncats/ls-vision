import { LsConfig } from '@labshare/ls-vision';

export const bar: LsConfig = {
    height: 200,
    width: 200,
    title: 'My Bar Graph',
    description: 'This is a bar chart',
    x: {
        field: 'a',
        title: 'My Property A',
    },
    y: {
        field: 'c',
        title: 'My Attribute C',
    },
};
