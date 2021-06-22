// Need some libraries from npmjs.com
require('dotenv').config();
const formidable = require('formidable');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

// Need the external paytm library to authenticate the payments
const PaytmChecksum = require('./PaytmChecksum.js');


exports.payment = (req, res) => {
    const { 
        amount,
        email,
        mobileNo
    } = console.log(req.body);

    //will use the Paytm API Keys(.env) and the PaytmChecksum.js to prepare the payment request object

    let params = {};

    params['MID'] = process.env.PAYTM_MID;
    params['WEBSITE'] = process.env.PAYTM_WEBSITE;
    params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
    params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE;
    params['ORDER_ID'] = uuidv4();
    params['CUST_ID'] = email;
    params['TXN_AMOUNT'] = amount.toString();
    params['EMAIL'] = email;
    params['MOBILE_NO'] = mobileNo.toString();
    params['CALLBACK_URL'] = 'http://localhost:5402/api/paymentCallback';

    // use PaytmChecksum.js to generate a signature

    let paytmCheckSum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);

    paytmCheckSum.then(response => {
        let paytmCheckSumResponse = {
            ...params,
            "CHECKSUMHASH": response
        };
        res.json(paytmCheckSumResponse);
    }).catch(error => {
        res.status(500).json({
            message: "Error in Payment",
            error: error
        });
    });


}

exports.paymentCallback = (req, res) => {
    // called by Paytm Server, Paytm Server will send the transaction information
    // Need to read this transactions information

}