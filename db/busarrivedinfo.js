const fetch = require('node-fetch');
const mysql = require('mysql2');
const { delBusarrivedinfo } = require('./delTable.js');

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

delBusarrivedinfo;

function fetchDataFromDatabase() {
    db.query('SELECT station_id FROM facstationinfo', (err, results) => {
        if (err) {
            console.error('Error fetching station ids:', err);
            return;
        }
        results.forEach(row => fetchBusArrivalData(row.station_id));
    });
}

function fetchBusArrivalData(stationId) {
    const url = `http://bus.andong.go.kr:8080/api/facilities/station/getBusArriveData?stationId=${stationId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.results) {
                data.results.forEach(bus => {
                    if (bus.arrvVehId == null) {
                        console.log(`Skipping bus with null arrvVehId at stationId ${stationId}`);
                        return; 
                    }
                    else{
                        const busInfo = {
                            bus_Id: bus.arrvVehId,
                            route_Id: bus.routeId, 
                            station_Id: stationId, 
                            predict_Tm: bus.predictTm,
                            route_Num: bus.routeNum
                        };
                        insertBusArrivalData(busInfo);
                    }
                });
            }
        })
        .catch(error => console.error(`Error fetching bus arrival data for stationId ${stationId}:`, error));
}

function insertBusArrivalData(busInfo) {
    const query = 'INSERT INTO busarrivedinfo (bus_Id, route_Id, station_Id, predict_Tm, route_Num) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [busInfo.bus_Id, busInfo.route_Id, busInfo.station_Id, busInfo.predict_Tm, busInfo.route_Num], (err, result) => {
        if (err) {
            console.error('Error inserting bus arrival data:', err);
            return;
        }
        console.log(`Bus arrival data inserted for stationId ${busInfo.stationId}`);
    });
}

process.on('exit', () => {
    db.end();
});

module.exports = { fetchBusArrivalData, insertBusArrivalData };