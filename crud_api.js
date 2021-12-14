//C R U D :Create Read Update Delete

const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());  //Used json file of express

//Give resource to the server

const customers = [                         // defining a list of objects
    {name: "Sam", id: 1 ,place: "Kerala"},
    {name: "Michael", id: 2 ,place: "NewDelhi"},
    {name: "Maya", id: 3 ,place: "Chennai"},
    {name: "Ranjith", id: 4 ,place: "Hyderabad"},
    {name: "Sumith", id: 5 ,place: "Bangaluru"},
];

app.get('/', (req,res) => {
    res.send("Its my first CRUD app on express");
});

// To view all stored in server
app.get('/api/customers', (req,res) => {
    console.log(customers);
    res.send(customers);
});

// To get information on a specific customer with id specified as parameter
app.get('/api/customers/:id',(req,res) => {
    const cust = customers.find(c => c.id === parseInt(req.params.id));
    if (cust) {
        console.log(cust);
        res.send(cust);
    }
    else {
        console.log("Not found");
        res.status(404).send('<h2>The customer you look for is not found</h2>');
    }    
}); 

//Create a new resource : POST method
app.post('/api/customers' , (req,res) => {
    //Here validation can be done if needed for name and place properties
    const customer = { 
        name : req.body.name,
        id : customers.length + 1,
        place : req.body.place,
    };
    customers.push(customer);
    res.send(customer);
});

// Update resource : PUT method
app.put('/api/customers/:id',(req,res) => {
    const cust = customers.find(c => c.id === parseInt(req.params.id));
    if (cust) {
        cust.name = req.body.name;
        cust.place = req.body.place;
        console.log(cust);
        res.send(cust);
    }
    else {
        console.log("Not found");
        res.status(404).send('<h2>The customer you want to update is not found</h2>');
    }    
}); 


// Delete a resource : DELETE method
app.delete('/api/customers/:id',(req,res) => {
    const cust = customers.find(c => c.id === parseInt(req.params.id));
    console.log(cust);
    if (cust) {
        const index = customers.indexOf(cust);
        customers.splice(index,1);
        console.log(customers);
        res.send(cust);
        reorderId(customers,parseInt(req.params.id));
        console.log(customers);
    }
    else {
        console.log("Not found");
        res.status(404).send('<h2>The customer you want to delete is not found</h2>');
    }          
});

// Reordering of IDs after one deletion: To be done
function reorderId(customers, id) {
    for (var i= id - 1 ; i < customers.length; i++ ) {
        customers[i]["id"] = customers[i]["id"] - 1;
    }
    return customers;
}




// function to be called for validation of input on body.
function validateCustomer(cust) {
    const schema = {
        name : Joi.string().min(3).required
    };
    return Joi.validate(cust,schema);
}


app.listen(9000, function(req, res) {
    console.log("Server up and running at port 9000");
});






