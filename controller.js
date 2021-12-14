const conn = require("../GST Billing_App/models/db.js");

let myPromise1 = new Promise(function (resolve, reject) {     //Creating promise object
    var sql =
        "SELECT * " +
        "FROM products ";
    conn.query(sql, function (err, rows, fields) {                        // Call reject on error states,// call resolve with results
        if (err) {
            return reject(new Error('Not able to fetch product records'));
        }
        resolve(rows);
    });
})

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
        conn.query(sql, product, function (err, row, fields) {                        // Call reject on error states,// call resolve with results
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
        conn.query(sql, (err, row) => {
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
        conn.query(sql, (err, row) => {
            if (err) {
                return reject(new Error('Not able to fetch requested product record'));
            }
            resolve(row);
        });
    })
}

async function getProductByName(req, res) {
    nm = req.params.name;
    const row = await getByName(nm);
    console.log(row);
    res.send(row);
}

function getPriceAndGst(id) {
    return new Promise((resolve, reject) => {
        var sql = `SELECT prod_price, prod_gst FROM products WHERE prod_code = ${id}`;
        conn.query(sql, (err, row) => {
            if (err) {
                return reject(new Error('Not able to fetch requested product record'));
            }
            resolve(row);
        });
    })
}

function storeBill(Bill_Details) {
    var sql = 'INSERT INTO history set ?';
    conn.query(sql, Bill_Details, function (err, row, fields) {                        // Call reject on error states,// call resolve with results
        if (err) {
            return new Error('Not able to store bill');
        }
        return (row);
    });
}


function calcTotalCost(data, id, qty) {
    var final_cost = 0;
    console.log(data[0], typeof (data[0]));
    var gst_amount = (Number(data[0].prod_price) * Number(data[0].prod_gst)) / 100;
    console.log(gst_amount);
    var net_price = data[0].prod_price + gst_amount;
    console.log(net_price);
    final_cost = net_price * qty;
    var date = new Date();
    let Bill_Details = { "prod_code": id, "quantity": qty, "date": date, "gst_amount": gst_amount, "total_price": final_cost };
    storeBill(Bill_Details);
    var result = { "Final_Price_Payable": final_cost, "Bill_Details": Bill_Details }
    return result;
}


async function getTotalCost(req, res) {
    id = req.params.id;
    qty = req.params.qty;
    console.log(id, qty);
    const data = await getPriceAndGst(id);
    console.log(data);
    const tc = await calcTotalCost(data, id, qty);
    res.send(tc);
}

function getPastBills() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM history";
        conn.query(sql, (err, rows) => {
            if (err) {
                return reject(new Error('Not able to fetch requested history of past bills'));
            }
            resolve(rows);
        });
    });
}

async function getHistory(req, res) {
    const pastBills = await getPastBills();
    console.log(pastBills);
    res.send(pastBills);
}

function updateTable(code, product) {
    return new Promise((resolve, reject) => {
        var sql = `UPDATE products SET prod_name = '${product.prod_name}', prod_price ='${product.prod_price}', prod_GST ='${product.prod_GST}' WHERE prod_code = '${code}'`;
        conn.query(sql, (err, row) => {
            if (err) {
                return reject(new Error('Not able to update requested product records'));
            }
            resolve(row);
        });
    });
}

async function updateProduct(req, res) {
    code = req.params.code;
    const product = {
        // prod_code: req.params.code,
        prod_name: req.body.prod_name,
        prod_price: req.body.prod_price,
        prod_GST: req.body.prod_GST
    };
    
    changed = await updateTable(code, product);
    console.log(changed);
    res.send(changed);
}

module.exports = { allRecords, postRecords, getProductById, getProductByName, getTotalCost, getHistory, updateProduct };
