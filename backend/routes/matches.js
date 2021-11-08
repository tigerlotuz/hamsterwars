const router = require("express").Router();

const { isMatchObject } = require("../validation.js");
const { getAllHamsters, getAllMatches } = require("../functions.js");

const { connect } = require("../database.js");
const db = connect();
const MATCHES = "matches";

// GET ALL MATCHES
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

// GET ONE MATCH
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

// ADD ONE MATCH
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
// DELETE ONE MATCH
router.delete("/matches/:id", async (req, res) => {
  try {
    const docRef = await db.collection(MATCHES).doc(req.params.id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      await docRef.delete();

      res.status(200).json({
        statusCode: 200,
        status: true,
        message: `Match with id: ${req.params.id} has been deleted.`,
      });
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

// GET ONE MATCHWINNER
router.get("/matchWinners/:id", async (req, res) => {
  try {
    let array = await getAllMatches();

    const hasMinOneWin = await array.some(
      (match) => match.winnerId == req.params.id
    );

    if (hasMinOneWin === true) {
      const winnerArray = array.filter((match) => {
        return match.winnerId == req.params.id;
      });
      res.status(200).send(winnerArray);
    } else {
      res.status(404).json({
        statusCode: 404,
        status: false,
        message: "Hamster not found or hamster have no wins",
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

// GET WINNERS
router.get("/winners", async (req, res) => {
  try {
    const array = await getAllHamsters();

    const sortedArray = array.sort((a, b) => {
      return b.wins - a.wins;
    });

    let mostWinsArray = sortedArray.slice(0, 5);

    res.status(200).send(mostWinsArray);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Ooops! Something went wrong with the servers.",
      error,
    });
  }
});

// GET LOSERS
router.get("/losers", async (req, res) => {
  try {
    const array = await getAllHamsters();

    const sortedArray = array.sort((a, b) => {
      return b.defeats - a.defeats;
    });

    let mostLosesArray = sortedArray.slice(0, 5);

    res.status(200).send(mostLosesArray);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Ooops! Something went wrong with the servers.",
      error,
    });
  }
});

module.exports = router;
