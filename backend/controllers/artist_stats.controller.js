const {connectToDb, getDb} = require("../models/db")
const {ObjectId} = require('mongodb')

connectToDb((err) => {
    db = getDb();
});

async function getAllArtistStats(req, res) {
    try {
        const collection = db.collection("songs");

        const totalUpvotes = await collection.aggregate([
            {
                $group: {
                    _id: null,
                    totalUpvotes: { $sum: "$upvotes" }
                }
            }
        ]).toArray();

        if (totalUpvotes.length > 0) {
            res.status(200).json({ totalUpvotes: totalUpvotes[0].totalUpvotes });
        } else {
            res.status(404).json({ message: "No documents found" });
        }
    } catch (error) {
        console.error("Error occurred while retrieving artist stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getAllArtistStatsByUname(req, res) {
    try {
        const uname = req.params.uname;

        const collection = db.collection("songs");

        const result = await collection.aggregate([
            {
                $match: { uname: uname }
            },
            {
                $group: {
                    _id: null,
                    totalUpvotes: { $sum: "$upvotes" },
                    upvotedBy: { $push: "$upvoted_by" }
                }
            },
            {
                $unwind: "$upvotedBy"
            },
            {
                $unwind: "$upvotedBy"
            },
            {
                $group: {
                    _id: "$upvotedBy",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 1
            }
        ]).toArray();

        let mostEngagedUser = "No engagement found";
        if (result.length > 0) {
            mostEngagedUser = result[0]._id;
        }

        const totalUpvotes = await collection.aggregate([
            { $match: { uname: uname } },
            { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } }
        ]).toArray();

        let totalEarnings = 0;
        if (totalUpvotes.length > 0) {
            totalEarnings = totalUpvotes[0].totalUpvotes * 0.1;
        }

        res.status(200).json({ totalUpvotes: totalUpvotes[0].totalUpvotes, totalEarnings: totalEarnings, mostEngagedUser: mostEngagedUser });
    } catch (error) {
        console.error("Error occurred while retrieving artist stats by uname:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getUpvoteNumbers(req, res) {
    try {
        const uname = req.params.uname;

        const collection = db.collection("songs");

        const result = await collection.aggregate([
            {
                $match: { uname: uname }
            },
            {
                $group: {
                    _id: "$title",
                    totalUpvotes: { $sum: "$upvotes" }
                }
            }
        ]).toArray();

        if (result.length > 0) {
            const responseData = result.map(post => ({
                post_title: post._id,
                upvotes: post.totalUpvotes
            }));
            res.status(200).json(responseData);
        } else {
            res.status(404).json({ message: "No songs found for the specified user" });
        }
    } catch (error) {
        console.error("Error occurred while retrieving upvote numbers by uname:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



module.exports ={
    getAllArtistStats, 
    getAllArtistStatsByUname, 
    getUpvoteNumbers
}