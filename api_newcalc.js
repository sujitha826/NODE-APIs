//API Calculator using express with Middleware function for validation
var express = require('express');
var app = express();                                            //app is an instance of express
app.use(express.json());                                        //To allow use of data as json on API


//Middleware function assigned to variable validateInput
var validateInput = function (req, res, next) {
    console.log(req.params.num1, req.params.num2);
    var n1 = parseFloat(req.params.num1);
    var n2 = parseFloat(req.params.num2);
    var opr = req.params.operation;
    console.log(n1, n2, opr);
    if (isNaN(n1) || isNaN(n2)) {
        console.log("Invalid Input Numbers");
        res.status(400).send({ message: 'Invalid input Numbers given' });
        return;
    }
    else if (opr === "add" || opr === "sub" || opr === "prod" || opr === "div") {
        console.log("Valid Input Numbers & Operation");
        next();
    }
    else {
        console.log("Invalid Operation");
        res.status(400).send({ message: 'Invalid input Operation given' });  // Status code 400 
        return;
    }
}

// Calculator API request
app.get('/calculator/:operation/:num1/:num2', validateInput, function (req, res) {
    const n1 = parseFloat(req.params.num1);
    const n2 = parseFloat(req.params.num2);
    const op = req.params.operation;
    var result;
    if (op == 'add') {
        result = n1 + n2;
    }
    else if (op == 'sub') {
        result = n1 - n2;
    }
    else if (op == 'prod') {
        result = n1 * n2;
    }
    else if (op == 'div') {
        result = n1 / n2;
    }
    console.log(result.toFixed(4));  //Parse the data with JSON.parse() to convert text into a JavaScript object
    let value = result.toFixed(4);
    // console.log(JSON.parse(value));
    var final = { "Result": value };
    var finalstr = JSON.stringify(final);
    var finalobj = JSON.parse(finalstr);
    res.send("calculator Now Gives :" + finalstr);
});

//Calculation Api to get total price including gst should be calculated for the products added using
//quantity and product_code as input.

//GST Amount = (Original Cost x GST%)/100
//Net Price = Original Cost + GST Amount


// Set Port
app.listen(8000, function (req, res) {
    console.log("Server running at port 8000");
});


