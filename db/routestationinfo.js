const fetch = require('node-fetch');
const mysql = require('mysql2');
const { delroutestationinfo } = require('./delTable.js');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'anubuspot'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected successfully.');
    fetchDataFromDatabase(); 
});

delroutestationinfo;

function fetchDataFromDatabase() {
    db.query('SELECT DISTINCT route_Id FROM route', (err, results) => {
        if (err) {
            console.error('Error fetching station ids:', err);
            return;
        }
        results.forEach(row => fetchRouteStationData(row.route_Id));
    });
}

function fetchRouteStationData(route_Id) {
    const url = `http://bus.andong.go.kr:8080/api/route/station/getDataList?routeId=${route_Id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.results) {
                data.results.forEach(station => {
                    const routeByStation = {
                        route_Id: station.routeId,
                        station_Id: station.stationId,
                        station_Ord: station.stationOrd,
                        station_Nm: station.stationNm,
                        gpsX: station.gpsX,
                        gpsY: station.gpsY,
                    };
                    insertRouteStationData(routeByStation);
                });
            }
        })
        .catch(error => console.error(`Error fetching bus arrival data for stationId ${route_Id}:`, error));
}

function insertRouteStationData(routeByStation) {
    const query = 'INSERT INTO routestationinfo (route_Id, station_Id, station_Ord, station_Nm, gpsX, gpsY) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [routeByStation.route_Id, routeByStation.station_Id, routeByStation.station_Ord, routeByStation.station_Nm, routeByStation.gpsX, routeByStation.gpsY], (err, result) => {
        if (err) {
            console.error('Error inserting bus arrival data:', err);
            return;
        }
        console.log(`Bus arrival data inserted for stationId ${routeByStation.route_Id}`);
    });
}

process.on('exit', () => {
    db.end();
});

