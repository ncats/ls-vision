import { LsConfig } from '../../../models/ls-vision';

export const histogram: LsConfig = {
    x: {
        bins: 20,
        field: 'IMDB_Rating',
    },
};
