const express = require('express');
const app = express();
const paypal = require('paypal-rest-sdk');

const port = 3030;

paypal.configure({
    mode: 'sandbox',
    client_id: 'AXPGrTANn10-2uPZKY4Bw_dhnIKYERk9iRj3XD3ncKQkBpPSVeDdnOP8GNQy0TU0oyvTDKQQM8Dp8SS_',
    client_secret: 'EKx7he3dyeZRh4m8_CjOio8e4pwmFlcnPLXNtdP1olhhzmsAMTtuC3SwgEuQGwMC0yH0Ioe0cGALYwxR',
});

// Set our template engine of choice
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Basic Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/pay', (req, res) => {
    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            // you will need to replace localhost with your server url
            return_url: 'http://localhost/success',
            cancel_url: 'http://localhost/cancel',
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: 'Donation',
                            sku: '001',
                            price: '1.00',
                            currency: 'USD',
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: 'USD',
                    total: '1.00',
                },
                description: 'Supporting madrassa.',
            },
        ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

app.get('/success', (req, res) => {
    const payerID = req.query.PayerID;
    const paymentID = req.query.paymentId;

    const execute_payment_json = {
        payer_id: payerID,
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: '2.00',
                },
            },
        ],
    };

    paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log('Get Payment Response');
            console.log(JSON.stringify(payment));
            res.render('success');
        }
    });
});

app.get('/cancel', (req, res) => res.render('cancel'));

// Web Server
app.listen(3030, () => {
    console.log(`Listening at port ${port}`);
});
