const express = require('express');  //Import express
const mysql = require('mysql');      // Import mysql
const app = express();
app.use(express.json());


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


app.get('/', (req, res) => {
    res.send("Welcome to our Products");
});


var validateInputs = function (req, res, next) {
    console.log(req.body.prod_code, req.body.prod_name, req.body.prod_price, req.body.prod_GST);
    var p1 = parseFloat(req.body.prod_code);
    var p2 = req.body.prod_name;
    var pr = req.body.prod_price;
    var pgst = req.body.prod_GST;
    console.log(p1, p2, pr, pgst);
    console.log(p2, typeof (p2));
    var letters = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if (!((p1).match(letterNumber))) {
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
    else if ((!isNaN(pgst) && pgst.toString().indexOf('.') != -1)) {
        console.log("Invalid Product GST!!");
        res.status(400).send({ message: 'Invalid Product GST given' });
        return;
    }
    next();
}


app.get('/api/allproducts', (req, res) => {
    let sql = 'SELECT * FROM products';
    let query = db.query(sql, (err, products) => {
        if (err) console.log(err);
        console.log(products);
        res.send(products);
    });
});

app.post('/api/addproducts', validateInputs, (req, res) => {
    const product = {
        prod_code: req.body.prod_code,
        prod_name: req.body.prod_name,
        prod_price: req.body.prod_price,
        prod_GST: req.body.prod_GST
    };
    let sql = 'INSERT INTO products set ?';
    db.query(sql, product, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send("One new product added!!!");
    });
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`));





// product_code
// product_name
// product_price (1 unit price)
// product_gst (GST %)