import { LsConfig } from 'ls-vision/lib/models/ls-vision';

export const histogram: LsConfig = {
    x: {
        bins: 20,
        field: 'IMDB_Rating',
    },
};
