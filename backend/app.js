const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./models/db')
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users.routes');
const accountRouter = require('./routes/account.routes');
const paymentRouter = require('./routes/payment.routes');
const orderRouter = require('./routes/order.routes');
const postsRouter = require('./routes/posts.routes');

const app = express();
app.use(cors());
app.use(cookieParser());

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

app.use('/order', orderRouter);

app.use('/payment', paymentRouter);

app.use('/posts', postsRouter);


module.exports = {
  db 
}