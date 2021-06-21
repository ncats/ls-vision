import { LsConfig } from '@labshare/ls-vision';

export const horizontal: LsConfig = {
    height: 200,
    width: 200,
    title: 'My Bar Graph',
    fill: 'red',
    y: {
        field: 'a',
        title: 'My Property A',
    },
    x: {
        field: 'c',
        title: 'My Attribute C',
    },
};
