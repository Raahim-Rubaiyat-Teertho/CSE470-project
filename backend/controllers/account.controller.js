const {connectToDb, getDb} = require("../db")

connectToDb((err) => {
    db = getDb();
});

const {ObjectId} = require('mongodb');

//create account
async function createAccount(req, res) {
    const info = req.body;
    
    db.collection('user')
      .insertOne(info)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({ mssg : 'Invalid request' })
      })
}

//delete account
async function deleteAccount(req, res) {
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
}

module.exports = {
    createAccount,
    deleteAccount
}