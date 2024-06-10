const fetch = require('node-fetch');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'anubuspot'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected successfully.');
});

function fetchData(pageIndex) {
    const pageSize = 10;
    const url = `http://bus.andong.go.kr:8080/api/facilities/station/getDataList?type=Paging&pageSize=${pageSize}&pageUnit=${pageSize}&pageIndex=${pageIndex}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                data.results.forEach(station => {
                    const tempStation = {
                        station_Id: station.stationId,
                        station_Nm: station.stationNm,
                        station_EngNm: station.stationEngNm,
                        gpsX: station.gpsX,
                        gpsY: station.gpsY,
                        mobi_Num: station.mobiNum,
                        gov_Cd: station.govCd
                    };

                    const query = 'INSERT INTO facstationinfo (station_Id, station_Nm, station_EngNm, gpsX, gpsY, mobi_Num, gov_Cd) VALUES (?, ?, ?, ?, ?, ?, ?)';
                    db.query(query, [tempStation.station_Id, 
                        tempStation.station_Nm, 
                        tempStation.station_EngNm, 
                        tempStation.gpsX, tempStation.gpsY, 
                        tempStation.mobi_Num, 
                        tempStation.gov_Cd], (err, result) => {
                        if (err) throw err;
                        console.log(`Data inserted for stationId: ${tempStation.station_Id}`);
                    });
                });
                fetchData(pageIndex + 1);
            } else {
                console.log('모든 데이터를 성공적으로 받아왔습니다.');
                db.end(); 
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            db.end(); 
        });
}
fetchData(1);