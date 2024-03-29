export const bubble = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
        url: 'https://vega.github.io/vega-lite/examples/data/disasters.csv',
    },
    width: 600,
    height: 400,
    transform: [
        {
            filter: 'datum.Entity !== "All natural disasters"',
        },
    ],
    mark: {
        type: 'circle',
        opacity: 0.8,
        stroke: 'black',
        strokeWidth: 1,
    },
    encoding: {
        x: {
            field: 'Year',
            type: 'ordinal',
            axis: {
                labelAngle: 0,
            },
        },
        y: {
            field: 'Entity',
            type: 'nominal',
            axis: {
                title: '',
            },
        },
        size: {
            field: 'Deaths',
            type: 'quantitative',
            legend: {
                title: 'Annual Global Deaths',
                clipHeight: 30,
            },
            scale: {
                range: [0, 5000],
            },
        },
        color: {
            field: 'Entity',
            type: 'nominal',
            legend: null,
        },
    },
};
