const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}

const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint = {};
    
    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        } 
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

// draw circles on the map
const showDataOnMap = (data, casesType = "cases") => {
    
}


export { sortData, buildChartData, showDataOnMap };

