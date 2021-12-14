const express = require('express');  //Import express
const mysql = require('mysql');      // Import mysql
const app = express();
app.use(express.json());            //Used json file of express

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: "my_db"
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Mysql Connected!");
});

// Get all records in table customers
app.get('/api/allcustomers', (req, res) => {
    let sql = 'SELECT * FROM customers';
    let query = db.query(sql, (err, results) => {
        if (err) console.log(err);
        console.log(results);
        res.send(results);
    });
});

// Add new record
app.post('/api/addnew', (req, res) => {
    const customer = {
        name: req.body.name,
        place: req.body.place,
    };
    let sql = 'INSERT INTO customers set ?';
    let query = db.query(sql, customer, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send("One new customer added!!!");
    });
});

// Get a specific record having id given in route
app.get('/api/readone/:id', (req, res) => {
    let sql = `SELECT * FROM customers WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

// Update a record
app.put('/api/updateone/:id', (req, res) => {
    let sql = `UPDATE customers SET name = '${req.body.name}', place = '${req.body.place}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

// Delete a record and show all 
app.delete('/api/customers/:id', (req, res) => {
    let sql1 = `DELETE FROM customers WHERE id = ${req.params.id}`;
    let query1 = db.query(sql1, (err, result) => {
        if (err) console.log(err);
        console.log(result);
    });
    let sql2 = 'SELECT * FROM customers';
    let query2 = db.query(sql2, (err, results) => {
        if (err) console.log(err);
        console.log(results);
        res.send(results);
    });
});

// Set server port
app.listen(9000, function (req, res) {
    console.log("Server up and running at port 9000");
});