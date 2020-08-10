import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };

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

const prettyPrintStat = (stat) => {
  return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
}

// draw circles on the map
const showDataOnMap = (data, casesType = "cases") => {
    return data.map(country => {
        return (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                color={casesTypeColors[casesType].hex}
                fillColor={casesTypeColors[casesType].hex}
                radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
            >
                <Popup className="popup">
                    <div className="popup__container">
                        <div className="popup__flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                        <div className="popup__name">{country.country}</div>
                        <div className="popup__confirmed">Cases: { numeral(country.cases).format("0,0") }</div>
                        <div className="popup__recovered">Recovered: { numeral(country.recovered).format("0,0") }</div>
                        <div className="popup__deaths">Deaths: { numeral(country.deaths).format("0,0") }</div>
                    </div>
                </Popup>
            </Circle>
        )
    })
}

export { sortData, buildChartData, showDataOnMap, prettyPrintStat };

