const express = require('express');  //Import express
const mysql = require('mysql');      // Import mysql
const app = express();
app.use(express.json());
app.use(express.urlencoded());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: "my_db"
});

// Connect with database
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Mysql Connected!");
});

var validateInputs = function (req, res, next) {
    console.log(req.body.prod_code, req.body.prod_name, req.body.prod_price, req.body.prod_GST);
    var p1 = req.body.prod_code;
    var p2 = req.body.prod_name;
    var pr = req.body.prod_price;
    var pgst = req.body.prod_GST;
    console.log(p1, p2, pr, pgst);
    console.log(p1, p2, typeof (p1), typeof (p2));
    var letters = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    var letterNumber = /^[a-zA-Z0-9]+$/;
    var floatno = /^[0-9]+(\.)?[0-9]*$/;
    if (!(p1.match(letterNumber))) {
        console.log("Invalid Product Code!!");
        res.status(400).send({ message: 'Correct your Product Code: only letters and numbers.' });
        return;
    }
    else if (!((p2).match(letters))) {
        res.status(400).send({ message: 'Correct your Product Name: only letters and spaces.' });
        return;
    }
    else if (isNaN(pr)) {
        console.log("Invalid Product Price!!");
        res.status(400).send({ message: 'Invalid Product Price given' });
        return;
    }
    else if (!(floatno.test(pgst))) {
        console.log("Invalid Product GST!!");
        res.status(400).send({ message: 'Invalid Product GST given' });
        return;
    }
    next();
}

var validateId = function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    var letterNumber = /^[a-zA-Z0-9]+$/;
    if (!(id.match(letterNumber))) {
        res.status(400).send({ message: 'Invalid Product ID given' });
        return;
    }
    next();
}

var validateName = function (req, res, next) {
    var nm = req.params.name;
    console.log(nm);
    var letters = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    if (!(nm.match(letters))) {
        res.status(400).send({ message: 'Invalid Product name given' });
        return;
    }
    next();
}

app.get('/api/allproducts', (req, res) => {
    allRecords(req, res);
});
app.post('/api/addproducts', validateInputs, (req, res) => {
    postRecords(req, res);
});
//product details on requesting with product_code or product_name
app.get('/api/getproduct/:id', validateId, (req, res) => {
    getProductById(req, res);
});

app.get('/api/getproductbyname/:name', validateName, (req, res) => {
    getProductByName(req, res);
});




let myPromise1 = new Promise(function (resolve, reject) {     //Creating promise object
    var sql =
        "SELECT * " +
        "FROM products ";
    db.query(sql, function (err, rows, fields) {                        // Call reject on error states,// call resolve with results
        if (err) {
            return reject(new Error('Not able to fetch product records'));
        }
        resolve(rows);
    });
});

const allRecords = function (req, res) {
    myPromise1.then(function (rows) {                         //resolve value :rows
        console.log('These are the available products!!');
        console.log(rows);
        res.send(rows);
    })
        .catch(function (error) {                      //reject value : error <= new Error('Not able to fetch product records')
            console.log(error.message);
            res.status(404).send({ message: 'The products you look for are not found' });
        })
}


function postData(product) {
    return new Promise((resolve, reject) => {
        var sql = 'INSERT INTO products set ?';
        db.query(sql, product, function (err, row, fields) {                        // Call reject on error states,// call resolve with results
            if (err) {
                return reject(new Error('Not able to post product records'));
            }
            resolve(row);
        });
    })
}

async function postRecords(req, res) {    //The purpose of async/await is to simplify the syntax necessary to consume promise-based APIs
    const product = {
        prod_code: req.body.prod_code,
        prod_name: req.body.prod_name,
        prod_price: req.body.prod_price,
        prod_GST: req.body.prod_GST
    };
    console.log('calling');
    const result = await postData(product);
    console.log(result);
    res.send("One new product added");
}

function getProduct(id) {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM products WHERE prod_code = ${id}`;
        db.query(sql, (err, row) => {
            if (err) {
                return reject(new Error('Not able to fetch requested product record'));
            }
            resolve(row);
        });
    })
}

async function getProductById(req, res) {
    id = req.params.id;
    console.log('calling');
    const row = await getProduct(id);
    console.log(row);
    res.send(row);
}

function getByName(nm) {
    return new Promise((resolve, reject) => {
        console.log(nm);
        var sql = `SELECT * FROM products WHERE prod_name = '${nm}'`;
        db.query(sql, (err, row) => {
            if (err) {
                return reject(new Error('Not able to fetch requested product record'));
            }
            resolve(row);
        });
    })
}

async function getProductByName(req, res) {
    nm = req.params.name;
    console.log('calling');
    const row = await getByName(nm);
    console.log(row);
    res.send(row);
}

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`));




