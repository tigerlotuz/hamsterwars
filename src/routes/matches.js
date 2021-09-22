const router = require("express").Router();

const { connect } = require("../database.js");
const db = connect();

const MATCHES = "matches";

// GET /matches
router.get("/matches", async (req, res) => {
  try {
    let array = await getAllMatches();
    res.status(200).send(array);
    // json({
    //   statusCode: 200,
    //   status: true,
    //   message: "Successfully fetched all the matches",
    //   matches: array,
    // });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Ooops! Something went wrong with the servers.",
      error,
    });
  }
});

// GET matches/:id

// POST matches

// DELETE matches/:id

// GET /matchWinners/:id

// GET /winners

// GET /losers

// FUNCTION GET ALL MATCHES
async function getAllMatches() {
  const matchesRef = db.collection(MATCHES);
  const matchesSnapshot = await matchesRef.get();

  if (matchesSnapshot.empty) {
    return [];
  }
  let array = [];

  await matchesSnapshot.forEach(async (docRef) => {
    let data = await docRef.data();
    data.id = docRef.id;
    array.push(data);
  });
  return array;
}

module.exports = router;
