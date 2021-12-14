const logger = require('../GST Billing_App/loggerConfig/logger');
const logger_err = require('../GST Billing_App/loggerConfig/error_log');
const getcost = require("../GST Billing_App/controllers/getTotalCost");

async function getAllpriceAndGst(input) {
    let listProd = input.prod_codes;
    let listQty = input.qty;
    console.log(listProd, listQty);
    let arrayCosts = [];
    let j = 1;
    for (let key in listProd) {
        valueOfId = listProd[key];
        //console.log(valueOfId);
        const data = await getcost.getPriceAndGst(valueOfId); //change 
        console.log(data);
        const tc = await getcost.calcTotalCost(data, valueOfId, listQty[j]);
        arrayCosts.push(tc);
        j = j + 1;
    }
    return arrayCosts;
}


async function getCosts(req, res) {
    const input = req.body;
    console.log(input);
    console.log("calling");
    let Values = await getAllpriceAndGst(input);
    if (Values != 0) {
        res.status(200).json(Values);
        logger.info("info", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 200 })
    }
    else {
        res.status(404).json({ "status": 404 })
        logger_err.error("Not Found", { "{method}": req.method, "{url}": req.url, "{data}": req.body, "statusCode": 404 })
    }
}

module.exports = { getCosts };