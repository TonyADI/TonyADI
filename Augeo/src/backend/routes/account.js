const express = require('express');
const router = express.Router();

router.delete('/account', (req, res) => {
    console.log('Delete for account working');
    console.log(req.body);
    connection.query(`DELETE FROM USER WHERE email = '${req.body.email}' AND password = '${req.body.password}';`, (error, result) => {
        if (error) throw error;
        console.log('Account deleted from database');
        console.log(result);
        res.status(204).send();
        
    })
})

// Get account details for account page
router.post('/account/details', (req, res) => {
    console.log('Post for account details working');
    console.log(req.params);
    connection.query(`SELECT email, first_name, last_name FROM USER WHERE email = '${req.body.email}';`, (error, result) => {
        if(error) throw error;
        console.log('Account details retreived');
        console.log(result[0])
        res.status(200).send(result[0]);
    })
})
// Get the product listings for this account
router.post('/account/listings', (req, res) => {
    console.log('Post for account listings working');
    console.log(req.body);
    connection.query(`SELECT * FROM PRODUCT WHERE user_email = '${req.body.email}' ORDER BY duration;`, (error, result) => {
        if (error) throw error;
        console.log('Connection to database was successful');
        console.log(result);
        res.status(200).send(result);
    })
})

// Get bids for this account
router.post('/account/bids', (req, res) => {
    console.log('Post for account bids working');
    console.log(req.body);
    connection.query(`SELECT * FROM PRODUCT WHERE product.id IN (SELECT DISTINCT bid.product_id FROM PRODUCT, 
        bid WHERE bid.user_email = '${req.body.email}');`, (error, result) => {
            if (error) throw error;
            console.log(result);
            res.status(200).send(result);
        })
})

// delete a listing for an account, might have to add param or query
router.delete('/account/listings', (req, res) => {
    console.log('Delete for account listings working');
    console.log(req.body);
    connection.query(`DELETE FROM product where user_email = '${req.body.email}' AND id='${req.body.id}';`, (error, result) => {
        if (error) throw error;
        console.log('Connection to database was successful');
        console.log(result);
        res.status(204).send();
    });
})

// Get purchases for this account
router.post('/account/purchases', (req, res) => {
    console.log('Post for account purchases working');
    console.log(req.body);
    connection.query(`SELECT * FROM Product WHERE product.id IN (SELECT product_id FROM sale WHERE user_email = '${req.body.email}');`, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.status(200).send(result);
    })
})