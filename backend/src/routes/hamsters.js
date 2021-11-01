const router = require("express").Router();

const { isHamstersObject, containsHamsterKeys } = require("../validation.js");
const { getAllHamsters } = require("../functions.js");

const { connect } = require("../database.js");
const db = connect();
const HAMSTERS = "hamsters";

// ADD ONE HAMSTER
router.post("/", async (req, res) => {
  try {
    if (isHamstersObject(req.body)) {
      const docRef = await db.collection(HAMSTERS).add(req.body);
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Your hamster has been created in the data base.",
        id: docRef.id,
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        status: false,
        message: "Bad Request, your object is not a hamster object",
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

// GET ALL HAMSTERS
router.get("/", async (req, res) => {
  try {
    let array = await getAllHamsters();
    res.status(200).send(array);
    // json({
    //   statusCode: 200,
    //   status: true,
    //   message: "Successfully fetched all the hamsters",
    //   hamsters: array,
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

// GET RANDOM HAMSTER
router.get("/random", async (req, res) => {
  try {
    let array = await getAllHamsters();
    let randomHamster = array[Math.floor(Math.random() * array.length)];
    res.status(200).send(randomHamster);
    // .json({
    //   statusCode: 200,
    //   status: true,
    //   message: "Succussesfully fetched a random hamsterobject",
    //   randomHamster,
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

// GET CUTEST HAMSTER
router.get("/cutest", async (req, res) => {
  try {
    const array = await getAllHamsters();

    const sortedArray = array.sort((a, b) => {
      return b.wins - b.defeats - (a.wins - a.defeats);
    });
    let currentHighestScore = 0;
    let cutestHamsterArray = [];
    sortedArray.forEach((hamster) => {
      let hamsterScore = hamster.wins - hamster.defeats;
      if (hamsterScore >= currentHighestScore) {
        currentHighestScore = hamsterScore;
        cutestHamsterArray.push(hamster);
      } else {
        return;
      }
    });

    res.status(200).send(cutestHamsterArray);
    // .json({
    //   statusCode: 200,
    //   status: true,
    //   message: "Succussesfully fetched cutest hamster",
    //   cutestHamsters: cutestHamsterArray,
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

// GET ONE HAMSTER
router.get("/:id", async (req, res) => {
  try {
    const docRef = await db.collection(HAMSTERS).doc(req.params.id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      res.status(200).send(docSnapshot.data());
      // .json({
      //   statusCode: 200,
      //   status: true,
      //   message: "Succussesfully fetched one specific hamster",
      //   oneHamster: docSnapshot.data(),
      // });
    } else {
      res.status(404).json({
        statusCode: 404,
        status: false,
        message: "Hamster Not Found!",
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

// UPDATE ONE HAMSTER
router.put("/:id", async (req, res) => {
  try {
    const docRef = await db.collection(HAMSTERS).doc(req.params.id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      if (containsHamsterKeys(req.body)) {
        await docRef.set(req.body, { merge: true });
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: `Hamster with id: ${req.params.id} has been updated.`,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          status: false,
          message: "Bad Request, your object is not a hamster object",
        });
      }
    } else {
      res.status(404).json({
        statusCode: 404,
        status: false,
        message: "Hamster Not Found!",
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

// DELETE ONE HAMSTER
router.delete("/:id", async (req, res) => {
  try {
    const docRef = await db.collection(HAMSTERS).doc(req.params.id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      await docRef.delete();
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: `Hamster with id: ${req.params.id} has been deleted.`,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        status: false,
        message: "Hamster Not Found!",
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

module.exports = router;
