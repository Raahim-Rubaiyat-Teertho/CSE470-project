const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users.routes')
const accountRouter = require('./routes/account.routes')
const paymentRouter = require('./routes/payment.routes')

const app = express();
app.use(cors());
app.use(cookieParser());

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'onlin64dd360da6a67'
const store_passwd = 'onlin64dd360da6a67@ssl'
const is_live = false 


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

let db;

connectToDb((err) => {
    if(!err) {
        app.listen(8000, () => {
            console.log('Listening on port 8000')
        });
        db = getDb();
    }
});


app.use('/users', userRouter);

app.use('/account', accountRouter);

// subscription related code
app.post("/order", async (req, res) => {
  const tid = new ObjectId().toString();

  const updated_body = {...req.body};
  const cur_date = new Date().toISOString().split('T')[0];

  updated_body.user.payment = {
    tid : tid,
    paid_date : cur_date,
    paid : true
  }
  
  updated_body.user.category = req.body.type;
  console.log(updated_body)

  const data = {
    total_amount: req.body.cost,
    currency: 'BDT',
    tran_id: tid, // use unique tran_id for each api call
    success_url: `http://localhost:8000/payment/success/${tid}`,
    fail_url: `http://localhost:8000/payment/fail/${tid}`,
    cancel_url: 'http://localhost:3030/payment/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'None',
    product_name: 'subscription',
    product_category: 'digital',
    product_profile: 'general',
    cus_name: req.body.user.name,
    cus_email: req.body.user.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh'
  }
  // console.log(data);

  await db.collection('user').replaceOne(
    { uname: updated_body.user.uname },
    {
      name: updated_body.user.name,
      uname: updated_body.user.uname,
      email: updated_body.user.email,
      pass: updated_body.user.pass,
      dob: updated_body.user.dob,
      category: updated_body.user.category,
      payment: updated_body.user.payment
    }
  );

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url : GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    });
})

app.use('/payment', paymentRouter);


module.exports = {
  db 
}