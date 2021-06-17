import { LsConfig } from '@labshare/ls-vision';

export const heatmap: LsConfig = {
    width: 300,
    height: 200,
    x: {
        bins: 60,
        field: 'IMDB_Rating',
    },
    y: {
        bins: 40,
        field: 'Rotten_Tomatoes_Rating',
    },
};
