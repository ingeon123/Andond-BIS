const express = require('express');
const path = require('path');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { BusArrivedInfo } = require('./db/busarrivedinfo.js');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'anubuspot'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected successfully.');
});

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/search', (req, res) => {
  const { input, type } = req.query;

  if (!input || !type) {
    return res.status(400).json({ error: 'Input and type are required' });
  }

  let query = 'SELECT * FROM facstationinfo WHERE bus = ?';

  if (type === 'bus_station') {
    query = 'SELECT * FROM facstationinfo WHERE station_Nm LIKE ?';
  }

  db.query(query, [type === 'bus_station' ? `%${input}%` : input], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.json(results);
    console.log(results);
  });
});

app.get('/details', (req, res) => {
  const { input } = req.query;
  console.log(input);

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  const busData = fetchBusArrivalData(input);
  res.json(busData);
  console.log(busData);
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 실행 중..`);
});