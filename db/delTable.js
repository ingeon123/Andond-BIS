const mysql = require('mysql2');

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
});

function delBusarrivedinfo() {
    db.query('DELETE FROM Busarrivedinfo', (err, results) => {
        if (err) {
            console.error('Error fetching station ids:', err);
            return;
        }
        console.log('All data deleted from BusArrivedInfo table.');
    });
}

function delRouteBusInfo() {
    db.query('DELETE FROM RouteBusInfo', (err, results) => {
        if (err) {
            console.error('Error fetching station ids:', err);
            return;
        }
        console.log('All data deleted from RouteBusInfo table.');
    });
}

function delroutestationinfo() {
    db.query('DELETE FROM routestationinfo', (err, results) => {
        if (err) {
            console.error('Error fetching station ids:', err);
            return;
        }
        console.log('All data deleted from routestationinfo table.');
    });
}

module.export = {delBusarrivedinfo,delRouteBusInfo,delroutestationinfo};