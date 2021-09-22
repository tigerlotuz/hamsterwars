const router = require("express").Router();

const { isMatchObject } = require("../validation.js");

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
router.get("/matches/:id", async (req, res) => {
  try {
    const docRef = await db.collection(MATCHES).doc(req.params.id);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      res.status(200).send(docSnapshot.data());
      // .json({
      //   statusCode: 200,
      //   status: true,
      //   message: "Succussesfully fetched one specific match",
      //   oneHamster: docSnapshot.data(),
      // });
    } else {
      res.status(404).json({
        statusCode: 404,
        status: false,
        message: "Match Not Found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Ooops! Something went wrong with the servers.",
      error,
    });
  }
});

// POST matches
router.post("/matches", async (req, res) => {
  try {
    if (isMatchObject(req.body)) {
      const docRef = await db.collection(MATCHES).add(req.body);
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Your match has been created in the data base.",
        id: docRef.id,
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        status: false,
        message: "Bad Request, your object is not a match object",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Ooops! Something went wrong with the servers.",
      error,
    });
  }
});
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
