import { LsConfig } from '../../../models/ls-vision';

export const scatterColor: LsConfig = {
    description: 'A scatterplot showing horsepower and miles per gallons.',
    x: {
        field: 'Horsepower',
    },
    y: {
        field: 'Miles_per_Gallon',
    },
    color: {
        field: 'Origin',
    },
    shape: {
        field: 'Origin',
    },
};
