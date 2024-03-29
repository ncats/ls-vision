import { LsConfig } from '../../../models/ls-vision';

export const stacked: LsConfig = {
    x: {
        timeUnit: 'month',
        field: 'date',
        title: 'Month of the year',
    },
    color: {
        field: 'weather',
        domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
        range: ['#e7ba52', '#c7c7c7', '#aec7e8', '#1f77b4', '#9467bd'],
        legend: 'Weather typesdf',
    },
};
