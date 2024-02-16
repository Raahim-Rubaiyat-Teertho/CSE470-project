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
});

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
  if (ObjectId.isValid(req.params.id)) {
    db.collection('user')
      .findOne({ _id : new ObjectId(req.params.id)})
      .then(
        users => {
            res.status(200).json(users)
        }
      )
      .catch(error => {
        res.status(500).json({error : 'Document Not Found'})
      })
    } else {
      res.status(500).json({error: 'Invalid uid'})
    }
});

//get account by username
app.get('/users/uname/:uname', (req, res) => {
    db.collection('user')
      .findOne({uname : req.params.uname})
      .then(
        users => {
            res.status(200).json(users)
        }
      )
      .catch(error => {
        res.status(500).json({mssg : 'Document Not Found'})
      })
});

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
});

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
});

//delete account
app.delete('/account/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('user')
      .deleteOne({ _id : new ObjectId(req.params.id)})
      .then(
        result => {
            res.status(200).json(result)
        }
      )
      .catch(error => {
        res.status(500).json({error : 'Failed to delete'})
      })
    } else {
      res.status(500).json({error: 'Invalid uid'})
    }
});

// edit account
app.patch('/users/account/edit/:id', (req, res) => {
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {
    db.collection('user')
      .updateOne({ _id : new ObjectId(req.params.id)}, {$set: updates})
      .then(
        result => {
            res.status(200).json(result)
        }
      )
      .catch(error => {
        res.status(500).json({error : 'Failed to update'})
      })
    } else {
      res.status(500).json({error: 'Invalid uid'})
    }
});