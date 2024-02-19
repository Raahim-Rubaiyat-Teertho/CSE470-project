const {connectToDb, getDb} = require("../db")

connectToDb((err) => {
    db = getDb();
});

const {ObjectId} = require('mongodb')

//get all users
async function getAllUsers(req, res) {
    await db.collection('user')
        .find()
        .toArray()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
}

//get users by id
async function getUsersById (req, res) {
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
}

// get users by uname
async function getUsersByUname (req, res) {
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
}

//get users by email
async function getUsersByEmail (req, res) {
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
}

//edit acc by uname
async function editAccByUname (req, res) {
    const updates = req.body;

  try {
    // Exclude the _id field from updates
    delete updates._id;

    const existingUser = await db.collection('user').findOne({ uname: req.params.uname });

    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const updatedUser = {
      ...existingUser,
      ...updates,
    };

    const result = await db.collection('user').replaceOne(
      { uname: req.params.uname },
      updatedUser
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Update successful' });
    } else {
      res.status(500).json({ error: 'Failed to update' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to update' });
  }
}
 
module.exports = {
    getAllUsers,
    getUsersById,
    getUsersByUname,
    getUsersByEmail,
    editAccByUname
}