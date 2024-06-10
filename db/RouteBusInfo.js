const fetch = require('node-fetch');
const mysql = require('mysql2');
const { delRouteBusInfo } = require('./delTable.js');

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

delRouteBusInfo;

function fetchDataFromDatabase() {
    db.query('SELECT DISTINCT route_Id FROM route', (err, results) => {
        if (err) {
            console.error('Error fetching station ids:', err);
            return;
        }
        results.forEach(row => fetchRouteBusInfoData(row.route_Id));
    });
}

function fetchRouteBusInfoData(route_Id) {
    const url = `http://bus.andong.go.kr:8080/api/route/bus/getDataList?routeId=${route_Id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.results) {
                data.results.forEach(bus => {
                    const routeBusInfo = {
                        bus_Id: bus.routeId,
                        route_Id: bus.stationId,
                        gpsX: bus.gpsX,
                        gpsY: bus.gpsY,
                    };
                    insertRouteBusInfoData(routeBusInfo);
                });
            }
        })
        .catch(error => console.error(`Error fetching bus arrival data for stationId ${route_Id}:`, error));
}

function insertRouteBusInfoData(routeBusInfo) {
    const query = 'INSERT INTO routebusinfo (bus_Id, route_Id, gpsX, gpsY) VALUES (?, ?, ?, ?)';
    db.query(query, [routeBusInfo.bus_Id, routeBusInfo.route_Id, routeBusInfo.gpsX, routeBusInfo.gpsY], (err, result) => {
        if (err) {
            console.error('Error inserting bus arrival data:', err);
            return;
        }
        console.log(`Bus arrival data inserted for stationId ${routeBusInfo.route_Id}`);
    });
}

process.on('exit', () => {
    db.end();
});