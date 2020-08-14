import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const box: LsConfig = {
    description: 'A vertical 2D box plot showing median, min, and max in the US population distribution of age groups in 2000.',
    x: {
        field: 'age',
    },
    y: {
        field: 'people',
        title: 'population',
    },
};
