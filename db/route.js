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
    const url = `http://bus.andong.go.kr:8080/api/route/getDataList?type=Paging&pageSize=${pageSize}&pageUnit=${pageSize}&pageIndex=${pageIndex}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.results && data.results.length > 0) {
                data.results.forEach(route => {
                    const tempRoute = {
                        route_Id: route.routeId,
                    };
                    const query = 'INSERT INTO route (route_Id) VALUES (?)';
                    db.query(query, [tempRoute.route_Id], (err, result) => {
                        if (err) throw err;
                        console.log(`Data inserted for stationId: ${tempRoute.route_Id}`);
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