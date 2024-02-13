const express = require('express');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')

const app = express();

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
})

//get all user accounts
app.get('/users', (req, res) => {
    db.collection('user')
        .find()
        .toArray()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

//get account by id
app.get('/users/:id', (req, res) => {
    db.collection('user')
      .findOne({ _id : new ObjectId(req.params.id)})
      .then(
        users => {
            res.status(200).json(users)
        }
      )
      .catch(error => {
        res.status(500).json({mssg : 'Document Not Found'})
      })
})

//get account by username
app.get('/users/name/:name', (req, res) => {
    db.collection('user')
      .findOne({uname : req.params.name})
      .then(
        users => {
            res.status(200).json(users)
        }
      )
      .catch(error => {
        res.status(500).json({mssg : 'Document Not Found'})
      })
})

//get account by email
app.get('/users/email/:email', (req, res) => {
  db.collection('user')
    .findOne({email : req.params.email})
    .then(
      users => {
          res.status(200).json(users)
      }
    )
    .catch(error => {
      res.status(500).json({mssg : 'Document Not Found'})
    })
})

//create account
app.post('/account/create', (req, res) => {
  const info = req.body;
  
  db.collection('user')
    .insertOne(info)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ mssg : 'Invalid request' })
    })
})